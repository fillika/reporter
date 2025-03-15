<script lang="ts">
    import { onMount } from "svelte";
    import type { WeekReport } from "../lib/weeksManaging/types";
    import WeekCard from "../components/weeks/WeekCard.svelte";

    let weeks: { [key: string]: WeekReport } = {};
    let isLoading = true;

    onMount(async () => {
        isLoading = false;
    });
</script>

<div class="container">
    {#if isLoading}
        <div class="loading">Загрузка...</div>
    {:else if Object.keys(weeks).length === 0}
        <div class="loading">Нет данных</div>
    {:else}
        {#each Object.keys(weeks) as weekId}
            <WeekCard report={weeks[weekId]} />
        {/each}
    {/if}
</div>

<style>
    :global {
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }
    }

    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
    }

    .loading {
        text-align: center;
        font-size: 1.2em;
        color: #888;
    }
</style>
