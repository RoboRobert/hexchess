<script lang="ts">
    import Board from "$lib/board/Board.svelte";
    import { Theme } from "$lib/board/ColorPicker";
    import { Layout, Point } from "$lib/hexagons/HexLib";
    import {
        flatLayout,
        layoutStore,
        pointyLayout,
        themeStore,
    } from "$lib/state/stateStore";

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

        layoutStore.update((oldLayout) => (oldLayout = newLayout));
    }
</script>

<h1>Hexagonal Chess</h1>

<select
    style="margin:10px"
    bind:value={selectedTheme}
    on:change={(e) =>
        themeStore.update((oldTheme) => (oldTheme = selectedTheme))}
>
    <option value={Theme.GRAYSCALE} selected>Grayscale</option>
    <option value={Theme.WOOD}>Wood</option>
</select>

<select
    style="margin:10px"
    bind:value={selectedLayout}
    on:change={(e) => {
        updateLayout(selectedLayout);
    }}
>
    <option value={0} selected>Flat</option>
    <option value={1}>Pointy</option>
</select>

<Board radius={5} hexSize={50}></Board>
