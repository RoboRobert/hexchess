<script lang="ts">
    import { Hex, Point, type Layout } from "$lib/hexagons/HexLib";
    import { flatLayout, layoutStore } from "$lib/state/stateStore";
    import { onMount } from "svelte";
    import type { PieceData } from "./PieceData";

    export let currentPiece: PieceData;

    let layout: Layout = flatLayout;
    layoutStore.subscribe((newLayout) => {layout = newLayout});

    let offset: Point;

    let x = 0;
    let y = 0;

    let startX: string;
    let startY: string;

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

    onMount(() => {updatePos()});

    function updatePos() {
        offset = layout.hexToPixel(new Hex(currentPiece.hexCoords[0], currentPiece.hexCoords[1]));
        width = div.getBoundingClientRect().width;
        height = div.getBoundingClientRect().height;

        let pWidth = div.parentElement?.getBoundingClientRect()
            .width as number;
        let pHeight = div.parentElement?.getBoundingClientRect()
            .height as number;

        div.setAttribute(
            "style",
            `left:${offset.x + pWidth / 2 - width / 2}px; top:${offset.y + pHeight / 2 - height / 2}px;`,
        );
    }

    function handlePointerUp(e: PointerEvent) {
        div.style.cursor = "";

        if (!dragging) return;

        dragging = false;

        if (dropTarget != undefined) {
            setColors(dropTarget, previousColor, previousStroke);

            let targetRect = (
                dropTarget as HTMLElement
            ).getBoundingClientRect();
            
            let q = parseInt(dropTarget.getAttribute("data-q") as string);
            let r = parseInt(dropTarget.getAttribute("data-r") as string);

            offset = layout.hexToPixel(new Hex(q,r));
            
            currentPiece.movePiece([q,r]);

            // div.style.left = `${targetRect.left + targetRect.width / 2 - width / 2 - pOffsetX}px`;
            // div.style.top = `${targetRect.top + targetRect.height / 2 - height / 2 - pOffsetY}px`;
            dropTarget = undefined;

            return;
        }

        if (snapBack) {
            div.style.left = startX;
            div.style.top = startY;
            return;
        }
    }

    function handlePointerDown(e: PointerEvent) {
        dragging = true;

        startX = div.style.left;
        startY = div.style.top;

        pOffsetX = div.parentElement?.getBoundingClientRect().left as number;
        pOffsetY = div.parentElement?.getBoundingClientRect().top as number;

        handleMove(e);

        div.style.cursor = "grabbing";
    }

    function handlePointerMove(e: PointerEvent) {
        if (dragging) {
            handleMove(e);
        }
    }

    function handleMove(e: PointerEvent) {
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
<div class="draggable" bind:this={div} on:pointerdown={handlePointerDown}>
    <slot></slot>
</div>

<style>
    .draggable {
        cursor: grab;
        position: absolute;
    }
</style>
