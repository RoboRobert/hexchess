<script lang="ts">
    import { onMount } from "svelte";

    let x = 0;
    let y = 0;

    let width = 0;
    let height = 0;

    let parent: HTMLElement;
    let div: HTMLElement;

    let dropList: Element[] = [];

    let dropTarget: HTMLElement | undefined;

    let dragging = false;

    onMount(() => div = parent.firstElementChild as HTMLElement)

    function handleMouseUp(e:MouseEvent) {
        dragging = false;
        div.style.cursor = "";

        if (dropTarget != undefined) {
            dropTarget.classList.remove("canDrop");
            let targetRect = (dropTarget as HTMLElement).getBoundingClientRect();

            div.style.left = `${targetRect.left + targetRect.width/2 - width/2}px`
            div.style.top = `${targetRect.top + targetRect.height/2 - height/2}px`
            dropTarget = undefined;
        }
    }

    function handleMouseDown(e:MouseEvent) {
        dragging = true;

        width = div.getBoundingClientRect().width;
        height = div.getBoundingClientRect().height;

        console.log(width, height);

        x = e.clientX - width/2;
        y = e.clientY - height/2;

        div.style.left = `${x}px`
        div.style.top = `${y}px`

        div.style.cursor = "grabbing";
    }

    function handleMouseMove(e:MouseEvent) {
        if(dragging) {
            x = e.clientX - width/2;
            y = e.clientY - height/2;
            div.style.left = `${x}px`
            div.style.top = `${y}px`

            dropList = document.elementsFromPoint(e.clientX, e.clientY);
            dropTarget?.classList.remove("canDrop");
            dropTarget = undefined;
            if (dropList.length > 2 && dropList[1].classList.contains("droppable")) {
                dropTarget = dropList[1] as HTMLElement;
                dropTarget.classList.add("canDrop");
            }
        }
    }
</script>

<svelte:window on:mousemove={handleMouseMove} on:mouseup={handleMouseUp} />

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="draggable" bind:this={parent} on:mousedown={handleMouseDown}>
    <slot></slot>
</div>

<style>
    .draggable {
        cursor: grab;
        position: absolute;
        /* width: 50px;
        height: 50px;
        text-align: center;
        border: 5px solid black;
        background-color: white;
        color: black; */
    }
</style>
