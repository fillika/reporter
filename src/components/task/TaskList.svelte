<script lang="ts">
    import type { TaskCollection } from "$lib/weeksManaging/types";
    import Task from "./Task.svelte";

    export let tasks: TaskCollection = {};
</script>

{#if Object.keys(tasks).length === 0}
    <p class="no-tasks">Пока что нет задач</p>
{:else}
    <div class="task-list">
        {#each Object.entries(tasks) as [_, task]}
            <Task {task} />
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
