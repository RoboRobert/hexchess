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

const Data: readonly [number, number, string][] = Object.freeze([
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
]);

export class PieceData {
    pieceType: number;
    hexCoords: [number, number];

    pieceImage: string;

    private color: number;
    private boardMeta: BoardData = defaultBoard;
    private boardState: PieceData[] = [];

    constructor(hexTuple: [number, number], pieceType: number) {
        this.hexCoords = hexTuple;

        this.color = Data[pieceType][0];
        this.pieceType = Data[pieceType][1];
        this.pieceImage = Data[pieceType][2];

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

        // Remove the piece that previously was on the other square
        pieceStore.update((array) => array.filter((e) => (!PieceData.equals(e.hexCoords, newCoords))));

        // Update the coordinates of the current piece
        this.hexCoords = newCoords;

        return true;
    }

    // Gets any legal moves for the current piece
    getLegalMoves(): [number, number][] {
        // Get any diagonal moves by moving down the diagonals in all directions
        let moves: [number, number][] = [];
        switch (this.pieceType) {
            case PieceTypes.QUEEN: { moves = moves.concat(this.diagonalMoves(this.boardMeta.radius), this.adjacentMoves(), this.directionalMoves()); break; }
            case PieceTypes.KING: { moves = moves.concat(this.diagonalMoves(1), this.adjacentMoves()); break; }
            case PieceTypes.BISHOP: {moves = moves.concat(this.diagonalMoves(this.boardMeta.radius)); break;}
            case PieceTypes.ROOK: {moves = moves.concat(this.directionalMoves()); break;}
            case PieceTypes.KNIGHT: {moves = moves.concat(this.knightMoves()); break;}
            case PieceTypes.PAWN: {moves = moves.concat(this.pawnMoves()); break;}
        }

        return moves;
    }

    // Returns piece on a square or undefined if no piece
    private pieceOn(coords: [number, number]): PieceData | undefined {
        pieceStore.subscribe((array) => { this.boardState = array; });
        // If there's a piece on the square, return it.
        return this.boardState.find((e) => PieceData.equals(e.hexCoords, coords));
    }

    private adjacentMoves(): [number, number][] {
        let adjacent: Hex[] = [];
        let startHex = new Hex(this.hexCoords[0], this.hexCoords[1]);
        for (let i = 0; i < 6; i++) {
            let hex: Hex = startHex.neighbor(i);
            let hexPiece: PieceData | undefined = this.pieceOn([hex.q, hex.r]);
            if (hexPiece == undefined && hex.inRadius(this.boardMeta.radius)) {
                adjacent.push(hex);
            }
            if (hexPiece != undefined && hexPiece.color != this.color)
                adjacent.push(hex);
        }

        let moves: [number, number][] = adjacent.map((e) => [e.q, e.r]);

        return moves;
    }

    private diagonalMoves(maxDistance: number): [number, number][] {
        let diagonals: Hex[] = [];
        let startHex = new Hex(this.hexCoords[0], this.hexCoords[1]);
        for (let i = 0; i < 6; i++) {
            let hex: Hex = startHex.diagonalNeighbor(i);
            let hexPiece: PieceData | undefined = this.pieceOn([hex.q, hex.r]);
            for(let j = 0; j < maxDistance; j++) {
                if (hexPiece != undefined && hexPiece.color != this.color)
                    diagonals.push(hex);

                if(hexPiece != undefined || !hex.inRadius(this.boardMeta.radius))
                    break;

                diagonals.push(hex);

                hex = hex.diagonalNeighbor(i);
                hexPiece = this.pieceOn([hex.q, hex.r]);
            }
        }

        let moves: [number, number][] = diagonals.map((e) => [e.q, e.r]);

        return moves;
    }

    private directionalMoves(): [number, number][] {
        let directions: Hex[] = [];
        let startHex = new Hex(this.hexCoords[0], this.hexCoords[1]);
        for (let i = 0; i < 6; i++) {
            let hex: Hex = startHex.neighbor(i);
            let hexPiece: PieceData | undefined = this.pieceOn([hex.q, hex.r]);
            while (hexPiece == undefined && hex.inRadius(this.boardMeta.radius)) {
                directions.push(hex);

                hex = hex.neighbor(i);
                hexPiece = this.pieceOn([hex.q, hex.r]);
            }
            if (hexPiece != undefined && hexPiece.color != this.color)
                directions.push(hex);
        }

        let moves: [number, number][] = directions.map((e) => [e.q, e.r]);

        return moves;
    }

    private knightMoves(): [number, number][] {
        return [];
    }

    private pawnMoves(): [number, number][] {
        return [];
    }
}
