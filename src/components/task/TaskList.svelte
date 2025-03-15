<script lang="ts">
    import deleteTask from "$lib/database/methods/deleteTask";
    import type { TaskCollection } from "$lib/weeksManaging/types";
    import Task from "./Task.svelte";

    export let weekId: string;
    export let tasks: TaskCollection = {};

    async function handleDeleteTask(weekId: string, taskId: string) {
        const areUSure = confirm("Вы уверены, что хотите удалить задачу?");
        if (!areUSure) {
            return false;
        }

        const isDeleted = await deleteTask(weekId, taskId);
        if (!isDeleted) {
            return false;
        }

        delete tasks[taskId];
        return true;
    }
</script>

{#if Object.keys(tasks).length === 0}
    <p class="no-tasks">Пока что нет задач</p>
{:else}
    <div class="task-list">
        {#each Object.entries(tasks) as [_, task]}
            <Task {handleDeleteTask} {weekId} {task} />
        {/each}
    </div>
{/if}

<style>
    .task-list {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .no-tasks {
        text-align: center;
        color: #888;
        font-size: 1.2em;
        margin-top: 20px;
    }
</style>
