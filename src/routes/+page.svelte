<script lang="ts">
    import Board from "$lib/board/Board.svelte";
    import { Theme } from "$lib/board/ColorPicker";
    import { Layout, Point } from "$lib/hexagons/HexLib";
    import {
        defaultLayout,
        layoutStore,
        themeStore,
    } from "$lib/state/stateStore";

    $: selectedTheme = Theme.GRAYSCALE;
    $: selectedLayout = 0;

    function updateLayout(id: number) {
        let newLayout: Layout = defaultLayout;
        switch (id) {
            case 0: {
                newLayout = new Layout(
                    Layout.FLAT,
                    new Point(50, 50),
                    new Point(0, 0),
                );
                break;
            }

            case 1: {
                newLayout = new Layout(
                    Layout.POINTY,
                    new Point(50, 50),
                    new Point(0, 0),
                );
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
    <option selected value={0}>Flat</option>
    <option value={1}>Pointy</option>
</select>

<Board radius={5} hexSize={50}></Board>
