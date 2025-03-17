<script lang="ts">
    import type { TaskCollection, WeekReport } from "$lib/weeksManaging/types";
    import { getContext, onMount } from "svelte";
    import Task from "./Task.svelte";
    import type DBManager from "$lib/database/manager/manager";

    export let tasks: TaskCollection = {};

    let db: DBManager<Task, WeekReport>;

    async function handleDeleteTask(taskId: string) {
        const areUSure = confirm("Вы уверены, что хотите удалить задачу?");
        if (!areUSure) {
            return false;
        }

        const isDeleted = await db.deleteTask(taskId);
        if (!isDeleted) {
            return false;
        }

        delete tasks[taskId];
        return true;
    }

    onMount(() => {
        db = getContext("db");
    });
</script>

{#if Object.keys(tasks).length === 0}
    <p class="no-tasks">Пока что нет задач</p>
{:else}
    <div class="task-list">
        {#each Object.entries(tasks) as [_, task]}
            <Task {handleDeleteTask} {task} />
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
