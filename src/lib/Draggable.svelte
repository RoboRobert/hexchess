<script lang="ts">
    let x = 0;
    let y = 0;

    let width = 0;
    let height = 0;

    let div: HTMLElement;

    let dragging = false;

    function handleMouseUp(e:MouseEvent) {
        // div.setAttribute("style", "");
        dragging = false;
        div.style.cursor = "";
    }

    function handleMouseDown(e:MouseEvent) {
        dragging = true;

        width = div.getBoundingClientRect().width;
        height = div.getBoundingClientRect().height;

        console.log(width, height);

        x = e.clientX - width/2;
        y = e.clientY - height/2;

        div.style.transform = `translate(${x}px, ${y}px)`
        div.style.cursor = "grabbing";
    }

    function handleMouseMove(e:MouseEvent) {
        if(dragging) {
            x = e.clientX - width/2;
            y = e.clientY - height/2;
            div.style.transform = `translate(${x}px, ${y}px)`
        }
        console.log(e.clientX, e.clientY);
    }
</script>

<svelte:window on:mousemove={handleMouseMove} on:mouseup={handleMouseUp}></svelte:window>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="draggable" bind:this={div} on:mousedown={handleMouseDown}
>
    LOL
</div>

<style>
    .draggable {
        cursor: grab;
        width: 100px;
        height: 200px;
        position: absolute;
        text-align: center;
        border: 5px solid black;
        background-color:white;
        color:black;
    }
</style>