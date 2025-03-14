<script lang="ts">
    export let isOpen: boolean;
    export let title: string = "";
    export let closeHandler: () => void;

    function handleKeydown(event: KeyboardEvent) {
        if (event.key === "Escape") {
            closeHandler();
        }
    }
</script>

{#if isOpen}
    <div class="modal-overlay" role="dialog" aria-modal="true" on:keydown={handleKeydown} tabindex="0">
        <div class="modal" role="document">
            <div class="modal-header">
                <h2>{title}</h2>
                <button class="close-button" on:click={closeHandler} aria-label="Close modal">&times;</button>
            </div>
            <div class="modal-body">
                <slot></slot>
            </div>
        </div>
    </div>
{/if}

<style>
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .modal {
        background: white;
        padding: 20px;
        border-radius: 8px;
        max-width: 500px;
        width: 100%;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .close-button {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
    }
</style>
