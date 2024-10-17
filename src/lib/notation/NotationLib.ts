import type { Hex } from "$lib/hexagons/HexLib";

import { PieceData, PieceTypes, type MoveData } from "$lib/pieces/PieceData";

const PieceToChar: string[] = [
    'p',
    'r',
    'b',
    'n',
    'q',
    'k',
]


export class Notation {
    // Converts a hexagon to notation
    public static hexToNotation(hex: Hex): string {
        // Since the board goes from -5 to 5, and ASCII a is 97, we start at 102.
        let letterOffset = hex.q + 102;
        if (letterOffset >= 106) // Ignore j
            letterOffset += 1

        let letter: string = String.fromCharCode(letterOffset);
        let number = 6 - Math.max((hex.q + hex.r), hex.r)

        return letter + `${number}`;
    }

    // Takes a board and a move and figures out what the chess notation would be.
    public static moveToNotation(move: MoveData, piece: PieceData, board: PieceData[]) {
        let parseResult: string = "";

        // Pawns don't get 
        if (piece.pieceType != PieceTypes.PAWN) {
            parseResult += PieceToChar[piece.pieceType];
            // parseResult += Notation.hexToNotation(move.from);
        }
            
        // If the move is a capture
        if (PieceData.pieceOn(move.attacking, board))
            parseResult += 'x'

        parseResult += Notation.hexToNotation(move.to);

        return parseResult
    }
}