<script lang="ts">
    import {Hex,Point,Layout} from './hexLib'

    function svgPoints(points: Point[]): string {
        var pointString = "";
        points.forEach(element => {
            pointString = pointString.concat(`${element.x},${element.y} `);
        });

        return pointString;
    }
    export let q: number;
    export let r: number;
    export let s: number;

    const size: Point = new Point(100, 100);
    const origin: Point = new Point(size.x, size.y * Math.sqrt(3)/2);

    const layout: Layout = new Layout(Layout.flat, size, origin);
    const hex: Hex = new Hex(q, r, s);
    const points: Point[] = layout.polygonCorners(hex);

    const pointString = svgPoints(points);
</script>

<svg width={origin.x*2} height={origin.y*2} x=0 y=0 xmlns="http://www.w3.org/2000/svg">
    <polygon
        points={pointString}
        style="fill:lime;stroke:red;stroke-width:2"
    />
</svg>
