<script lang="ts">
    import type { BoardData } from "$lib/state/BoardData";
    import { boardData, defaultBoard } from "$lib/state/stateStore";
    import DragPiece from "./DragPiece.svelte";
    import { PieceData } from "./PieceData";

    export let piece: PieceData;

    let boardMeta: BoardData = defaultBoard;
    boardData.subscribe((data) => {
        boardMeta = data;
    });
    const size = boardMeta.layout.size.x;
</script>

<DragPiece currentPiece={piece}>
    <!-- svelte-ignore a11y-missing-attribute -->
    <img
        style="z-index:100; width:{size*1.3}px; height: {size*1.3}px"
        class="piece"
        draggable="false"
        src={piece.pieceImage}
    />
</DragPiece>
