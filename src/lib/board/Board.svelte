<script lang="ts">
    import { HexData } from "$lib/hexagons/HexData";
    import { Hex, Point } from "$lib/hexagons/HexLib";
    import Piece from "$lib/pieces/Piece.svelte";
    import { PieceData } from "$lib/pieces/PieceData";
    import type { BoardData } from "$lib/state/BoardData";
    import { BoardEffects, Effects } from "$lib/state/BoardEffects";
    import {
        boardData,
        defaultBoard,
        effectStore,
        pieceStore,
    } from "$lib/state/stateStore";
    import CircleEffect from "$lib/ui/CircleEffect.svelte";
    import HexEffect from "$lib/ui/HexEffect.svelte";
    import { ColorPicker } from "./ColorPicker";
    import Coordinate from "./Coordinate.svelte";
    import Hexagon from "./Hexagon.svelte";

    let boardMeta: BoardData = defaultBoard;
    boardData.subscribe((data) => {
        boardMeta = data;
        createHexArray();
    });

    const gridLength = boardMeta.radius * 2 + 1;

    var hexArray: HexData[] = [];

    var effects: BoardEffects = new BoardEffects(undefined, [], [], [], []);
    effectStore.subscribe((store) => (effects = store));

    var pieceArr: PieceData[] = [];
    pieceStore.subscribe((array) => {
        pieceArr = array;
    });

    function createHexArray() {
        hexArray = [];
        let pickerStart: ColorPicker = new ColorPicker(0, boardMeta.theme);

        // Creates a grid of hexagons with at most radius distance from the origin, and a specified color pattern
        for (let q = boardMeta.radius; q >= boardMeta.radius * -1; q--) {
            let picker: ColorPicker = new ColorPicker(
                pickerStart.currentIndex,
                pickerStart.theme,
            );
            for (let r = boardMeta.radius; r >= boardMeta.radius * -1; r--) {
                let s = q * -1 + r * -1;
                let newHex = new Hex(q, r);
                if (newHex.inRadius(boardMeta.radius)) {
                    hexArray.push(
                        new HexData(q, r, boardMeta.hexSize, picker.next()),
                    );
                }
            }
            if (q > 0) pickerStart.next();
            else pickerStart.previous();
        }
    }

    createHexArray();

    // Calculates the height and width of the array of hexagons
    const heightWidth: Point = new Point(
        boardMeta.hexSize * (3 / 2) * gridLength,
        boardMeta.hexSize * Math.sqrt(3) * (gridLength + 1),
    );
    const viewBoxString = `${heightWidth.x / -2} ${heightWidth.y / -2} ${heightWidth.x} ${heightWidth.y}`;

    let div: HTMLElement;
</script>

{#key [boardMeta.theme, pieceArr]}
    <div class="board" bind:this={div}>
        <!-- Board -->
        <svg
            overflow="visible"
            viewBox={viewBoxString}
            width={heightWidth.x}
            height={heightWidth.y}
        >
            <!-- Hexagons -->
            {#each hexArray as { q, r, color }}
                <Hexagon {q} {r} {color}></Hexagon>
            {/each}

            <!-- All board effects. The last #each block will render on top of the ones closer to the top
             of the file. -->
            {#key effects}
                <!-- Previous move -->
                {#each effects.previous as i}
                    <HexEffect q={i.q} r={i.r} color={Effects.PREVIOUS}
                    ></HexEffect>
                {/each}

                <!-- Legal moves -->
                {#each effects.legal as i}
                    <CircleEffect
                        q={i.q}
                        r={i.r}
                        size={boardMeta.hexSize / 5}
                        color={Effects.LEGAL}
                        fill={true}
                    ></CircleEffect>
                {/each}

                <!-- Attack effects -->
                {#each effects.attacks as i}
                    <CircleEffect
                        q={i.q}
                        r={i.r}
                        size={boardMeta.hexSize / 1.5}
                        color={Effects.ATTACK}
                        fill={false}
                    ></CircleEffect>
                {/each}

                <!-- The square of the currently selected piece -->
                {#if effects.current}
                    <HexEffect
                        q={effects.current.q}
                        r={effects.current.r}
                        color={Effects.CURRENT}
                    ></HexEffect>
                {/if}

                <!-- Selections -->
                {#each effects.selections as i}
                    <CircleEffect
                        q={i.q}
                        r={i.r}
                        size={boardMeta.hexSize / 1.5}
                        color={Effects.SELECTED}
                        fill={false}
                    ></CircleEffect>
                {/each}
            {/key}

            <!-- Board coordinates -->
            <!-- Alphabetical -->
            <Coordinate q={-5} r={6} text={"a"}></Coordinate>
            <Coordinate q={-4} r={6} text={"b"}></Coordinate>
            <Coordinate q={-3} r={6} text={"c"}></Coordinate>
            <Coordinate q={-2} r={6} text={"d"}></Coordinate>
            <Coordinate q={-1} r={6} text={"e"}></Coordinate>
            <Coordinate q={0} r={6} text={"f"}></Coordinate>
            <Coordinate q={1} r={5} text={"g"}></Coordinate>
            <Coordinate q={2} r={4} text={"h"}></Coordinate>
            <Coordinate q={3} r={3} text={"i"}></Coordinate>
            <Coordinate q={4} r={2} text={"k"}></Coordinate>
            <Coordinate q={5} r={1} text={"l"}></Coordinate>

            <!-- Numerical -->
            <!-- Left side -->
            <Coordinate q={-6} r={5} text={"1"}></Coordinate>
            <Coordinate q={-6} r={4} text={"2"}></Coordinate>
            <Coordinate q={-6} r={3} text={"3"}></Coordinate>
            <Coordinate q={-6} r={2} text={"4"}></Coordinate>
            <Coordinate q={-6} r={1} text={"5"}></Coordinate>
            <Coordinate q={-6} r={0} text={"6"}></Coordinate>
            <Coordinate q={-5} r={-1} text={"7"}></Coordinate>
            <Coordinate q={-4} r={-2} text={"8"}></Coordinate>
            <Coordinate q={-3} r={-3} text={"9"}></Coordinate>
            <Coordinate q={-2} r={-4} text={"10"}></Coordinate>
            <Coordinate q={-1} r={-5} text={"11"}></Coordinate>

            <!-- Right side -->
            <Coordinate q={6} r={-1} text={"1"}></Coordinate>
            <Coordinate q={6} r={-2} text={"2"}></Coordinate>
            <Coordinate q={6} r={-3} text={"3"}></Coordinate>
            <Coordinate q={6} r={-4} text={"4"}></Coordinate>
            <Coordinate q={6} r={-5} text={"5"}></Coordinate>
            <Coordinate q={6} r={-6} text={"6"}></Coordinate>
            <Coordinate q={5} r={-6} text={"7"}></Coordinate>
            <Coordinate q={4} r={-6} text={"8"}></Coordinate>
            <Coordinate q={3} r={-6} text={"9"}></Coordinate>
            <Coordinate q={2} r={-6} text={"10"}></Coordinate>
            <Coordinate q={1} r={-6} text={"11"}></Coordinate>
        </svg>

        <!-- All pieces -->
        {#each pieceArr as data}
            <Piece piece={data}></Piece>
        {/each}
    </div>
{/key}

<style>
    .board {
        position: relative;
    }
</style>
