<script lang="ts">
    import { boardData } from "$lib/state/stateStore";

    // Create a variable to hold the slider value, initialized to 10
    let sliderValue = 10;

    // Optionally, define a min and max value
    const minValue = 100;
    const maxValue = 1000;

    function updateSize(value: number) {
        boardData.update((old) => {
            let newData = old;
            newData.hexSize = value/10;
            console.log(newData);
            return newData;
        });
    }
</script>

<style>
    .slider {
        width: 100%; /* Full width */
        margin: 20px 0; /* Spacing */
    }
</style>

<div>
    <label for="slider">Select a value between {minValue/10} and {maxValue/10}:</label>
    <input 
        type="range" 
        id="slider" 
        class="slider"
        bind:value={sliderValue}
        on:change={(e) => updateSize(sliderValue)}
        min={minValue} 
        max={maxValue} 
    />
    <p>Current Value: {sliderValue/10}</p>
</div>