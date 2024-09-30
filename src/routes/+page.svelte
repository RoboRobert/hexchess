<script lang="ts">
    import Board from "$lib/board/Board.svelte";
    import { Theme } from "$lib/board/ColorPicker";
    import { Layout } from "$lib/hexagons/HexLib";

    function changeLayout() {
        
    }
</script>

<h1>Hexagonal Chess</h1>

<button on:click={changeLayout} style="margin-bottom: 10px">Change Layout</button>

<Board radius={5} hexSize={50} theme={Theme.WOOD}></Board>