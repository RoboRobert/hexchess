<script lang="ts">
    import Draggable from "$lib/Draggable.svelte";
    import {Point, Layout, Hex} from "$lib/hexagons/HexLib";
    import { onMount } from "svelte";

    export let layout: Layout;
    export let hex: Hex;
    export let parent: HTMLElement;

    let offset = layout.hexToPixel(hex);
</script>

<Draggable offset={offset}>
    <!-- svelte-ignore a11y-missing-attribute -->
    <img class="piece" draggable=false src="/svgs/Chess_bdt45.svg">
</Draggable>

<style>
    .piece {
        width: 65px;
        height: 65px;
    }
</style>