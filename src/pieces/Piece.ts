import { HexCoord } from "../lib/HexCoord";

export enum Color {
    WHITE = 0,
    BLACK = 1,
}

export interface Piece {
    color: Color;
    position: HexCoord;

    // Returns a list of the current possible moves for this piece.
    getMoves(): HexCoord[];

    // Function that tries to move to another square. 
    // Returns true and does if possible. Else returns false 
    move(coord: HexCoord): boolean;
}