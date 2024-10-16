<script lang="ts">
    import type { BoardData } from "$lib/state/BoardData";
    import { boardData, defaultBoard, effectStore } from "$lib/state/stateStore";
    import { onMount } from "svelte";
    import { PieceData } from "./PieceData";
    import { Hex } from "$lib/hexagons/HexLib";
    import { BoardEffects } from "$lib/state/BoardEffects";

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

    let currentHex: Hex | undefined;
    let legal: Hex[] = [];
    let attacks: Hex[] = [];
    let selections: Hex[] = [];

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

    function handlePointerUp(e: any) {
        div.style.cursor = "";
        currentHex = undefined;
        attacks = [];
        legal = [];

        if (!dragging) return;

        dragging = false;

        if (selections.length > 0) {
            // If the move was successful, then update the board's state
            currentPiece.movePiece(selections[0]);

            updatePos();
        }

        if (snapBack) {
            div.style.left = startX;
            div.style.top = startY;
        }

        selections = [];

        // Update the global effects state
        updateState();

        return true;
    }

    function handlePointerDown(e: any) {
        dragging = true;

        startX = div.style.left;
        startY = div.style.top;

        pOffsetX = div.parentElement?.getBoundingClientRect().left as number;
        pOffsetY = div.parentElement?.getBoundingClientRect().top as number;

        let legalMoves = currentPiece.getLegalMoves(false);

        currentHex = currentPiece.hex;
        attacks = legalMoves.filter((e) => PieceData.pieceOn(e.attacking)).map((e) => e.to);
        legal = legalMoves.filter((e) => !PieceData.pieceOn(e.attacking)).map((e) => e.to);

        handleMove(e.clientX, e.clientY);

        div.style.cursor = "grabbing";
    }

    function handlePointerMove(e: PointerEvent) {
        if (dragging) {
            handleMove(e.clientX, e.clientY);
        }
    }

    function handleTouchMove(e: TouchEvent) {
        if (dragging) {
            handleMove(e.touches[0].clientX, e.touches[0].clientY);
        }
        return true;
    }

    function handleMove(clientX: number, clientY: number) {
        let x = clientX - width / 2 - pOffsetX;
        let y = clientY - height / 2 - pOffsetY;
        div.style.left = `${x}px`;
        div.style.top = `${y}px`;

        dropList = document.elementsFromPoint(clientX, clientY);

        // Finds the first droppable target, or undefined if none
        let dropElement: HTMLElement | undefined = dropList.find((e) => e.classList.contains("droppable")) as HTMLElement | undefined;

        if(dropElement) {
            let q = parseInt(dropElement.getAttribute("data-q") as string);
            let r = parseInt(dropElement.getAttribute("data-r") as string);

            selections = [new Hex(q,r)];
        }
        else selections = [];

        updateState();
    }

    function updateState() {
        effectStore.set(new BoardEffects(currentHex, selections, legal, attacks));
    }
</script>

<svelte:window
    on:pointermove={handlePointerMove}
    on:pointerup={handlePointerUp}
    on:touchend={handlePointerUp}
    on:touchmove={handleTouchMove}
/>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
    class="draggable"
    bind:this={div}
    on:pointerdown={handlePointerDown}
    on:contextmenu={function (e) {
        e.preventDefault();
    }}
>
    <slot></slot>
</div>

<style>
    .draggable {
        touch-action: none;
        cursor: grab;
        position: absolute;
    }
</style>
