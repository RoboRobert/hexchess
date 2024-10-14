
export class GameState {
    currentColor: string;
    running: boolean;

    constructor(running: boolean, currentColor: string) {
        this.running = running;
        this.currentColor = currentColor;
    }
}