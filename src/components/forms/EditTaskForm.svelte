<script lang="ts">
    import type { Task } from "$lib/weeksManaging/types";
    import { formatDateToDateTimeLocal } from "$lib/utils/formatDate";

    export let task: Task;
    let localTask: Task = { ...task };

    export let successHandler = (data: Task) => {};
    export let cancelHandler = () => {};

    function onTitleChanged(e: Event) {
        localTask.title = (e.target as HTMLInputElement).value;
    }

    function onIssueChanged(e: Event) {
        localTask.issue = (e.target as HTMLInputElement).value;
    }

    function onDateChanged(e: Event) {
        localTask.startTime = new Date((e.target as HTMLInputElement).value).getTime();
    }

    function onCompletionPercentageChanged(e: Event) {
        const parsed = parseInt((e.target as HTMLInputElement).value);
        const result = isNaN(parsed) ? 0 : Math.min(100, Math.max(0, parsed));
        (e.target as HTMLInputElement).value = result.toString();
        localTask.completionPercentage = result;

        if (result === 100) {
            localTask.isCompleted = true;
        }
    }

    function onIsCompletedChanged(e: Event) {
        localTask.isCompleted = (e.target as HTMLInputElement).checked;

        if (localTask.isCompleted) {
            localTask.completionPercentage = 100;
        }
    }

    function onNotesChanged(e: Event) {
        localTask.notes = (e.target as HTMLTextAreaElement).value;
    }

    function onSuccess() {
        if (!localTask.title) {
            alert("Введите название задачи");
            return;
        }

        successHandler({
            ...localTask,
        });
    }
</script>

<div class="form-container">
    <div class="form-group">
        <label for="title">Название задачи</label>
        <input type="text" id="title" placeholder="Название задачи" value={localTask.title} on:input={onTitleChanged} />
    </div>
    <div class="form-group">
        <label for="issue">Номер issue</label>
        <input type="text" id="issue" placeholder="Номер issue" value={localTask.issue} on:input={onIssueChanged} />
    </div>
    <div class="form-group">
        <label for="startTime">Дата и время начала</label>
        <input
            type="datetime-local"
            id="startTime"
            value={formatDateToDateTimeLocal(new Date(localTask.createdAt))}
            on:input={onDateChanged}
        />
    </div>
    <div class="form-group">
        <label for="completionPercentage">Процент выполнения</label>
        <input
            type="number"
            id="completionPercentage"
            min="0"
            max="100"
            step="1"
            value={localTask.completionPercentage}
            on:input={onCompletionPercentageChanged}
        />
    </div>
    <div class="form-group">
        <label for="isCompleted">Задача завершена?</label>
        <input type="checkbox" id="isCompleted" bind:checked={localTask.isCompleted} on:change={onIsCompletedChanged} />
    </div>
    <div class="form-group">
        <label for="notes">Заметки</label>
        <textarea id="notes" placeholder="Заметки" value={localTask.notes} on:input={onNotesChanged}></textarea>
    </div>
    <div class="form-actions">
        <slot name="action-buttons" handleSubmit={onSuccess} handleCancel={cancelHandler}></slot>
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

    .form-group input[type="text"],
    .form-group input[type="datetime-local"],
    .form-group input[type="number"],
    .form-group textarea {
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
    }

    .form-group input[type="checkbox"] {
        margin-right: 10px;
    }

    .form-group textarea {
        resize: vertical;
        height: 100px;
    }

    .form-actions {
        display: flex;
        justify-content: space-between;
    }
</style>
