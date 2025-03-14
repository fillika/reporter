<script lang="ts">
    import type { Task } from "$lib/weeksManaging/types";
    import Modal from "./Modal.svelte";

    let isOpen = false;

    function editTask(event: Event) {
        event.preventDefault();
        isOpen = true;
        console.debug("Edit task");
    }

    function handleKeydown(event: KeyboardEvent) {
        if (event.key === "Escape") {
            onCanceledEdit();
        }
    }

    function onSuccessEdit(data: Task) {
        console.debug("Task edited", data);
        isOpen = false;
    }

    function onCanceledEdit() {
        isOpen = false;
        console.debug("Task editing canceled");
    }

    function onDeleteTask() {
        isOpen = false;
        console.debug("Task deleted");
    }

    export let task: Task;
</script>

<div class="task">
    <div class="task-link" on:click={editTask} on:keydown={handleKeydown} role="button" tabindex="0">
        <div class="task-title">{task.title}</div>
        <div class="task-details">
            <span class="task-completion">{task.completionPercentage}%</span>
            <span class="task-status">{task.isCompleted ? "✅" : "❌"}</span>
        </div>
    </div>
</div>

<Modal isOpen={isOpen} title="Task details" closeHandler={onCanceledEdit}>
    <p>Task details will be here</p>
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
