<script lang="ts">
    import type { BoardData } from "$lib/state/BoardData";
    import type { GameState } from "$lib/state/GameState";
    import { boardData, gameState } from "$lib/state/stateStore";
    import DragPiece from "./DragPiece.svelte";
    import { ColorEnum, PieceData } from "./PieceData";

    export let piece: PieceData;

    let boardMeta: BoardData = $boardData;
    let gameMeta: GameState = $gameState;
    const size = boardMeta.layout.size.x;
    
    let flipPieces = 1;
    if(boardMeta.flip === true && PieceData.colorToEnum(gameMeta.currentColor) === ColorEnum.BLACK) {
        flipPieces = -1;
    }
</script>

<DragPiece currentPiece={piece}>
    <!-- svelte-ignore a11y-missing-attribute -->
    <img
        style="z-index:100; width:{size*1.3}px; height: {size*1.3}px; transform: scaleY({flipPieces});"
        class="piece"
        draggable="false"
        src={piece.pieceImage}
    />
</DragPiece>
