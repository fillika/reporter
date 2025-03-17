<script lang="ts">
    import Container from "../../../components/ui/Container.svelte";
    import { getContext, onMount } from "svelte";
    import type { Task, TaskCollection, WeekReport } from "$lib/weeksManaging/types";
    import WeekCard from "../../../components/weeks/WeekCard.svelte";
    import type DBManager from "$lib/database/manager/manager";

    let { data }: { data: { weekId: string } } = $props();
    let { weekId } = data;

    let db: DBManager<Task, WeekReport>;

    let week: WeekReport | undefined = $state(undefined);
    let tasks: TaskCollection = $state({});

    onMount(async () => {
        db = getContext("db");
        week = await db.getWeek(weekId);
        tasks = await db.getTasks(weekId);
        if (!week) {
            console.error("Week not found");
        }
    });
</script>

<Container>
    {#if week === undefined}
        <p>Загрузка...</p>
    {:else}
        <WeekCard {week} bind:tasks />
    {/if}
</Container>
