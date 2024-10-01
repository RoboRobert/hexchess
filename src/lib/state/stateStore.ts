import { Theme } from "$lib/board/ColorPicker";
import { Layout, Point } from "$lib/hexagons/HexLib";
import { writable } from "svelte/store";

export const themeStore = writable(Theme.GRAYSCALE);

export const defaultLayout = new Layout(
    Layout.FLAT,
    new Point(50, 50),
    new Point(0,0),
);
export const layoutStore = writable(defaultLayout);