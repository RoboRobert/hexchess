<script lang="ts">
    import { Hex, Layout } from "$lib/hexagons/HexLib";
    import { flatLayout, layoutStore } from "$lib/state/stateStore";
    import DragPiece from "./DragPiece.svelte";
    import { PieceData } from "./PieceData";

    export let piece: PieceData;

    let layout: Layout = flatLayout;
    layoutStore.subscribe((newLayout) => {layout = newLayout});
</script>

<DragPiece currentPiece={piece}>
    <!-- svelte-ignore a11y-missing-attribute -->
    <img class="piece" draggable=false src="{piece.pieceImage}">
</DragPiece>

<style>
    .piece {
        width: 65px;
        height: 65px;
    }
</style>