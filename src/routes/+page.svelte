<script lang="ts">
    import Board from "$lib/board/Board.svelte";
    import { Theme } from "$lib/board/ColorPicker";
    import Draggable from "$lib/Draggable.svelte";
</script>

<main>
    <Board radius={5} hexSize={50} theme={Theme.GRAYSCALE}></Board>
    <Draggable></Draggable>
</main>
