<script lang="ts">
    import type { Point } from "./hexagons/HexLib";

    // This component is designed to make drag and drop easy.
    // Use with a relatively positioned parent div.
    // Slot in anything you want to make it draggable and droppable.

    export let offset: Point;

    let x = 0;
    let y = 0;

    let startX:string;
    let startY:string;

    // Offsets from the parent element.
    let pOffsetX = 0;
    let pOffsetY = 0;

    let width = 0;
    let height = 0;

    let div: HTMLElement;

    let dropList: Element[] = [];

    let previousColor: string;
    let previousStroke: string;
    let dropTarget: HTMLElement | undefined;

    let dragging = false;
    let snapBack = true;

    function handlePointerUp(e: PointerEvent) {
        div.style.cursor = "";

        if (!dragging)
            return;

        dragging = false;

        if (dropTarget != undefined) {
            setColors(dropTarget, previousColor, previousStroke);

            let targetRect = (
                dropTarget as HTMLElement
            ).getBoundingClientRect();

            div.style.left = `${targetRect.left + targetRect.width / 2 - width / 2 - pOffsetX}px`;
            div.style.top = `${targetRect.top + targetRect.height / 2 - height / 2 - pOffsetY}px`;
            dropTarget = undefined;

            return;
        }

        if(snapBack) {
            div.style.left = startX;
            div.style.top = startY;
            return;
        }
    }

    function handlePointerDown(e: PointerEvent) {
        dragging = true;

        width = div.getBoundingClientRect().width;
        height = div.getBoundingClientRect().height;

        pOffsetX = div.parentElement?.getBoundingClientRect().left as number;
        pOffsetY = div.parentElement?.getBoundingClientRect().top as number;

        startX = div.style.left;
        startY = div.style.top;

        handleMove(e);

        div.style.cursor = "grabbing";
    }

    function handlePointerMove(e: PointerEvent) {
        if (dragging) {
            handleMove(e);
        }
    }

    function handleMove(e: PointerEvent) {
        console.log(offset.x, offset.y);
        x = e.clientX - width / 2 - pOffsetX;
        y = e.clientY - height / 2 - pOffsetY;
        div.style.left = `${x}px`;
        div.style.top = `${y}px`;

        dropList = document.elementsFromPoint(e.clientX, e.clientY);

        if (dropTarget != undefined) {
            setColors(dropTarget, previousColor, previousStroke);

            dropTarget = undefined;
        }

        // Finds the first droppable target, or undefined if none
        dropTarget = dropList.find((e) => e.classList.contains("droppable")) as
            | HTMLElement
            | undefined;

        if (dropTarget != undefined) {
            previousColor = dropTarget.style.fill;
            previousStroke = dropTarget.style.stroke;
            setColors(dropTarget, "yellow", previousStroke);
        }
    }

    function setColors(element: HTMLElement, color: string, stroke: string) {
        element.style.fill = color;
        element.style.stroke = stroke;
    }
</script>

<svelte:window
    on:pointermove={handlePointerMove}
    on:pointerup={handlePointerUp}
/>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="draggable" bind:this={div} on:pointerdown={handlePointerDown} style="left:{offset.x}px; top:{offset.y}px;">
    <slot></slot>
</div>

<style>
    .draggable {
        cursor: grab;
        position: absolute;
    }
</style>
