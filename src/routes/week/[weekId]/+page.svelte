<script lang="ts">
    import Container from "../../../components/ui/Container.svelte";
    import getWeek from "$lib/database/methods/getWeek";
    import { onMount } from "svelte";
    import type { WeekReport } from "$lib/weeksManaging/types";
    import WeekCard from "../../../components/weeks/WeekCard.svelte";

    let { data }: { data: { weekId: string } } = $props();
    let { weekId } = data;
    
    let week: WeekReport | undefined = $state(undefined);

    onMount(async () => {
        week = await getWeek(weekId);
        if (!week) {
            console.error("Week not found");
            return;
        }
        console.debug(week);
    });
</script>

<Container>
    {#if week === undefined}
        <p>Загрузка...</p>
    {:else}
        <WeekCard report={week} />
    {/if}
</Container>
