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

    let previousClass: string | undefined;
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

    function handlePointerUp(e: any) {
        div.style.cursor = "";
        div.style.zIndex = "";

        hexMoves.forEach((e) => e.classList.remove("possible"));
        hexCaptures.forEach((e) => e.classList.remove("attack"));

        if (!dragging) return;

        dragging = false;

        if (dropTarget != undefined) {
            dropTarget.classList.remove("selection");

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

    function handlePointerDown(e: any) {
        dragging = true;

        startX = div.style.left;
        startY = div.style.top;

        pOffsetX = div.parentElement?.getBoundingClientRect().left as number;
        pOffsetY = div.parentElement?.getBoundingClientRect().top as number;

        let legalMoves = currentPiece.getLegalMoves(false);

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

        hexMoves.forEach((e) => e.classList.add("possible"));
        hexCaptures.forEach((e) => e.classList.add("attack"));

        handleMove(e.clientX, e.clientY);

        div.style.cursor = "grabbing";
        div.style.zIndex = "100";
    }

    function handlePointerMove(e: any) {
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

        console.log(clientX, clientY)
        dropList = document.elementsFromPoint(clientX, clientY);

        if (dropTarget != undefined) {
            dropTarget.classList.remove("selection");
            if(previousClass)
                dropTarget.classList.add(previousClass);

            dropTarget = undefined;
        }

        // Finds the first droppable target, or undefined if none
        dropTarget = dropList.find((e) => e.classList.contains("droppable")) as
            | HTMLElement
            | undefined;

        if (dropTarget != undefined) {
            previousClass = getPrevious(dropTarget);
            if(previousClass)
                dropTarget.classList.remove(previousClass);
            dropTarget.classList.add("selection");
        }
    }
    
    // Gets the previous effect style that was removed.
    function getPrevious(element: HTMLElement): string | undefined {
        if(element.classList.contains("possible"))
            return "possible";
        if(element.classList.contains("attack"))
            return "attack";

        return undefined;
    }
</script>

<svelte:window
    on:pointermove={handlePointerMove}
    on:pointerup={handlePointerUp}
    on:touchend={handlePointerUp}
    on:touchmove={handleTouchMove}
/>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="draggable" bind:this={div} on:pointerdown={handlePointerDown}>
    <slot></slot>
</div>

<style>
    .draggable {
        touch-action: none;
        cursor: grab;
        position: absolute;
    }
</style>
