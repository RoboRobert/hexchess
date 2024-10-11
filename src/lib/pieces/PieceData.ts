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
    pieceType: number;
    pieceImage: string;

    hex: Hex;

    private color: number;
    public enPassantable: boolean;
    private firstMove: boolean;

    private boardMeta: BoardData = defaultBoard;

    constructor(hexTuple: [number, number], pieceType: number) {
        this.color = Data[pieceType][0];
        this.pieceType = Data[pieceType][1];
        this.pieceImage = Data[pieceType][2];

        this.enPassantable = false;
        this.firstMove = true;

        this.hex = new Hex(hexTuple[0], hexTuple[1]);

        boardData.subscribe((data) => { this.boardMeta = data });
    }

    private static equals(hex1: Hex, hex2: Hex): boolean {
        if (hex1.q === hex2.q && hex1.r === hex2.r)
            return true;
        return false;
    }

    // Updates the global board state with the new position of the piece
    // Returns true on success, false on fail.
    movePiece(newCoords: Hex): boolean {
        // If the move is not legal, do nothing.
        let legalMove: MoveData | undefined = this.getLegalMoves().find((e) => PieceData.equals(e.to, newCoords))
        if (legalMove == undefined) {
            return false;
        }

        // Set pawn to be en-passantable after moving 2 spaces
        if (this.pieceType == PieceTypes.PAWN && this.hex.distance(legalMove.to) > 1)
            this.enPassantable = true;
        
        // If a board is specified, use it instead of the global state.
        // Remove the piece that was being attacked
        pieceStore.update((array) => array.filter((e) => (!PieceData.equals(e.hex, legalMove.attacking))));

        // Update the coordinates of the current piece
        this.firstMove = false;
        this.hex = legalMove.to;

        return true;
    }

    // Used to test if a move would put the king in check
    testMove(data: MoveData, board: PieceData[]) {
        // console.log(data);
        console.log(board);
        let piece: PieceData = board.find((e) => PieceData.equals(e.hex, data.from)) as PieceData

        // If a board is specified, use it instead of the global state.
        board = board.filter((e) => (PieceData.equals(e.hex, data.attacking)));

        // Update the coordinates of the current piece
        piece.hex = data.to;
    }

    // Gets all legal moves for the current piece. Considers check
    getLegalMoves(): MoveData[] {
        let startBoard: PieceData[] = [];
        pieceStore.subscribe((array) => { startBoard = array });

        let legalMoves: MoveData[] = [];
        let moves = this.getMoves();

        // Repeatedly tests check on different boards to determine the legal moves
        // structuredClone(startBoard) is used to create a deep copy
        moves.forEach((e) => { let newBoard: PieceData[] = structuredClone(startBoard); this.testMove(e, newBoard); console.log(newBoard); legalMoves.push(e) })

        return legalMoves;
        // return moves;
    }

    // Gets any potential moves for the current piece. Does not consider check.
    getMoves(): MoveData[] {
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

    // Return whether the king of specified color is in check on a specified board
    public static inCheck(color: number, board?: PieceData[]): boolean {
        let boardState: PieceData[] = [];
        if (board)
            boardState = board;
        else pieceStore.subscribe((array) => { boardState = array });
        let allMoves: MoveData[] = [];

        boardState.forEach((e) => allMoves = allMoves.concat(e.getMoves()));

        let captures: Hex[] = allMoves.map((e) => e.attacking);

        if (boardState.find((king) => (king.color == color && king.pieceType == PieceTypes.KING && captures.find((e) => PieceData.equals(king.hex, e)))))
            return true;

        return false;
    }

    // Returns piece on a square or undefined if no piece. A board can be specified.
    public static pieceOn(hex: Hex, board?: PieceData[]): PieceData | undefined {
        let boardState: PieceData[] = [];
        if (board != undefined)
            boardState = board;
        else pieceStore.subscribe((array) => { boardState = array; });

        // If there's a piece on the square, return it.
        return boardState.find((e) => PieceData.equals(e.hex, hex));
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
        if (this.firstMove == true)
            num_spaces = 2;

        switch (this.color) {
            case ColorEnum.WHITE: {
                let hex: Hex = this.hex;
                for (let i = 0; i < num_spaces; i++) {
                    hex = hex.neighbor(2);
                    const hexPiece = PieceData.pieceOn(hex);
                    if (hexPiece) {
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
                    if (hexPiece) {
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