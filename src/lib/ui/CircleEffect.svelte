<script lang="ts">
    import { Hex, Point } from "$lib/hexagons/HexLib";
    import type { BoardData } from "$lib/state/BoardData";
    import { boardData, defaultBoard } from "$lib/state/stateStore";

    function pointsToString(points: Point[]): string {
        var pointString = "";
        points.forEach((element) => {
            pointString = pointString.concat(`${element.x},${element.y} `);
        });

        return pointString;
    }

    export let q: number;
    export let r: number;
    export let size: number;
    export let color: string;
    export let fill: boolean;

    let boardMeta: BoardData = defaultBoard;
    boardData.subscribe((data) => {
        boardMeta = data;
    });

    const originHex: Hex = new Hex(0, 0);

    const hex: Hex = new Hex(q, r);
    const originOffset: Point = boardMeta.layout.hexToPixel(hex);
</script>

<g transform="translate({originOffset.x}, {originOffset.y})">
    {#if fill}
        <circle
            r={size}
            style="fill:{color}; z-index: 50; stroke: {color}; stroke-width: {size/10};"
        />
    {/if}
    {#if !fill}
        <circle
            r={size}
            style="fill:none; z-index: 50; stroke: {color}; stroke-width: {size/10}px;"
        />
    {/if}
</g>
