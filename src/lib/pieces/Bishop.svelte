<script lang="ts">
    import Draggable from "$lib/Draggable.svelte";
</script>

<Draggable>
    <!-- svelte-ignore a11y-missing-attribute -->
    <img class="bishop piece" draggable=false src="/svgs/Chess_bdt45.svg" style="user-select: none;">
</Draggable>

<style>
    .bishop {
        width: 50px;
        height: 50px;
        left: 0;
        top: 0;
    }
</style>