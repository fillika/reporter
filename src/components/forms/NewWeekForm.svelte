<script lang="ts">
    import Button from "../ui/Button.svelte";

    export let successHandler = (name: string) => {};
    export let cancelHandler = () => {};

    let name = "";

    function onNameChanged(e: Event) {
        name = (e.target as HTMLInputElement).value;
    }

    function onSuccess() {
        if (!name) {
            confirm("Название недели будет создано автоматически. Продолжить?") && successHandler("");
            return;
        }

        successHandler(name);
    }
</script>

<div class="form-container">
    <div class="form-group">
        <label for="name">Название недели</label>
        <input type="text" id="name" placeholder="Название недели" on:input={onNameChanged} />
    </div>
    <div class="form-actions">
        <Button text="Создать" on:click={onSuccess} />
        <Button text="Отмена" on:click={cancelHandler} />
    </div>
</div>

<style>
    .form-container {
        background: #fff;
        padding: 5px;
        border-radius: 8px;
        max-width: 500px;
        margin: 0 auto;
    }

    .form-group {
        margin-bottom: 15px;
    }

    .form-group label {
        display: block;
        margin-bottom: 5px;
        font-weight: bold;
    }

    .form-group input[type="text"] {
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
    }

    .form-actions {
        display: flex;
        justify-content: space-between;
    }
</style>
