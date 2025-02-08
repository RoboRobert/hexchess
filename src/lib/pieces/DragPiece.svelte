<script lang="ts">
    import { Hex } from "$lib/hexagons/HexLib";
    import type { BoardData } from "$lib/state/BoardData";
    import { BoardEffects } from "$lib/state/BoardEffects";
    import {
        boardData,
        defaultBoard,
        effectStore,
        selectedPiece,
    } from "$lib/state/stateStore";
    import { onMount } from "svelte";
    import { PieceData } from "./PieceData";

    export let currentPiece: PieceData;

    let pieceSelection: PieceData | undefined;
    selectedPiece.subscribe((piece) => {
        pieceSelection = piece;
    });

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

    let previousHex: Hex | undefined;

    let legal: Hex[] = [];
    let attacks: Hex[] = [];
    let selections: Hex[] = [];

    let previous: Hex[] = [];
    effectStore.subscribe((data) => (previous = data.previous));

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
        e.stopPropagation();
        div.style.cursor = "";
        div.style.zIndex = "";
        
        if (!dragging) {
            // If the user clicked anywhere besides a piece, then reset all selected piece states
            if (pieceSelection == currentPiece) {
                selectedPiece.set(undefined);

                previousHex = undefined;
                attacks = [];
                legal = [];

                updateState();
            }
            
            return;
        }

        dragging = false;

        // If there is a potential space for dropping
        if (selections.length > 0) {
            let moveSuccess = currentPiece.movePiece(selections[0]);
            // If the move was successful set the previous move and update the board state
            if (moveSuccess) {
                // If there's already a selected piece, set it to be undefined.
                if (pieceSelection) {
                    selectedPiece.set(undefined);
                }

                attacks = [];
                legal = [];

                previous = [previousHex as Hex, selections[0]];

                // If the move was successful, reset the previous hex
                previousHex = undefined;
                updatePos();
            }
            // If the move was a fail, determine if it was on top of the current piece's square.
            else if (!moveSuccess) {
                if (
                    pieceSelection &&
                    PieceData.equals(pieceSelection.hex, selections[0])
                ) {
                    selectedPiece.set(undefined);

                    previousHex = undefined;
                    attacks = [];
                    legal = [];
                } else if (!pieceSelection || pieceSelection != currentPiece)
                    selectedPiece.set(currentPiece);
            }
        }
        // If there was no possible space for dropping, set the selected piece anyway.
        else selectedPiece.set(currentPiece);

        // If piece snapback is enabled, snap the piece back to its starting position
        if (snapBack) {
            div.style.left = startX;
            div.style.top = startY;
        }

        selections = [];

        // Update the global effects state
        updateState();

        return true;
    }

    function pickupPiece(e: any) {
        dragging = true;

        div.style.zIndex = "100";
        div.style.cursor = "grabbing";

        startX = div.style.left;
        startY = div.style.top;

        pOffsetX = div.parentElement?.getBoundingClientRect().left as number;
        pOffsetY = div.parentElement?.getBoundingClientRect().top as number;

        let legalMoves = currentPiece.getLegalMoves(false);

        previousHex = currentPiece.hex;
        attacks = legalMoves
            .filter((e) => PieceData.pieceOn(e.attacking))
            .map((e) => e.to);
        legal = legalMoves
            .filter((e) => !PieceData.pieceOn(e.attacking))
            .map((e) => e.to);

        handleMove(e.clientX, e.clientY);
    }

    // Handles any clicks on hexagons
    function clickHex(e: any) {
        let clicked: Hex | undefined = hexFromPoint(e.clientX, e.clientY);
        if (!clicked || dragging || !pieceSelection) return;

        // If the current piece matches the selected piece, then try to move it to the selected square.
        if (pieceSelection == currentPiece) {
            let moveSuccess = currentPiece.movePiece(clicked);
            // If the move was successful set the previous move and update the board state
            if (moveSuccess) {
                // If there's already a selected piece, set it to be undefined.
                if (pieceSelection) {
                    selectedPiece.set(undefined);
                }

                attacks = [];
                legal = [];

                previous = [previousHex as Hex, clicked];

                // If the move was successful, reset the previous hex
                previousHex = undefined;
                updatePos();

                updateState();
            }
        }
    }

    function handlePointerMove(e: PointerEvent) {
        handleMove(e.clientX, e.clientY);
    }

    function handleTouchMove(e: TouchEvent) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
        return true;
    }

    function handleMove(clientX: number, clientY: number) {
        if (!dragging) return;

        let x = clientX - width / 2 - pOffsetX;
        let y = clientY - height / 2 - pOffsetY;
        div.style.left = `${x}px`;
        div.style.top = `${y}px`;

        let pointHex: Hex | undefined = hexFromPoint(clientX, clientY);
        if (pointHex) {
            selections[0] = pointHex;
        } else {
            selections = [];
        }

        updateState();
    }

    function hexFromPoint(x: number, y: number): Hex | undefined {
        dropList = document.elementsFromPoint(x, y);

        // Finds the first droppable target, or undefined if none
        let dropElement: HTMLElement | undefined = dropList.find((e) =>
            e.classList.contains("droppable"),
        ) as HTMLElement | undefined;

        if (!dropElement) {
            return undefined;
        }

        let q = parseInt(dropElement.getAttribute("data-q") as string);
        let r = parseInt(dropElement.getAttribute("data-r") as string);

        return new Hex(q, r);
    }

    function updateState() {
        effectStore.set(
            new BoardEffects(previousHex, selections, legal, attacks, previous),
        );
    }
</script>

<svelte:window
    on:pointermove={handlePointerMove}
    on:pointerup={handlePointerUp}
    on:touchmove={handleTouchMove}
    on:pointerdown={clickHex}
/>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
    class="draggable"
    bind:this={div}
    on:pointerdown={pickupPiece}
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
        position:absolute;
    }
</style>
