<script lang="ts">
    import type { WeekReport } from "$lib/weeksManaging/types";

    export let weeks: { [key: string]: WeekReport } = {};
</script>

<div class="week-list">
    {#if Object.keys(weeks).length === 0}
        <div class="loading">Пока что нет ни одной недели</div>
    {:else}
        {#each Object.keys(weeks) as weekId}
            <div>
                <a href={`/week/${weekId}`} class="week-link">
                    <div>{weeks[weekId].name}</div>
                </a>
            </div>
        {/each}
    {/if}
</div>

<style>
    .week-list {
        width: 100%;
    }

    .loading {
        text-align: center;
        font-size: 1.2em;
        color: #888;
    }

    .week-link {
        display: block;
        text-decoration: none;
        color: inherit;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        margin-bottom: 10px;
        transition: background-color 0.3s;
    }

    .week-link:hover {
        background-color: #f0f0f0;
    }

    .week-link:focus {
        outline: 2px solid blue;
    }
</style>
