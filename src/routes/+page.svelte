<script lang="ts">
	import Board from '$lib/board/Board.svelte';
	import { Theme } from '$lib/board/ColorPicker';
	import { LayoutEnum } from '$lib/state/BoardData';
	import type { GameState } from '$lib/state/GameState';
	import { boardData, gameState } from '$lib/state/stateStore';
	import Popup from '$lib/ui/Popup.svelte';
	import Slider from '$lib/ui/Slider.svelte';

	type ThemeType = 'GRAYSCALE' | 'WOOD';
	type LayoutType = 'DEFAULT' | 'FLIPPED' | 'PASS_AND_PLAY';

	const selectedTheme: ThemeType = $state('GRAYSCALE');
	const selectedLayout: LayoutType = $state('DEFAULT');
	// $: selectedTheme = Theme.GRAYSCALE;
	// $: selectedLayout = 0;

	let currentState: GameState = $gameState;

	function updateLayout(id: number) {
		let newBoard = $boardData;
		switch (id) {
			case 0: {
				newBoard.flip = false;
				newBoard.layout = newBoard.getLayout(LayoutEnum.DEFAULT);
				break;
			}

			case 1: {
				newBoard.flip = false;
				newBoard.layout = newBoard.getLayout(LayoutEnum.FLIPPED);
				break;
			}

			case 2: {
				newBoard.flip = true;
				newBoard.layout = newBoard.getLayout(LayoutEnum.DEFAULT);
				break;
			}
		}

		boardData.set(newBoard);
	}
</script>

<h1 class="ui">Hexagonal Chess</h1>

<select class="ui">
	<option value="GRAYSCALE" selected>Grayscale</option>
	<option value="WOOD">Wood</option>
</select>

<select class="ui">
	<option value="DEFAULT" selected>Default</option>
	<option value="FLIPPED">Flipped</option>
	<option value="PASS_AND_PLAY">Pass and Play</option>
</select>

{#if currentState.checkmate}
	<Popup text={currentState.checkmate[0] + ' checkmated ' + currentState.checkmate[1]}></Popup>
{/if}

{#if currentState.stalemate}
	<Popup text="Stalemate!"></Popup>
{/if}

<!-- <Board></Board> -->
