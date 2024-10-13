<script lang="ts">
    import type { BoardData } from "$lib/state/BoardData";
    import { boardData, defaultBoard } from "$lib/state/stateStore";
    import { onMount } from "svelte";
    import { PieceData } from "./PieceData";
    import { Hex } from "$lib/hexagons/HexLib";

    export let currentPiece: PieceData;

    let boardMeta: BoardData = defaultBoard;
    boardData.subscribe((data) => {
        boardMeta = data;
    });

    let startX: string;
    let startY: string;

    // Offsets from the parent element.
    let pOffsetX = 0;
    let pOffsetY = 0;

    let width = 0;
    let height = 0;

    let div: HTMLElement;

    let dropList: Element[] = [];

    let hexMoves: HTMLElement[] = [];
    let hexCaptures: HTMLElement[] = [];

    let previousColor: string;
    let previousStroke: string;
    let dropTarget: HTMLElement | undefined;

    let dragging = false;
    let snapBack = true;

    onMount(() => {
        updatePos();
    });

    function updatePos() {
        width = div.getBoundingClientRect().width;
        height = div.getBoundingClientRect().height;

        // Find the correct hexagon by id
        let targetRect = (
            document.getElementById(
                `${currentPiece.hex.q},${currentPiece.hex.r}`,
            ) as HTMLElement
        ).getBoundingClientRect();

        pOffsetX = div.parentElement?.getBoundingClientRect().left as number;
        pOffsetY = div.parentElement?.getBoundingClientRect().top as number;

        div.setAttribute(
            "style",
            `left:${targetRect.left + targetRect.width / 2 - width / 2 - pOffsetX}px; top:${targetRect.top + targetRect.height / 2 - height / 2 - pOffsetY}px;`,
        );
    }

    function handlePointerUp(e: PointerEvent) {
        div.style.cursor = "";
        div.style.zIndex = "";

        hexMoves.forEach((e) => e.classList.remove("orange"));
        hexCaptures.forEach((e) => e.classList.remove("red"));

        if (!dragging) return;

        dragging = false;

        if (dropTarget != undefined) {
            setColors(dropTarget, previousColor, previousStroke);

            // Get the coordinates from the drop target's attributes
            let q = parseInt(dropTarget.getAttribute("data-q") as string);
            let r = parseInt(dropTarget.getAttribute("data-r") as string);

            // If the move was successful, then update the board's state
            currentPiece.movePiece(new Hex(q, r));

            updatePos();

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

        let legalMoves = currentPiece.getLegalMoves();

        let captures = legalMoves.filter((e) => PieceData.pieceOn(e.attacking));
        captures.forEach((e) =>
            hexCaptures.push(
                document.getElementById(`${e.to.q},${e.to.r}`) as HTMLElement,
            )
        );

        let moves = legalMoves.filter((e) => !PieceData.pieceOn(e.attacking));
        moves.forEach((e) =>
            hexMoves.push(
                document.getElementById(`${e.to.q},${e.to.r}`) as HTMLElement,
            )
        );

        hexMoves.forEach((e) => e.classList.add("orange"));
        hexCaptures.forEach((e) => e.classList.add("red"));

        handleMove(e);

        div.style.cursor = "grabbing";
        div.style.zIndex = "100";
    }

    function handlePointerMove(e: PointerEvent) {
        if (dragging) {
            handleMove(e);
        }
    }

    function handleMove(e: PointerEvent) {
        let x = e.clientX - width / 2 - pOffsetX;
        let y = e.clientY - height / 2 - pOffsetY;
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
