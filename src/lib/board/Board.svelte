<script lang="ts">
    import Hexagon from "./Hexagon.svelte";
    import { ColorPicker, Theme} from "./ColorPicker";
    import { HexData } from '$lib/hexagons/HexData';
    import { Hex, Layout, Orientation, Point } from '$lib/hexagons/HexLib';
    import Piece from "$lib/pieces/Piece.svelte";
    import { PieceEnum } from "$lib/pieces/PieceEnum";
    import { defaultLayout, layoutStore, themeStore } from "$lib/state/stateStore";

    export let radius: number;
    export let hexSize: number;
    // export let layoutOrientation: Orientation;
    let layout: Layout = defaultLayout;
    layoutStore.subscribe((newLayout) => {layout = newLayout});
    
    let theme: Theme = Theme.GRAYSCALE;
    themeStore.subscribe((newTheme) => {theme = newTheme; createHexArray()});

    const gridLength = (radius*2) + 1;

    var hexArray: HexData[] = [];

    function createHexArray() {
        hexArray = [];
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
    }

    createHexArray();
    
    // Calculates the height and width of the array of hexagons
    const heightWidth: Point = new Point((hexSize*(3/2))*gridLength, hexSize*Math.sqrt(3)*gridLength);
    const viewBoxString = `${heightWidth.x/-2} ${heightWidth.y/-2} ${heightWidth.x} ${heightWidth.y}`;

    let div: HTMLElement;
</script>

{#key layout}
    <div class="board" bind:this={div}>
        <svg overflow="visible" viewBox={viewBoxString} width={heightWidth.x} height={heightWidth.y}>
            {#each hexArray as {q,r,s,color}}
                <Hexagon layout={layout} q={q} r={r} s={s} color={color}></Hexagon>
            {/each}
        </svg>
        
        <!-- Black Bishops -->
        <Piece hex={new Hex(0,-5)} pieceString={PieceEnum.BLACK_BISHOP}></Piece>
        <Piece hex={new Hex(0,-4)} pieceString={PieceEnum.BLACK_BISHOP}></Piece>
        <Piece hex={new Hex(0,-3)} pieceString={PieceEnum.BLACK_BISHOP}></Piece>

        <!-- White Bishops -->
        <Piece hex={new Hex(0,5)} pieceString={PieceEnum.WHITE_BISHOP}></Piece>
        <Piece hex={new Hex(0,4)} pieceString={PieceEnum.WHITE_BISHOP}></Piece>
        <Piece hex={new Hex(0,3)} pieceString={PieceEnum.WHITE_BISHOP}></Piece>

        <!-- Black pawns -->
        <Piece hex={new Hex(-4,-1)} pieceString={PieceEnum.BLACK_PAWN}></Piece>
        <Piece hex={new Hex(-3,-1)} pieceString={PieceEnum.BLACK_PAWN}></Piece>
        <Piece hex={new Hex(-2,-1)} pieceString={PieceEnum.BLACK_PAWN}></Piece>
        <Piece hex={new Hex(-1,-1)} pieceString={PieceEnum.BLACK_PAWN}></Piece>
        <Piece hex={new Hex(0,-1)} pieceString={PieceEnum.BLACK_PAWN}></Piece>
        <Piece hex={new Hex(1,-2)} pieceString={PieceEnum.BLACK_PAWN}></Piece>
        <Piece hex={new Hex(2,-3)} pieceString={PieceEnum.BLACK_PAWN}></Piece>
        <Piece hex={new Hex(3,-4)} pieceString={PieceEnum.BLACK_PAWN}></Piece>
        <Piece hex={new Hex(4,-5)} pieceString={PieceEnum.BLACK_PAWN}></Piece>
        
        <!-- White Pawns -->
        <Piece hex={new Hex(-4,5)} pieceString={PieceEnum.WHITE_PAWN}></Piece>
        <Piece hex={new Hex(-3,4)} pieceString={PieceEnum.WHITE_PAWN}></Piece>
        <Piece hex={new Hex(-2,3)} pieceString={PieceEnum.WHITE_PAWN}></Piece>
        <Piece hex={new Hex(-1,2)} pieceString={PieceEnum.WHITE_PAWN}></Piece>
        <Piece hex={new Hex(0,1)} pieceString={PieceEnum.WHITE_PAWN}></Piece>
        <Piece hex={new Hex(1,1)} pieceString={PieceEnum.WHITE_PAWN}></Piece>
        <Piece hex={new Hex(2,1)} pieceString={PieceEnum.WHITE_PAWN}></Piece>
        <Piece hex={new Hex(3,1)} pieceString={PieceEnum.WHITE_PAWN}></Piece>
        <Piece hex={new Hex(4,1)} pieceString={PieceEnum.WHITE_PAWN}></Piece>

        <!-- Black Rooks -->
        <Piece hex={new Hex(-3,-2)} pieceString={PieceEnum.BLACK_ROOK}></Piece>
        <Piece hex={new Hex(3,-5)} pieceString={PieceEnum.BLACK_ROOK}></Piece>

        <!-- White Rooks -->
        <Piece hex={new Hex(-3,5)} pieceString={PieceEnum.WHITE_ROOK}></Piece>
        <Piece hex={new Hex(3,2)} pieceString={PieceEnum.WHITE_ROOK}></Piece>

        <!-- Black Knights -->
        <Piece hex={new Hex(-2,-3)} pieceString={PieceEnum.BLACK_KNIGHT}></Piece>
        <Piece hex={new Hex(2,-5)} pieceString={PieceEnum.BLACK_KNIGHT}></Piece>

        <!-- White Knights -->
        <Piece hex={new Hex(-2,5)} pieceString={PieceEnum.WHITE_KNIGHT}></Piece>
        <Piece hex={new Hex(2,3)} pieceString={PieceEnum.WHITE_KNIGHT}></Piece>

        <!-- Queens -->
        <Piece hex={new Hex(-1,-4)} pieceString={PieceEnum.BLACK_QUEEN}></Piece>
        <Piece hex={new Hex(-1,5)} pieceString={PieceEnum.WHITE_QUEEN}></Piece>

        <!-- Kings -->
        <Piece hex={new Hex(1,-5)} pieceString={PieceEnum.BLACK_KING}></Piece>
        <Piece hex={new Hex(1,4)} pieceString={PieceEnum.WHITE_KING}></Piece>
    </div>
{/key}

<style>
    .board {
        position:relative;
    }
</style>