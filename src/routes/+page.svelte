<script lang="ts">
    import Board from "$lib/board/Board.svelte";
    import { Theme } from "$lib/board/ColorPicker";
    import Draggable from "$lib/Draggable.svelte";
    import Bishop from "$lib/pieces/Bishop.svelte";
</script>

<main class="main">
    <Board radius={5} hexSize={50} theme={Theme.GRAYSCALE}></Board>
</main>