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
    export let color: string;

    let boardMeta: BoardData = defaultBoard;
    boardData.subscribe((data) => {
        boardMeta = data;
    });

    const originHex: Hex = new Hex(0, 0);
    const points: Point[] = boardMeta.layout.polygonCorners(originHex);

    const hex: Hex = new Hex(q, r);
    const originOffset: Point = boardMeta.layout.hexToPixel(hex);
    const size = boardMeta.layout.size.x;

    const pointString = pointsToString(points);
</script>

<g transform="translate({originOffset.x}, {originOffset.y})">
    <!-- <polygon
        id="{q},{r}"
        data-q="{q},"
        data-r="{r},"
        class="hexagon droppable"
        points={pointString}
        style="fill: {color}; z-index: 50; stroke: yellow; stroke-width: 2px;"
        opacity="0.4"
    /> -->

    <!-- <polygon
        id="{q},{r}"
        data-q="{q},"
        data-r="{r},"
        class="hexagon droppable"
        points={pointString}
        style="fill:none; z-index: 50; stroke: {color}; stroke-width: 4px;"
    /> -->

    <circle
        r={size/2}
        id="{q},{r}"
        data-q="{q},"
        data-r="{r},"
        class="hexagon droppable"
        points={pointString}
        style="fill:none; z-index: 50; stroke: {color}; stroke-width: 4px;"
    />
</g>
