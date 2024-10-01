<script lang="ts">
    import Board from "$lib/board/Board.svelte";
    import Draggable from "$lib/Draggable.svelte";
    import { Hex, Layout } from "$lib/hexagons/HexLib";
    import { defaultLayout, layoutStore } from "$lib/state/stateStore";

    export let hex: Hex;
    export let pieceString: string;

    let layout: Layout = defaultLayout;
    layoutStore.subscribe((newLayout) => {layout = newLayout});

    let offset = layout.hexToPixel(hex);
</script>

<Draggable offset={offset}>
    <!-- svelte-ignore a11y-missing-attribute -->
    <img class="piece" draggable=false src="{pieceString}">
</Draggable>

<style>
    .piece {
        width: 65px;
        height: 65px;
    }
</style>