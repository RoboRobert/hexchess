<script lang="ts">
    import Board from "$lib/board/Board.svelte";
    import { Theme } from "$lib/board/ColorPicker";
</script>

<h1>Hexagonal Chess</h1>

<Board radius={5} hexSize={50} theme={Theme.WOOD}></Board>