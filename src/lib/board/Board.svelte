<script lang="ts">
    import { HexData } from '$lib/hexagons/HexData';
    import { Layout, Point } from '$lib/hexagons/HexLib';
    import Piece from "$lib/pieces/Piece.svelte";
    import { PieceData } from "$lib/pieces/PieceData";
    import { flatLayout, layoutStore, pieceStore, themeStore } from "$lib/state/stateStore";
    import { ColorPicker, Theme } from "./ColorPicker";
    import Hexagon from "./Hexagon.svelte";

    export let radius: number;
    export let hexSize: number;

    let layout: Layout = flatLayout;
    layoutStore.subscribe((newLayout) => {layout = newLayout});
    
    let theme: Theme = Theme.GRAYSCALE;
    themeStore.subscribe((newTheme) => {theme = newTheme; createHexArray()});

    const gridLength = (radius*2) + 1;

    var hexArray: HexData[] = [];

    var pieceArr: PieceData[] = [];
    pieceStore.subscribe((array) => {pieceArr = array;});
    // pieceStore.subscribe((array) => {pieceArr = array;});

    function createHexArray() {
        hexArray = [];
        let pickerStart: ColorPicker = new ColorPicker(0, theme);

        // Creates a grid of hexagons with at most radius distance from the origin, and a specified color pattern
        for(let q = radius; q >=(radius*-1); q--) {
            let picker: ColorPicker = new ColorPicker(pickerStart.currentIndex, pickerStart.theme);
            for(let r = radius; r >= (radius*-1); r--) {
                let s = (q*-1) + (r*-1);
                if((Math.abs(q) + Math.abs(r) + Math.abs(s)) <= 2*radius) {
                    hexArray.push(new HexData(q,r,hexSize,picker.next()));
                }
            }
            if(q > 0) 
                pickerStart.next();
            else pickerStart.previous();
        }
    }

    createHexArray();
    
    // Calculates the height and width of the array of hexagons
    const heightWidth: Point = new Point((hexSize*(3/2))*gridLength, hexSize*Math.sqrt(3)*gridLength);
    const viewBoxString = `${heightWidth.x/-2} ${heightWidth.y/-2} ${heightWidth.x} ${heightWidth.y}`;

    let div: HTMLElement;
</script>

{#key [layout, pieceArr]}
    <div class="board" bind:this={div}>
        <!-- Board hexagons -->
        <svg overflow="visible" viewBox={viewBoxString} width={heightWidth.x} height={heightWidth.y}>
            {#each hexArray as {q,r,color}}
                <Hexagon q={q} r={r} color={color}></Hexagon>
            {/each}
        </svg>

        <!-- All pieces -->
        {#each pieceArr as data}
            <Piece piece = {data}></Piece>
        {/each}
    </div>
{/key}

<style>
    .board {
        position:relative;
    }
</style>