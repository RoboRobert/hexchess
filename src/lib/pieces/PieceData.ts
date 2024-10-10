import { Hex } from "$lib/hexagons/HexLib";
import type { BoardData } from "$lib/state/BoardData";
import { pieceStore, boardData, defaultBoard } from "$lib/state/stateStore";

export enum ColorEnum {
    WHITE,
    BLACK,
};

export enum Pieces {
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

// export const Data = [
//     [ColorEnum.WHITE, EnumPiece.PAWN,"/svgs/Chess_plt45.svg"],
//     [ColorEnum.BLACK, EnumPiece.PAWN,"/svgs/Chess_pdt45.svg"],
//     [ColorEnum.WHITE, EnumPiece.ROOK,"/svgs/Chess_rlt45.svg"],
//     [ColorEnum.BLACK, EnumPiece.ROOK,"/svgs/Chess_rdt45.svg"],
//     [ColorEnum.WHITE, EnumPiece.KNIGHT,"/svgs/Chess_nlt45.svg"],
//     [ColorEnum.BLACK, EnumPiece.KNIGHT,"/svgs/Chess_ndt45.svg"],
//     [ColorEnum.WHITE, EnumPiece.BISHOP,"/svgs/Chess_blt45.svg"],
//     [ColorEnum.BLACK, EnumPiece.BISHOP,"/svgs/Chess_bdt45.svg"],
//     [ColorEnum.WHITE, EnumPiece.QUEEN,"/svgs/Chess_qlt45.svg"],
//     [ColorEnum.BLACK, EnumPiece.QUEEN,"/svgs/Chess_qdt45.svg"],
//     [ColorEnum.WHITE, EnumPiece.KING,"/svgs/Chess_klt45.svg"],
//     [ColorEnum.BLACK, EnumPiece.KING,"/svgs/Chess_kdt45.svg"],
// ];

export class PieceData {
    pieceType: number;
    hexCoords: [number, number];

    pieceImage: string;

    private color: number;
    private hex: Hex;
    private boardMeta: BoardData = defaultBoard;
    private boardState: PieceData[] = [];

    constructor(hexTuple: [number, number], pieceType: number) {
        this.hexCoords = hexTuple;
        
        this.color = ColorEnum.WHITE;
        this.pieceType = Pieces.PAWN;
        this.pieceImage = "/svgs/Chess_plt45.svg";

        this.hex = new Hex(this.hexCoords[0], this.hexCoords[1]);

        boardData.subscribe((data) => {this.boardMeta = data});
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
        if(this.getLegalMoves().find((e) => PieceData.equals(e, newCoords)) == undefined) {
            return false;
        }
        
        // Remove the piece that previously was on the other square
        pieceStore.update((array) => array.filter((e) => (!PieceData.equals(this.hexCoords, newCoords))));
        
        // Update the coordinates of the current piece
        this.hexCoords = newCoords;
        this.hex = new Hex(this.hexCoords[0], this.hexCoords[1]);

        return true;
    }

    // Gets any legal moves for the current piece
    getLegalMoves(): [number, number][] {
        // Get any diagonal moves by moving down the diagonals in all directions
        let moves: [number, number][] = [];
        moves = moves.concat(this.diagonalMoves(), this.adjacentMoves(), this.directionalMoves());

        return moves;
    }

    // Returns piece on a square or undefined if no piece
    private pieceOn(coords: [number, number]): PieceData | undefined {
        pieceStore.subscribe((array) => {this.boardState = array;});
        // If there's a piece on the square, return it.
        return this.boardState.find((e) => PieceData.equals(e.hexCoords, coords));
    }

    private adjacentMoves(): [number, number][] {
        let adjacent: Hex[] = [];
        for(let i = 0; i < 6; i++) {
            let hex: Hex = this.hex.neighbor(i);
            let hexPiece: PieceData | undefined = this.pieceOn([hex.q, hex.r]);
            if(hexPiece == undefined && hex.inRadius(this.boardMeta.radius)) {
                adjacent.push(hex);
            }
            if(hexPiece != undefined && hexPiece.color != this.color)
                adjacent.push(hex);
        }

        let moves: [number,number][] = adjacent.map((e) => [e.q, e.r]);

        return moves;
    }

    private diagonalMoves(): [number, number][] {
        let diagonals: Hex[] = [];
        for(let i = 0; i < 6; i++) {
            let hex: Hex = this.hex.diagonalNeighbor(i);
            let hexPiece: PieceData | undefined = this.pieceOn([hex.q, hex.r]);
            while(hexPiece == undefined && hex.inRadius(this.boardMeta.radius)) {
                diagonals.push(hex);

                hex = hex.diagonalNeighbor(i);
            }
            if(hexPiece != undefined && hexPiece.color != this.color)
                diagonals.push(hex);
        }

        let moves: [number,number][] = diagonals.map((e) => [e.q, e.r]);

        return moves;
    }

    private directionalMoves(): [number, number][]{
        let directions: Hex[] = [];
        for(let i = 0; i < 6; i++) {
            let hex: Hex = this.hex.neighbor(i);
            let hexPiece: PieceData | undefined = this.pieceOn([hex.q, hex.r]);
            while(hexPiece == undefined && hex.inRadius(this.boardMeta.radius)) {
                directions.push(hex);

                hex = hex.neighbor(i);
            }
            if(hexPiece != undefined && hexPiece.color != this.color)
                directions.push(hex);
        }

        let moves: [number,number][] = directions.map((e) => [e.q, e.r]);

        return moves;
    }
}
