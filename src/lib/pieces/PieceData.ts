import { Hex } from "$lib/hexagons/HexLib";
import type { BoardData } from "$lib/state/BoardData";
import { pieceStore, boardData, defaultBoard } from "$lib/state/stateStore";

export class PieceData {
    pieceImage: string;
    hexCoords: [number, number];

    private hex: Hex;
    private boardMeta: BoardData = defaultBoard;
    private boardState: PieceData[] = [];

    constructor(hexTuple: [number, number], pieceImage: string) {
        this.hexCoords = hexTuple;
        this.pieceImage = pieceImage;

        this.hex = new Hex(this.hexCoords[0], this.hexCoords[1]);

        boardData.subscribe((data) => {this.boardMeta = data});
        // pieceStore.subscribe((array) => {this.boardState = array;});
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
        if(this.getLegalMoves().filter((e) => PieceData.equals(e, newCoords)).length < 1) {
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

    private adjacentMoves(): [number, number][] {
        let adjacent: Hex[] = [];
        for(let i = 0; i < 6; i++) {
            let currentHex: Hex = this.hex.neighbor(i);
            if(currentHex.inRadius(this.boardMeta.radius)) {
                adjacent.push(currentHex);
            }
        }

        let moves: [number,number][] = adjacent.map((e) => [e.q, e.r]);

        return moves;
    }

    private diagonalMoves(): [number, number][] {
        let diagonals: Hex[] = [];
        for(let i = 0; i < 6; i++) {
            let currentHex: Hex = this.hex.diagonalNeighbor(i);
            while(currentHex.inRadius(this.boardMeta.radius)) {
                diagonals.push(currentHex);

                currentHex = currentHex.diagonalNeighbor(i);
            }
        }

        let moves: [number,number][] = diagonals.map((e) => [e.q, e.r]);

        return moves;
    }

    private directionalMoves(): [number, number][]{
        let directions: Hex[] = [];
        for(let i = 0; i < 6; i++) {
            let currentHex: Hex = this.hex.neighbor(i);
            while(currentHex.inRadius(this.boardMeta.radius)) {
                directions.push(currentHex);

                currentHex = currentHex.neighbor(i);
            }
        }

        let moves: [number,number][] = directions.map((e) => [e.q, e.r]);

        return moves;
    }
}

export const PieceEnum = Object.freeze({
    WHITE_PAWN: "/svgs/Chess_plt45.svg",
    BLACK_PAWN: "/svgs/Chess_pdt45.svg",
    WHITE_ROOK: "/svgs/Chess_rlt45.svg",
    BLACK_ROOK: "/svgs/Chess_rdt45.svg",
    WHITE_KNIGHT: "/svgs/Chess_nlt45.svg",
    BLACK_KNIGHT: "/svgs/Chess_ndt45.svg",
    WHITE_BISHOP: "/svgs/Chess_blt45.svg",
    BLACK_BISHOP: "/svgs/Chess_bdt45.svg",
    WHITE_QUEEN: "/svgs/Chess_qlt45.svg",
    BLACK_QUEEN: "/svgs/Chess_qdt45.svg",
    WHITE_KING: "/svgs/Chess_klt45.svg",
    BLACK_KING: "/svgs/Chess_kdt45.svg",
});