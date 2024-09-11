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
    export let size: number;

    const origin: Point = new Point(0,0);

    const layout: Layout = new Layout(Layout.flat, new Point(size, size), origin);
    const hex: Hex = new Hex(q, r, s);
    const points: Point[] = layout.polygonCorners(hex);

    const pointString = svgPoints(points);
    const heightWidth: Point = new Point(size * 2, size * Math.sqrt(3));
    const viewBoxString = `${origin.x-(heightWidth.x/2)} ${origin.y-(heightWidth.y)} ${heightWidth.x} ${heightWidth.y}`
</script>

<g>
    <polygon
        points={pointString}
        style="fill:white;stroke:black;stroke-width:2"
    />
</g>
    
