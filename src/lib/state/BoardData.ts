import { Theme } from "$lib/board/ColorPicker";
import { Layout, Point } from "$lib/hexagons/HexLib";

export class BoardData {
    layout: Layout;
    theme: Theme;
    radius: number;
    hexSize: number;
    flipped: boolean;

    constructor(layout: Layout, theme: Theme, radius: number, hexSize: number, flipped: boolean) {
        this.layout = layout;
        this.theme = theme;
        this.radius = radius;
        this.hexSize = hexSize;
        this.flipped = flipped;
    }
}

export const flatLayout = new Layout(
    Layout.FLAT,
    new Point(50, 50),
    new Point(0, 0),
);
export const pointyLayout = new Layout(
    Layout.POINTY,
    new Point(50, 50),
    new Point(0, 0),
);