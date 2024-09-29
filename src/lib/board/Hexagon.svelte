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

    const hex: Hex = new Hex(q, r, s);
    const points: Point[] = layout.polygonCorners(hex);

    const textOffset: Point = layout.hexToPixel(hex);
    const size = layout.size.x;

    const pointString = pointsToString(points);
</script>

<g>
    <polygon
        class="hexagon droppable"
        points={pointString}
        style="fill:{color};stroke:{color};"
    />

    <!-- Optional rendering of cube coordinates for debugging -->
    <text x={textOffset.x-5} y={textOffset.y-size/2} class="small">{q}</text>
    <text x={textOffset.x-5+size/2} y={textOffset.y+size/2} class="small">{r}</text>
    <text x={textOffset.x-size/2} y={textOffset.y+size/2} class="small">{s}</text>
</g>

<style>
    .hexagon:hover {
        filter: drop-shadow(0 0 2em #000000aa);
    }
</style>
