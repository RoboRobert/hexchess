<script lang="ts">
    import Draggable from "$lib/Draggable.svelte";
    import { base } from "$app/paths";
</script>

<Draggable>
    <!-- svelte-ignore a11y-missing-attribute -->
    <img class="bishop piece" draggable=false src="/svgs/Chess_bdt45.svg" style="user-select: none;">
</Draggable>

<style>
    .bishop {
        width: 100px;
        height: 100px;
    }
</style>