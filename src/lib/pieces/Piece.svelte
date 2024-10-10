<script lang="ts">
    import DragPiece from "./DragPiece.svelte";
    import { PieceData } from "./PieceData";

    export let piece: PieceData;
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