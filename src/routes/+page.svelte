<script lang="ts">
    import Board from "$lib/board/Board.svelte";
    import { Theme } from "$lib/board/ColorPicker";
    import { LayoutEnum } from "$lib/state/BoardData";
    import type { GameState } from "$lib/state/GameState";
    import { boardData, gameState } from "$lib/state/stateStore";
    import Popup from "$lib/ui/Popup.svelte";
    import Slider from "$lib/ui/Slider.svelte";

    $: selectedTheme = Theme.GRAYSCALE;
    $: selectedLayout = 0;

    let currentState: GameState;
    gameState.subscribe((data) => (currentState = data));

    function updateLayout(id: number) {
        let newLayout: LayoutEnum = LayoutEnum.DEFAULT;
        switch (id) {
            case 0: {
                newLayout = LayoutEnum.DEFAULT;
                break;
            }

            case 1: {
                newLayout = LayoutEnum.FLIPPED;
                break;
            }
        }

        boardData.update((old) => {
            let newData = old;
            newData.layout = old.getLayout(newLayout);
            return newData;
        });
    }
</script>

<h1 class="ui">Hexagonal Chess</h1>

<select
    class="ui"
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
    class="ui"
    bind:value={selectedLayout}
    on:change={(e) => {
        updateLayout(selectedLayout);
    }}
>
    <option value={0} selected>Default</option>
    <option value={1}>Flipped</option>
</select>

<!-- <Slider></Slider> -->

<!-- <button on:pointerup={function() {boardData.update((data) => {let newData = data; newData.flipped = !newData.flipped; return newData})}}>Flip Board</button> -->

<!-- <h2 style="margin-bottom: 20px">{currentState.currentColor} TO MOVE</h2> -->

{#if currentState.checkmate}
    <Popup
        text={currentState.checkmate[0] +
            " checkmated " +
            currentState.checkmate[1]}
    ></Popup>
{/if}

{#if currentState.stalemate}
    <Popup text="Stalemate!"></Popup>
{/if}

<Board></Board>
