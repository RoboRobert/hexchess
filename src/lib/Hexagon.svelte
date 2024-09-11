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
    // const origin: Point = new Point(size.x, size.y * Math.sqrt(3)/2);
    const origin: Point = new Point(0,0);

    const layout: Layout = new Layout(Layout.flat, size, origin);
    const hex: Hex = new Hex(q, r, s);
    const points: Point[] = layout.polygonCorners(hex);

    const pointString = svgPoints(points);
    const heightWidth: Point = new Point(size.x * 2, size.y * Math.sqrt(3));
    const viewBoxString = `${origin.x-(heightWidth.x/2)} ${origin.y-(heightWidth.y)} ${heightWidth.x} ${heightWidth.y}`
</script>

<svg viewBox={viewBoxString} width={heightWidth.x} height={heightWidth.y}  xmlns="http://www.w3.org/2000/svg">
    <polygon
        points={pointString}
        style="fill:lime;stroke:red;stroke-width:2"
    />
</svg>
