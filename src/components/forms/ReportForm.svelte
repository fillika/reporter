<script lang="ts">
    import { onMount } from "svelte";
    import type { TaskCollection, WeekReport } from "$lib/weeksManaging/types";
    import { prepareWeekReport } from "$lib/utils/weekReport";

    export let week: WeekReport;
    export let tasks: TaskCollection;
    export let onSuccess = () => {};
    export let onCancel = () => {};

    let textReport = "";

    onMount(() => {
        textReport = prepareWeekReport(week, tasks);
    });
</script>

<div class="form-container">
    <div class="form-group">
        <textarea id="report" bind:value={textReport}></textarea>
    </div>
    <div class="form-actions">
        <slot name="action-buttons" handleSubmit={onSuccess} handleCancel={onCancel}></slot>
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
