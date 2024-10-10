<script lang="ts">
    import { HexData } from '$lib/hexagons/HexData';
    import { Hex, Point } from '$lib/hexagons/HexLib';
    import Piece from "$lib/pieces/Piece.svelte";
    import { PieceData } from "$lib/pieces/PieceData";
    import type { BoardData } from '$lib/state/BoardData';
    import { boardData, defaultBoard, pieceStore } from "$lib/state/stateStore";
    import { ColorPicker, Theme } from "./ColorPicker";
    import Hexagon from "./Hexagon.svelte";

    let boardMeta: BoardData = defaultBoard;
    boardData.subscribe((data) => {boardMeta = data});

    const gridLength = (boardMeta.radius*2) + 1;

    var hexArray: HexData[] = [];

    var pieceArr: PieceData[] = [];
    pieceStore.subscribe((array) => {pieceArr = array;});

    function createHexArray() {
        hexArray = [];
        let pickerStart: ColorPicker = new ColorPicker(0, boardMeta.theme);

        // Creates a grid of hexagons with at most radius distance from the origin, and a specified color pattern
        for(let q = boardMeta.radius; q >=(boardMeta.radius*-1); q--) {
            let picker: ColorPicker = new ColorPicker(pickerStart.currentIndex, pickerStart.theme);
            for(let r = boardMeta.radius; r >= (boardMeta.radius*-1); r--) {
                let s = (q*-1) + (r*-1);
                let newHex = new Hex(q,r);
                if(newHex.inRadius(boardMeta.radius)) {
                    hexArray.push(new HexData(q,r,boardMeta.hexSize,picker.next()));
                }
            }
            if(q > 0) 
                pickerStart.next();
            else pickerStart.previous();
        }
    }

    createHexArray();
    
    // Calculates the height and width of the array of hexagons
    const heightWidth: Point = new Point((boardMeta.hexSize*(3/2))*gridLength, boardMeta.hexSize*Math.sqrt(3)*gridLength);
    const viewBoxString = `${heightWidth.x/-2} ${heightWidth.y/-2} ${heightWidth.x} ${heightWidth.y}`;

    let div: HTMLElement;
</script>

{#key [boardMeta.theme, pieceArr]}
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