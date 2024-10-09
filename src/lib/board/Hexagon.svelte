<script lang="ts">
    import { Hex, Point, Layout } from "$lib/hexagons/HexLib";

    function pointsToString(points: Point[]): string {
        var pointString = "";
        points.forEach((element) => {
            pointString = pointString.concat(`${element.x},${element.y} `);
        });

        return pointString;
    }

    export let layout: Layout;
    export let q: number;
    export let r: number;
    export let s: number;
    export let color: string;

    const originHex: Hex = new Hex(0,0,0);
    const points: Point[] = layout.polygonCorners(originHex);

    const hex: Hex = new Hex(q, r, s);
    const originOffset: Point = layout.hexToPixel(hex);
    const size = layout.size.x;

    const pointString = pointsToString(points);
</script>

<g transform="translate({originOffset.x}, {originOffset.y})">
    <!-- <polygon
        class="hexagon droppable"
        points={pointString}
        style="fill:{color};stroke:{color};stroke-width:10px"
    /> -->

    <polygon
        class="hexagon droppable"
        data-q={q},
        data-r={r},
        points={pointString}
        style="fill:{color};stroke:black;stroke-width:2px"
    />

    <!-- Optional rendering of cube coordinates for debugging -->
    <text x={-5} y={-size/2} class="small">{q}</text>
    <text x={size/2} y={size/2} class="small">{r}</text>
    <text x={-size/2} y={size/2} class="small">{s}</text>
</g>