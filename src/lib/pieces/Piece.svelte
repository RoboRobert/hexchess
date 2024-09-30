<script lang="ts">
    import Draggable from "$lib/Draggable.svelte";
    import { Hex, Layout } from "$lib/hexagons/HexLib";

    export let layout: Layout;
    export let hex: Hex;
    export let pieceString: string;

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