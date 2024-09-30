<script lang="ts">
    import Hexagon from "./Hexagon.svelte";
    import { ColorPicker, Theme} from "./ColorPicker";
    import { HexData } from '$lib/hexagons/HexData';
    import { Hex, Layout, Point } from '$lib/hexagons/HexLib';
    import Piece from "$lib/pieces/Piece.svelte";
    import { onMount } from "svelte";

    export let radius: number;
    export let hexSize: number;
    const layout: Layout = new Layout(
        Layout.FLAT,
        new Point(hexSize, hexSize),
        new Point(0,0),
    );
    export let theme: Theme;

    const gridLength = (radius*2) + 1;

    var hexArray: HexData[] = [];

    let pickerStart: ColorPicker = new ColorPicker(0, theme);
    // Creates a grid of hexagons with at most radius distance from the origin, and a specified color pattern
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
    
    // Calculates the height and width of the array of hexagons
    const heightWidth: Point = new Point((hexSize*(3/2))*gridLength, hexSize*Math.sqrt(3)*gridLength);
    const viewBoxString = `${heightWidth.x/-2} ${heightWidth.y/-2} ${heightWidth.x} ${heightWidth.y}`    

    let div: HTMLElement;

</script>

<div class="board" bind:this={div}>
    <svg overflow="visible" viewBox={viewBoxString} width={heightWidth.x} height={heightWidth.y}>
        {#each hexArray as {q,r,s,color}}
            <Hexagon layout={layout} q={q} r={r} s={s} color={color}></Hexagon>
        {/each}
    
        <!-- Bishops -->
        <!-- <Bishop color={Color.BLACK} offset={layout.hexToPixel(new Hex(0,-5,5))}></Bishop>
        <Bishop color={Color.BLACK} offset={layout.hexToPixel(new Hex(0,-4,4))}></Bishop>
        <Bishop color={Color.BLACK} offset={layout.hexToPixel(new Hex(0,-3,3))}></Bishop> -->
    
        <!-- Queen -->
        <!-- <Queen offset={layout.hexToPixel(new Hex(-1,-4,5))}></Queen> -->
    
        <!-- King -->
        <!-- <King offset={layout.hexToPixel(new Hex(1,-5,4))}></King> -->
    
        <!-- Knights -->
        <!-- <Knight offset={layout.hexToPixel(new Hex(-2,-3,5))}></Knight>
        <Knight offset={layout.hexToPixel(new Hex(2,-5,3))}></Knight> -->
    
        <!-- Rooks -->
        <!-- <Rook offset={layout.hexToPixel(new Hex(-3,-2,5))}></Rook>
        <Rook offset={layout.hexToPixel(new Hex(3,-5,2))}></Rook> -->
    
        <!-- Pawns -->
        <!-- <Pawn offset={layout.hexToPixel(new Hex(-4,-1,5))}></Pawn>
        <Pawn offset={layout.hexToPixel(new Hex(-3,-1,4))}></Pawn>
        <Pawn offset={layout.hexToPixel(new Hex(-2,-1,3))}></Pawn>
        <Pawn offset={layout.hexToPixel(new Hex(-1,-1,2))}></Pawn>
        <Pawn offset={layout.hexToPixel(new Hex(0,-1,1))}></Pawn>
        <Pawn offset={layout.hexToPixel(new Hex(1,-2,1))}></Pawn>
        <Pawn offset={layout.hexToPixel(new Hex(2,-3,1))}></Pawn>
        <Pawn offset={layout.hexToPixel(new Hex(3,-4,1))}></Pawn>
        <Pawn offset={layout.hexToPixel(new Hex(4,-5,1))}></Pawn> -->
    </svg>

    <!-- <Piece layout={layout}, hex={new Hex(0,-4,4)}></Piece> -->
    <Piece layout={layout} hex={new Hex(0,0,0)} parent={div}></Piece>
</div>

<style>
    .board {
        position:relative;
    }
</style>