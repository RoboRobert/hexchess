<script lang="ts">
    import { Hex, Point, Layout } from "$lib/hexagons/HexLib";
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
    let s = -q-r;
    export let color: string;

    let boardMeta: BoardData = defaultBoard;
    boardData.subscribe((data) => {boardMeta = data});

    const originHex: Hex = new Hex(0,0);
    const points: Point[] = boardMeta.layout.polygonCorners(originHex);

    const hex: Hex = new Hex(q, r);
    const originOffset: Point = boardMeta.layout.hexToPixel(hex);
    const size = boardMeta.layout.size.x;

    const pointString = pointsToString(points);
</script>

<g transform="translate({originOffset.x}, {originOffset.y})">
    <polygon
        id="{q},{r}"
        data-q={q},
        data-r={r},
        class="hexagon droppable"
        points={pointString}
        style="--theme-color: {color}"
    />

    <!-- Optional rendering of cube coordinates for debugging -->
    <text x={-5} y={-size/2} class="small">{q}</text>
    <text x={size/2} y={size/2} class="small">{r}</text>
    <text x={-size/2} y={size/2} class="small">{s}</text>
</g>

<style>
    .hexagon {
        fill: var(--theme-color);
        stroke:black;
        stroke-width: 2px;
    }
</style>