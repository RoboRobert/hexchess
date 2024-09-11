<script lang="ts">
    import Hexagon from "./Hexagon.svelte";
    import { Hex, Point} from "../lib/hexLib";
    import { ColorPicker, Theme} from "./ColorPicker";

    export class HexData {
        constructor(
            public q: number,
            public r: number,
            public s: number,
            public size: number,
            public color: string,
        ) {}
    }


    export let radius: number;
    export let hexSize: number;
    export let theme: Theme;
    const gridLength = (radius*2) + 1;

    var hexArray: HexData[] = [];

    let pickerStart: ColorPicker = new ColorPicker(0, theme);
    // Creates a grid of hexagons with at most maxDistance from the origin
    for(let q = radius; q >=(radius*-1); q--) {
        let picker: ColorPicker = new ColorPicker(pickerStart.currentIndex, pickerStart.theme);
        for(let r = radius; r >= (radius*-1); r--) {
            let s = (q*-1) + (r*-1);
            if((Math.abs(q) + Math.abs(r) + Math.abs(s)) <= 2*radius) {
                hexArray.push(new HexData(q,r,s,hexSize,picker.next()));
            }
        }
        if(q > 0) 
            pickerStart.next();
        else pickerStart.previous();
    }
    
    const heightWidth: Point = new Point((hexSize*(3/2))*gridLength, hexSize*Math.sqrt(3)*gridLength);
    const viewBoxString = `${heightWidth.x/-2} ${heightWidth.y/-2} ${heightWidth.x} ${heightWidth.y}`
</script>

<svg overflow="visible" viewBox={viewBoxString} width={heightWidth.x} height={heightWidth.y}>
    {#each hexArray as {q,r,s,size,color}}
        <Hexagon q={q} r={r} s={s} size={size} color={color}></Hexagon>
    {/each}
</svg>
