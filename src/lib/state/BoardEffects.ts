import type { Hex } from "$lib/hexagons/HexLib";

export enum Effects {
    CURRENT = "#57ff00",
    SELECTED = "#fff700",
    // LEGAL = "#ffb400",
    LEGAL = "#525252",
    ATTACK = "#ff0000",
}

// Used for constructing a representation of some of the important global game state variables
export class BoardEffects {
    current: Hex | undefined;
    selections: Hex[];
    legal: Hex[];
    attacks: Hex[];
    previous: Hex[];
    // arrows: Arrow[];

    constructor(current: Hex | undefined, selections: Hex[], legal: Hex[], attacks: Hex[], previous: Hex[]) {
        this.current = current;
        this.selections = selections;
        this.legal = legal;
        this.attacks = attacks;
        this.previous = previous;
    }
}