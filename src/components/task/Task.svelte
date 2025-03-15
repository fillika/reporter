<script lang="ts">
    import type { Task } from "$lib/weeksManaging/types";
    import Modal from "../modals/Modal.svelte";
    import EditTaskForm from "../forms/EditTaskForm.svelte";
    import Button from "../ui/Button.svelte";
    import saveTask from "$lib/database/methods/saveTask";

    let isOpen = $state(false);
    const { handleDeleteTask, weekId, task } = $props();
    
    function editTask(event: Event) {
        event.preventDefault();
        isOpen = true;
    }

    function handleKeydown(event: KeyboardEvent) {
        if (event.key === "Escape") {
            onCanceledEdit();
        }
    }

    async function onSuccessEdit(data: Task) {
        await saveTask(weekId, data);
        isOpen = false;
    }

    function onCanceledEdit() {
        isOpen = false;
        console.debug("Task editing canceled");
    }

    async function onDelete() {
        const isDeleted = await handleDeleteTask(weekId, task.id);
        if (!isDeleted) {
            alert("Не удалось удалить задачу");
            return;
        }
        isOpen = false;
    }

</script>

<div class="task" onclick={editTask} onkeydown={handleKeydown} role="button" tabindex="0">
    <div class="task-link">
        <div class="task-title">{task.title}</div>
        <div class="task-details">
            <span class="task-completion">{task.completionPercentage}%</span>
            <span class="task-status">{task.isCompleted ? "✅" : ""}</span>
        </div>
    </div>
</div>

<Modal {isOpen} title="Редактировать задачу" closeHandler={onCanceledEdit}>
    <EditTaskForm {task} successHandler={onSuccessEdit} cancelHandler={onCanceledEdit}>
        <div slot="action-buttons" let:handleSubmit let:handleCancel>
            <Button text="Принять" on:click={handleSubmit} />
            <Button text="Отмена" on:click={handleCancel} />
            <Button text="Удалить" on:click={onDelete} />
        </div>
    </EditTaskForm>
</Modal>

<style>
    .task {
        padding: 15px;
        border-radius: 8px;
        background: #fff;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        transition:
            transform 0.2s,
            box-shadow 0.2s;
    }

    .task:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    }

    .task-link {
        text-decoration: none;
        color: inherit;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
    }

    .task-title {
        font-size: 1.2em;
        font-weight: bold;
    }

    .task-details {
        display: flex;
        align-items: center;
    }

    .task-completion {
        margin-right: 10px;
        font-size: 1em;
        color: #888;
    }

    .task-status {
        font-size: 1.2em;
    }
</style>
