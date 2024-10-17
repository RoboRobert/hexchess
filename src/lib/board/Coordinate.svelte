<script lang="ts">
    import { Hex, Point } from "$lib/hexagons/HexLib";
    import type { BoardData } from "$lib/state/BoardData";
    import { boardData, defaultBoard } from "$lib/state/stateStore";

    export let q: number;
    export let r: number;
    // export let color: string;
    export let text: string;

    let boardMeta: BoardData = defaultBoard;
    boardData.subscribe((data) => {
        boardMeta = data;
    });

    const hex: Hex = new Hex(q, r);
    const originOffset: Point = boardMeta.layout.hexToPixel(hex);
    // Distance to the origin. Used for normalizing
    const distance = Math.sqrt(
        originOffset.x * originOffset.x + originOffset.y * originOffset.y,
    );

    const xNormalized = originOffset.x / distance;
    const yNormalized = originOffset.y / distance;
    const size = boardMeta.layout.size.x;
</script>

<g style="font: {size/2}px monospace" transform="translate({originOffset.x}, {originOffset.y})">
    <text
        x={(-size / 3.3) * xNormalized - (size / 4)}
        y={-(size / 3.3) * yNormalized}
        stroke-width={size/50}
        class="coordinate">
        
        {text}
    </text>
</g>

<style>
</style>
