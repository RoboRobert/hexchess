import { Theme } from "$lib/board/ColorPicker";
import { PieceData, PieceEnum } from "$lib/pieces/PieceData";
import { writable } from "svelte/store";
import { BoardData, flatLayout } from "./BoardData";
import { GameState } from "./GameState";
import { BoardEffects } from "./BoardEffects";
import type { Hex } from "$lib/hexagons/HexLib";

export const defaultBoard = new BoardData(flatLayout, Theme.GRAYSCALE, 5, 50);
export const boardData = writable(defaultBoard);

export const defaultState = new GameState(true, "WHITE", false)
export const gameState = writable(defaultState);

// Writable that stores the currently selected piece.
let anyType: any = undefined;
export const selectedPiece = writable(anyType);

let pieceArray: PieceData[] = [
    // Black bishops
    new PieceData([0, -5], PieceEnum.BLACK_BISHOP),
    new PieceData([0, -4], PieceEnum.BLACK_BISHOP),
    new PieceData([0, -3], PieceEnum.BLACK_BISHOP),

    // White bishops
    new PieceData([0, 5], PieceEnum.WHITE_BISHOP),
    new PieceData([0, 4], PieceEnum.WHITE_BISHOP),
    new PieceData([0, 3], PieceEnum.WHITE_BISHOP),

    // Black Pawns
    new PieceData([-4, -1], PieceEnum.BLACK_PAWN),
    new PieceData([-3, -1], PieceEnum.BLACK_PAWN),
    new PieceData([-2, -1], PieceEnum.BLACK_PAWN),
    new PieceData([-1, -1], PieceEnum.BLACK_PAWN),
    new PieceData([0, -1], PieceEnum.BLACK_PAWN),
    new PieceData([1, -2], PieceEnum.BLACK_PAWN),
    new PieceData([2, -3], PieceEnum.BLACK_PAWN),
    new PieceData([3, -4], PieceEnum.BLACK_PAWN),
    new PieceData([4, -5], PieceEnum.BLACK_PAWN),

    // White Pawns
    new PieceData([-4, 5], PieceEnum.WHITE_PAWN),
    new PieceData([-3, 4], PieceEnum.WHITE_PAWN),
    new PieceData([-2, 3], PieceEnum.WHITE_PAWN),
    new PieceData([-1, 2], PieceEnum.WHITE_PAWN),
    new PieceData([0, 1], PieceEnum.WHITE_PAWN),
    new PieceData([1, 1], PieceEnum.WHITE_PAWN),
    new PieceData([2, 1], PieceEnum.WHITE_PAWN),
    new PieceData([3, 1], PieceEnum.WHITE_PAWN),
    new PieceData([4, 1], PieceEnum.WHITE_PAWN),

    //Black rooks
    new PieceData([-3, -2], PieceEnum.BLACK_ROOK),
    new PieceData([3, -5], PieceEnum.BLACK_ROOK),

    // White rooks
    new PieceData([-3, 5], PieceEnum.WHITE_ROOK),
    new PieceData([3, 2], PieceEnum.WHITE_ROOK),

    // Black knights
    new PieceData([-2, -3], PieceEnum.BLACK_KNIGHT),
    new PieceData([2, -5], PieceEnum.BLACK_KNIGHT),

    // White knights
    new PieceData([-2, 5], PieceEnum.WHITE_KNIGHT),
    new PieceData([2, 3], PieceEnum.WHITE_KNIGHT),

    // Queens
    new PieceData([-1, -4], PieceEnum.BLACK_QUEEN),
    new PieceData([-1, 5], PieceEnum.WHITE_QUEEN),

    // Kings
    new PieceData([1, -5], PieceEnum.BLACK_KING),
    new PieceData([1, 4], PieceEnum.WHITE_KING),

    // Testing checkmate
    // new PieceData([3,-2], PieceEnum.WHITE_QUEEN),

    // new PieceData([5,-5], PieceEnum.BLACK_KING),
    // new PieceData([5,-3], PieceEnum.WHITE_KING),

    // Testing promotion
    // new PieceData([-4,4], PieceEnum.BLACK_PAWN),
    // new PieceData([4,0], PieceEnum.BLACK_PAWN),

    // new PieceData([-4,0], PieceEnum.WHITE_PAWN),
    // new PieceData([4, -4], PieceEnum.WHITE_PAWN),
    // new PieceData([1,-5], PieceEnum.BLACK_KING),
    // new PieceData([1,4], PieceEnum.WHITE_KING),
]

export const pieceStore = writable(pieceArray);

export const effectStore = writable(new BoardEffects(undefined, [], [], [], []));