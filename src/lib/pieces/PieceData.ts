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

    private boardMeta: BoardData = defaultBoard;
    private boardState: PieceData[] = [];

    constructor(hexTuple: [number, number], pieceType: number) {
        this.hexCoords = hexTuple;

        this.color = Data[pieceType][0];
        this.pieceType = Data[pieceType][1];
        this.pieceImage = Data[pieceType][2];

        this.enPassantable = false;
        this.firstMove = true;

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
        if (this.getLegalMoves().find((e) => PieceData.equals(e, newCoords)) == undefined) {
            return false;
        }

        let startHex = new Hex(this.hexCoords[0], this.hexCoords[1]);
        // Set pawn to be en-passantable after moving 2 spaces
        if(this.pieceType == PieceTypes.PAWN && startHex.distance(new Hex(newCoords[0], newCoords[1])) > 1)
            this.enPassantable = true;

        // Remove the piece that previously was on the other square
        pieceStore.update((array) => array.filter((e) => (!PieceData.equals(e.hexCoords, newCoords))));

        // Update the coordinates of the current piece
        this.hexCoords = newCoords;
        this.firstMove = false;

        return true;
    }

    // Gets any legal moves for the current piece
    getLegalMoves(): [number, number][] {
        // Get any diagonal moves by moving down the diagonals in all directions
        let moves: [number, number][] = [];
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
    private pieceOn(hex: Hex): PieceData | undefined {
        pieceStore.subscribe((array) => { this.boardState = array; });
        // If there's a piece on the square, return it.
        return this.boardState.find((e) => PieceData.equals(e.hexCoords, [hex.q, hex.r]));
    }

    // All adjacent moves
    private adjacentMoves(): [number, number][] {
        let startHex = new Hex(this.hexCoords[0], this.hexCoords[1]);
        let adjacent: Hex[] = [];

        for (let i = 0; i < 6; i++) {
            let hex = startHex.neighbor(i);
            let hexPiece = this.pieceOn(hex);

            if (hex.inRadius(this.boardMeta.radius) &&
                (hexPiece === undefined || hexPiece.color !== this.color)) {
                adjacent.push(hex);
            }
        }

        return adjacent.map(e => [e.q, e.r]);
    }

    // All diagonal moves within a certain range
    private diagonalMoves(maxDistance: number): [number, number][] {
        let startHex = new Hex(this.hexCoords[0], this.hexCoords[1]);
        let directions: Hex[] = [];

        for (let i = 0; i < 6; i++) {
            let hex = startHex.diagonalNeighbor(i);
            for (let j = 0; (j < maxDistance && hex.inRadius(this.boardMeta.radius)); j++) {
                const hexPiece = this.pieceOn(hex);
                if (hexPiece) {
                    if (hexPiece.color !== this.color) directions.push(hex);
                    break;
                }
                directions.push(hex);
                hex = hex.diagonalNeighbor(i);
            }
        }

        return directions.map(e => [e.q, e.r]);
    }

    // All moves in the 6 hexagonal directions
    private directionalMoves(): [number, number][] {
        let startHex = new Hex(this.hexCoords[0], this.hexCoords[1]);
        let directions: Hex[] = [];

        for (let i = 0; i < 6; i++) {
            let hex = startHex.neighbor(i);
            while (hex.inRadius(this.boardMeta.radius)) {
                const hexPiece = this.pieceOn(hex);
                if (hexPiece) {
                    if (hexPiece.color !== this.color) directions.push(hex);
                    break;
                }
                directions.push(hex);
                hex = hex.neighbor(i);
            }
        }

        return directions.map(e => [e.q, e.r]);
    }

    // Knight moves
    private knightMoves(): [number, number][] {
        let startHex = new Hex(this.hexCoords[0], this.hexCoords[1]);
        let knight: Hex[] = [];

        for (let i = 0; i < 12; i++) {
            let hex = startHex.knightNeighbor(i);
            let hexPiece = this.pieceOn(hex);

            if (hex.inRadius(this.boardMeta.radius) &&
                (hexPiece === undefined || hexPiece.color !== this.color)) {
                knight.push(hex);
            }
        }

        return knight.map(e => [e.q, e.r]);
    }

    // Pawn moves.
    private pawnMoves(): [number, number][] {
        let pawn: Hex[] = [];
        let captures: Hex[] = [];
        let en_passant: Hex[] = [];
        let startHex = new Hex(this.hexCoords[0], this.hexCoords[1]);
        let num_spaces = 1;
        if(this.firstMove == true)
            num_spaces = 2;

        console.log(num_spaces);
        switch (this.color) {
            case ColorEnum.WHITE: {
                let hex: Hex = startHex;
                for (let i = 0; i < num_spaces; i++) {
                    hex = hex.neighbor(2);
                    const hexPiece = this.pieceOn(hex);
                    if(hexPiece) {
                        break;
                    }
                        
                    pawn.push(hex);
                }
                captures.push(startHex.neighbor(1), startHex.neighbor(3));

                // White en-passant
                if (this.pieceOn(startHex.neighbor(0))?.color != this.color && this.pieceOn(startHex.neighbor(0))?.enPassantable) {
                    en_passant.push(startHex.neighbor(1));
                }
                if (this.pieceOn(startHex.neighbor(4))?.color != this.color && this.pieceOn(startHex.neighbor(4))?.enPassantable) {
                    en_passant.push(startHex.neighbor(3));
                }
                break;
            }
            case ColorEnum.BLACK: {
                let hex: Hex = startHex;
                for (let i = 0; i < num_spaces; i++) {
                    hex = hex.neighbor(5);
                    const hexPiece = this.pieceOn(hex);
                    if(hexPiece) {
                        break;
                    }
                        
                    pawn.push(hex);
                }
                captures.push(startHex.neighbor(0), startHex.neighbor(4));

                // Black en-passant
                if (this.pieceOn(startHex.neighbor(1))?.color != this.color && this.pieceOn(startHex.neighbor(1))?.enPassantable) {
                    en_passant.push(startHex.neighbor(0));
                }
                if (this.pieceOn(startHex.neighbor(3))?.color != this.color && this.pieceOn(startHex.neighbor(3))?.enPassantable) {
                    en_passant.push(startHex.neighbor(4));
                }

                break;
            }
        }

        // This is stupid
        return pawn.filter((e) => e.inRadius(this.boardMeta.radius) &&
            (this.pieceOn(e) === undefined))
            .concat(captures.filter((e) => e.inRadius(this.boardMeta.radius) &&
                (this.pieceOn(e) != undefined && this.pieceOn(e)?.color != this.color))).concat(en_passant).map((e) => [e.q, e.r]);
    }
}
