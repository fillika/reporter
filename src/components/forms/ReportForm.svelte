<script lang="ts">
    import { onMount } from "svelte";
    import type { TaskCollection, WeekReport } from "$lib/weeksManaging/types";
    import { prepareWeekReport } from "$lib/utils/weekReport";
    import { copy } from "$lib/utils/clipboard";

    export let week: WeekReport;
    export let tasks: TaskCollection;
    export let onCancel = () => {};

    let textReport = "";

    function copyToClipboard() {
        alert("Отчет скопирован в буфер обмена");
        copy(textReport);
    }

    onMount(() => {
        textReport = prepareWeekReport(week, tasks);
    });
</script>

<div class="form-container">
    <div class="form-group">
        <textarea id="report" bind:value={textReport}></textarea>
    </div>
    <div class="form-actions">
        <slot name="action-buttons" handleSubmit={copyToClipboard} handleCancel={onCancel}></slot>
    </div>
</div>

<style>
    .form-container {
        background: #fff;
        margin: 0 auto;
    }

    .form-group {
        margin-bottom: 15px;
    }

    .form-group textarea {
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
        min-height: 150px;
        resize: vertical;
    }

    .form-actions {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
    }
</style>
