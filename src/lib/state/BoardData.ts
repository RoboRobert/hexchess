import { Theme } from "$lib/board/ColorPicker";
import { Layout, Point } from "$lib/hexagons/HexLib";

export enum LayoutEnum {
    DEFAULT,
    FLIPPED,
}

export class BoardData {
    layout: Layout;
    theme: Theme;
    radius: number;
    hexSize: number;
    flip: boolean;

    constructor(layout: LayoutEnum, theme: Theme, radius: number, hexSize: number, flip: boolean) {
        this.theme = theme;
        this.radius = radius;
        this.hexSize = hexSize;
        this.layout = this.getLayout(layout);
        this.flip = flip;
    }

    public getLayout(layout: LayoutEnum): Layout {
        if(layout == LayoutEnum.FLIPPED) {
            return new Layout(
                Layout.FLIPPED,
                new Point(this.hexSize, this.hexSize),
                new Point(0, 0),
            );
        }

        return new Layout(
            Layout.FLAT,
            new Point(this.hexSize, this.hexSize),
            new Point(0, 0),
        );
    }
}