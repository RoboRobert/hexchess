import { pieceStore, themeStore } from "$lib/state/stateStore";

export class PieceData {
    pieceImage: string;
    hexCoords: [number, number];

    constructor(hexTuple: [number, number], pieceImage: string) {
        this.hexCoords = hexTuple;
        this.pieceImage = pieceImage;
    }

    equals(coords: [number, number]): boolean {
        if (this.hexCoords[0] === coords[0] && this.hexCoords[1] === coords[1])
            return true;
        return false;
    }

    // Updates the global board state with the new position of the piece
    movePiece(newCoords: [number, number]) {
        if(this.equals(newCoords)) {
            return;
        }
           
        pieceStore.update((array) => array
            .filter((e) => (!e.equals(newCoords)))
            .map((e) => {

                return e;
            }));
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