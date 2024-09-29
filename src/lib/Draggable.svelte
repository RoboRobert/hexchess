<script lang="ts">
    // This class is designed to make drag and drop easy.
    // Meant to be used with a relatively positioned parent div.

    let x = 0;
    let y = 0;

    let offsetX = 0;
    let offsetY = 0;

    let width = 0;
    let height = 0;
    
    let div: HTMLElement;

    let dropList: Element[] = [];

    let dropTarget: HTMLElement | undefined;

    let dragging = false;

    function handlePointerUp(e: PointerEvent) {
        dragging = false;
        div.style.cursor = "";

        if (dropTarget != undefined) {
            dropTarget.classList.remove("canDrop");
            let targetRect = (
                dropTarget as HTMLElement
            ).getBoundingClientRect();

            div.style.left = `${targetRect.left + targetRect.width / 2 - width / 2 - offsetX}px`;
            div.style.top = `${targetRect.top + targetRect.height / 2 - height / 2 - offsetY}px`;
            dropTarget = undefined;
        }
    }

    function handlePointerDown(e: PointerEvent) {
        dragging = true;

        width = div.getBoundingClientRect().width;
        height = div.getBoundingClientRect().height;

        offsetX = div.parentElement?.getBoundingClientRect().left as number;
        offsetY = div.parentElement?.getBoundingClientRect().top as number;

        handleMove(e);

        div.style.cursor = "grabbing";
    }

    function handlePointerMove(e: PointerEvent) {
        console.log(e.clientX, e.clientY);
        console.log(div.getBoundingClientRect().left, div.getBoundingClientRect().top);
        if (dragging) {
            handleMove(e);
        }
    }

    function handleMove(e: PointerEvent) {
        x = e.clientX - width/2 - offsetX;
        y = e.clientY - height / 2 - offsetY;
        div.style.left = `${x}px`;
        div.style.top = `${y}px`;

        dropList = document.elementsFromPoint(e.clientX, e.clientY);
        dropTarget?.classList.remove("canDrop");
        dropTarget = undefined;

        // Finds the first droppable target, or undefined if none
        dropTarget = dropList.find((e) => e.classList.contains("droppable")) as
            | HTMLElement
            | undefined;

        if (dropTarget != undefined) {
            dropTarget.classList.add("canDrop");
        }
    }
</script>

<svelte:window on:pointermove={handlePointerMove} on:pointerup={handlePointerUp} />

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="draggable" bind:this={div} on:pointerdown={handlePointerDown}>
    <slot></slot>
</div>

<style>
    .draggable {
        cursor: grab;
        position: absolute;
        top: 50%;
        left: 50%;
        /* width: 50px;
        height: 50px;
        text-align: center;
        border: 5px solid black;
        background-color: white;
        color: black; */
    }
</style>
