export class PieceData {
    pieceImage: string;
    hexTuple: [number, number];

    constructor(hexTuple: [number, number], pieceImage: string) {
        this.hexTuple = hexTuple;
        this.pieceImage = pieceImage;
    }
}