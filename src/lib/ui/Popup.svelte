<script lang="ts">
    export let text: string = "";

    let isOpen = true;

    function closePopup() {
        isOpen = false;
    }

    function handleClickOutside(event: Event) {
        // Close the popup if the click is outside the popup content
        if (event.target === event.currentTarget) {
            closePopup();
        }
    }
</script>

<style>
    .popup {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .popup-content {
        background: rgb(48, 48, 48);
        padding: 20px;
        border-radius: 5px;
        position: relative;
    }

    .close-button {
        position: absolute;
        top: 10px;
        right: 10px;
        cursor: pointer;
    }
</style>

{#if isOpen}
    <div class="popup" on:click={handleClickOutside}>
        <div class="popup-content">
            <span class="close-button" on:click={closePopup}>&times;</span>
            <p>{text}</p>
        </div>
    </div>
{/if}