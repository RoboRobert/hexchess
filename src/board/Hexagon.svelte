<script lang="ts">
    import { Hex, Point, Layout } from "../lib/hexLib";

    export class HexData {
        constructor(
            public q: number,
            public r: number,
            public s: number,
            public size: number,
            public color: string,
        ) {}
    }

    function pointsToString(points: Point[]): string {
        var pointString = "";
        points.forEach((element) => {
            pointString = pointString.concat(`${element.x},${element.y} `);
        });

        return pointString;
    }

    export let q: number;
    export let r: number;
    export let s: number;
    export let size: number;
    export let color: string;

    const origin: Point = new Point(0, 0);
    const layout: Layout = new Layout(
        Layout.flat,
        new Point(size, size),
        origin,
    );
    const hex: Hex = new Hex(q, r, s);
    const points: Point[] = layout.polygonCorners(hex);

    const pointString = pointsToString(points);
</script>

<g>
    <polygon
        class="hexagon"
        points={pointString}
        style="fill:{color};stroke:{color};stroke-width:2"
    />
</g>

<style>
    .hexagon:hover {
        filter: drop-shadow(0 0 2em #000000aa);
    }
</style>
