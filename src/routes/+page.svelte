<script lang="ts">
    import Board from "$lib/board/Board.svelte";
    import { Theme } from "$lib/board/ColorPicker";
    import { Layout } from "$lib/hexagons/HexLib";
    import { pointyLayout, flatLayout } from "$lib/state/BoardData";
    import { boardData } from "$lib/state/stateStore";

    $: selectedTheme = Theme.GRAYSCALE;
    $: selectedLayout = 0;

    function updateLayout(id: number) {
        let newLayout: Layout = flatLayout;
        switch (id) {
            case 0: {
                newLayout = flatLayout;
                break;
            }

            case 1: {
                newLayout = pointyLayout;
                break;
            }
        }

        boardData.update((old) => {
            let newData = old;
            newData.layout = newLayout;
            return newData;
        });
    }
</script>

<h1>Hexagonal Chess</h1>

<select
    style="margin:10px; margin-bottom: 20px;"
    bind:value={selectedTheme}
    on:change={(e) =>
        boardData.update((old) => {
            let newData = old;
            newData.theme = selectedTheme;
            return newData;
        })}
>
    <option value={Theme.GRAYSCALE} selected>Grayscale</option>
    <option value={Theme.WOOD}>Wood</option>
</select>

<select
    style="margin:10px; margin-bottom: 20px;"
    bind:value={selectedLayout}
    on:change={(e) => {
        updateLayout(selectedLayout);
    }}
>
    <option value={0} selected>Flat</option>
    <option value={1}>Pointy</option>
</select>

<Board></Board>
