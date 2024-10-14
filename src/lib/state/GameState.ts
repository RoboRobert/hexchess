import { Theme } from "$lib/board/ColorPicker";
import { Layout, Point } from "$lib/hexagons/HexLib";

export class GameState {
    currentColor: string;
    running: boolean;

    constructor(running: boolean, currentColor: string) {
        this.running = running;
        this.currentColor = currentColor;
    }
}