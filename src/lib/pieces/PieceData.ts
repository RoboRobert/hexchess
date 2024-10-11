import { Hex } from "$lib/hexagons/HexLib";
import type { BoardData } from "$lib/state/BoardData";
import { pieceStore, boardData, defaultBoard } from "$lib/state/stateStore";

export enum ColorEnum {
    WHITE,
    BLACK,
};

export enum PieceTypes {
    PAWN,
    ROOK,
    BISHOP,
    KNIGHT,
    QUEEN,
    KING,
};

export enum PieceEnum {
    WHITE_PAWN,
    BLACK_PAWN,
    WHITE_ROOK,
    BLACK_ROOK,
    WHITE_KNIGHT,
    BLACK_KNIGHT,
    WHITE_BISHOP,
    BLACK_BISHOP,
    WHITE_QUEEN,
    BLACK_QUEEN,
    WHITE_KING,
    BLACK_KING,
};

const Data: readonly [number, number, string][] = [
    [ColorEnum.WHITE, PieceTypes.PAWN, "/svgs/Chess_plt45.svg"],
    [ColorEnum.BLACK, PieceTypes.PAWN, "/svgs/Chess_pdt45.svg"],
    [ColorEnum.WHITE, PieceTypes.ROOK, "/svgs/Chess_rlt45.svg"],
    [ColorEnum.BLACK, PieceTypes.ROOK, "/svgs/Chess_rdt45.svg"],
    [ColorEnum.WHITE, PieceTypes.KNIGHT, "/svgs/Chess_nlt45.svg"],
    [ColorEnum.BLACK, PieceTypes.KNIGHT, "/svgs/Chess_ndt45.svg"],
    [ColorEnum.WHITE, PieceTypes.BISHOP, "/svgs/Chess_blt45.svg"],
    [ColorEnum.BLACK, PieceTypes.BISHOP, "/svgs/Chess_bdt45.svg"],
    [ColorEnum.WHITE, PieceTypes.QUEEN, "/svgs/Chess_qlt45.svg"],
    [ColorEnum.BLACK, PieceTypes.QUEEN, "/svgs/Chess_qdt45.svg"],
    [ColorEnum.WHITE, PieceTypes.KING, "/svgs/Chess_klt45.svg"],
    [ColorEnum.BLACK, PieceTypes.KING, "/svgs/Chess_kdt45.svg"],
];

export class PieceData {
    hexCoords: [number, number];

    pieceType: number;

    pieceImage: string;

    private color: number;
    public enPassantable: boolean;
    private firstMove: boolean;

    private hex: Hex;

    private boardMeta: BoardData = defaultBoard;

    constructor(hexTuple: [number, number], pieceType: number) {
        this.hexCoords = hexTuple;

        this.color = Data[pieceType][0];
        this.pieceType = Data[pieceType][1];
        this.pieceImage = Data[pieceType][2];

        this.enPassantable = false;
        this.firstMove = true;

        this.hex = new Hex(hexTuple[0], hexTuple[1]);

        boardData.subscribe((data) => { this.boardMeta = data });
    }

    private static equals(coord1: [number, number], coord2: [number, number]): boolean {
        if (coord1[0] === coord2[0] && coord1[1] === coord2[1])
            return true;
        return false;
    }

    // Updates the global board state with the new position of the piece
    // Returns true on success, false on fail.
    movePiece(newCoords: [number, number]): boolean {
        // If the move is not legal, do nothing.
        let legalMove: MoveData | undefined = this.getLegalMoves().find((e) => PieceData.equals([e.to.q, e.to.r], newCoords))
        if (legalMove == undefined) {
            return false;
        }
        
        // Set pawn to be en-passantable after moving 2 spaces
        if(this.pieceType == PieceTypes.PAWN && this.hex.distance(new Hex(newCoords[0], newCoords[1])) > 1)
            this.enPassantable = true;

        this.hex = new Hex(newCoords[0], newCoords[1]);
        // Remove the piece that previously was on the other square
        pieceStore.update((array) => array.filter((e) => (!PieceData.equals(e.hexCoords, [legalMove.attacking.q, legalMove.attacking.r]))));

        // Update the coordinates of the current piece
        this.hexCoords = newCoords;
        this.firstMove = false;

        return true;
    }

    // Gets any legal moves for the current piece
    getLegalMoves(): MoveData[] {
        // Get any diagonal moves by moving down the diagonals in all directions
        let moves: MoveData[] = [];
        switch (this.pieceType) {
            case PieceTypes.QUEEN: { moves = moves.concat(this.diagonalMoves(this.boardMeta.radius), this.adjacentMoves(), this.directionalMoves()); break; }
            case PieceTypes.KING: { moves = moves.concat(this.diagonalMoves(1), this.adjacentMoves()); break; }
            case PieceTypes.BISHOP: { moves = moves.concat(this.diagonalMoves(this.boardMeta.radius)); break; }
            case PieceTypes.ROOK: { moves = moves.concat(this.directionalMoves()); break; }
            case PieceTypes.KNIGHT: { moves = moves.concat(this.knightMoves()); break; }
            case PieceTypes.PAWN: { moves = moves.concat(this.pawnMoves()); break; }
        }

        return moves;
    }

    // Returns piece on a square or undefined if no piece
    public static pieceOn(hex: Hex): PieceData | undefined {
        let boardState: PieceData[] = [];
        pieceStore.subscribe((array) => { boardState = array; });
        // If there's a piece on the square, return it.
        return boardState.find((e) => PieceData.equals(e.hexCoords, [hex.q, hex.r]));
    }

    // All adjacent moves
    private adjacentMoves(): MoveData[] {
        let adjacent: MoveData[] = [];

        for (let i = 0; i < 6; i++) {
            let hex = this.hex.neighbor(i);
            let hexPiece = PieceData.pieceOn(hex);

            if (hex.inRadius(this.boardMeta.radius) &&
                (hexPiece === undefined || hexPiece.color !== this.color)) {
                adjacent.push(new MoveData(this.hex, hex, hex));
            }
        }

        return adjacent;
    }

    // All diagonal moves within a certain range
    private diagonalMoves(maxDistance: number): MoveData[] {
        let diagonals: MoveData[] = [];

        for (let i = 0; i < 6; i++) {
            let hex = this.hex.diagonalNeighbor(i);
            for (let j = 0; (j < maxDistance && hex.inRadius(this.boardMeta.radius)); j++) {
                const hexPiece = PieceData.pieceOn(hex);
                if (hexPiece) {
                    if (hexPiece.color !== this.color) diagonals.push(new MoveData(this.hex, hex, hex));
                    break;
                }
                diagonals.push(new MoveData(this.hex, hex, hex));
                hex = hex.diagonalNeighbor(i);
            }
        }

        return diagonals;
    }

    // All moves in the 6 hexagonal directions
    private directionalMoves(): MoveData[] {
        let directions: MoveData[] = [];

        for (let i = 0; i < 6; i++) {
            let hex = this.hex.neighbor(i);
            while (hex.inRadius(this.boardMeta.radius)) {
                const hexPiece = PieceData.pieceOn(hex);
                if (hexPiece) {
                    if (hexPiece.color !== this.color) directions.push(new MoveData(this.hex, hex, hex));
                    break;
                }
                directions.push(new MoveData(this.hex, hex, hex));
                hex = hex.neighbor(i);
            }
        }

        return directions;
    }

    // Knight moves
    private knightMoves(): MoveData[] {
        let knight: MoveData[] = [];

        for (let i = 0; i < 12; i++) {
            let hex = this.hex.knightNeighbor(i);
            let hexPiece = PieceData.pieceOn(hex);

            if (hex.inRadius(this.boardMeta.radius) &&
                (hexPiece === undefined || hexPiece.color !== this.color)) {
                knight.push(new MoveData(this.hex, hex, hex));
            }
        }

        return knight;
    }

    // Pawn moves.
    private pawnMoves(): MoveData[] {
        let pawn: MoveData[] = [];
        let captures: MoveData[] = [];
        let en_passant: MoveData[] = [];
        let num_spaces = 1;
        if(this.firstMove == true)
            num_spaces = 2;

        switch (this.color) {
            case ColorEnum.WHITE: {
                let hex: Hex = this.hex;
                for (let i = 0; i < num_spaces; i++) {
                    hex = hex.neighbor(2);
                    const hexPiece = PieceData.pieceOn(hex);
                    if(hexPiece) {
                        break;
                    }
                        
                    pawn.push(new MoveData(this.hex, hex, hex));
                }
                captures.push(new MoveData(this.hex, this.hex.neighbor(1), this.hex.neighbor(1)), new MoveData(this.hex, this.hex.neighbor(3), this.hex.neighbor(3)));

                // White en-passant
                if (PieceData.pieceOn(this.hex.neighbor(0))?.color != this.color && PieceData.pieceOn(this.hex.neighbor(0))?.enPassantable) {
                    en_passant.push(new MoveData(this.hex, this.hex.neighbor(1), this.hex.neighbor(0)));
                }
                if (PieceData.pieceOn(this.hex.neighbor(4))?.color != this.color && PieceData.pieceOn(this.hex.neighbor(4))?.enPassantable) {
                    en_passant.push(new MoveData(this.hex, this.hex.neighbor(3), this.hex.neighbor(4)));
                }
                break;
            }
            case ColorEnum.BLACK: {
                let hex: Hex = this.hex;
                for (let i = 0; i < num_spaces; i++) {
                    hex = hex.neighbor(5);
                    const hexPiece = PieceData.pieceOn(hex);
                    if(hexPiece) {
                        break;
                    }
                        
                    pawn.push(new MoveData(this.hex, hex, hex));

                }
                captures.push(new MoveData(this.hex, this.hex.neighbor(0), this.hex.neighbor(0)), new MoveData(this.hex, this.hex.neighbor(4), this.hex.neighbor(4)));

                // Black en-passant
                if (PieceData.pieceOn(this.hex.neighbor(1))?.color != this.color && PieceData.pieceOn(this.hex.neighbor(1))?.enPassantable) {
                    en_passant.push(new MoveData(this.hex, this.hex.neighbor(0), this.hex.neighbor(1)));
                }
                if (PieceData.pieceOn(this.hex.neighbor(3))?.color != this.color && PieceData.pieceOn(this.hex.neighbor(3))?.enPassantable) {
                    en_passant.push(new MoveData(this.hex, this.hex.neighbor(4), this.hex.neighbor(3)));
                }

                break;
            }
        }

        // This is stupid
        return pawn.filter((e) => e.to.inRadius(this.boardMeta.radius) &&
            (PieceData.pieceOn(e.to) === undefined))
            .concat(captures.filter((e) => e.to.inRadius(this.boardMeta.radius) &&
                (PieceData.pieceOn(e.to) != undefined && PieceData.pieceOn(e.to)?.color != this.color))).concat(en_passant);
    }
}

class MoveData {
    from: Hex;
    to: Hex;
    attacking: Hex;

    constructor(from: Hex, to: Hex, attacking: Hex) {
        this.from = from;
        this.to = to;
        this.attacking = attacking;
    }
}