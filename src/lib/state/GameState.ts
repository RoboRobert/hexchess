// Used for constructing a representation of some of the important global game state variables
export class GameState {
    currentColor: string;
    running: boolean;
    stalemate: boolean;
    checkmate: [string, string] | undefined;

    constructor(running: boolean, currentColor: string, stalemate: boolean) {
        this.running = running;
        this.currentColor = currentColor;
        this.stalemate = stalemate;
    }
}