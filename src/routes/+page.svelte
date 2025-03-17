<script lang="ts">
    import { getContext, onMount } from "svelte";
    import type { WeekReport } from "../lib/weeksManaging/types";
    import Button from "../components/ui/Button.svelte";
    import Modal from "../components/modals/Modal.svelte";
    import NewWeekForm from "../components/forms/NewWeekForm.svelte";
    import WeekList from "../components/weeks/WeekList.svelte";
    import Container from "../components/ui/Container.svelte";
    import type DBManager from "$lib/database/manager/manager";
    import generateUUID from "$lib/utils/generateUUID";
    import generateWeekName from "$lib/utils/generateWeekName";

    let weeks: { [key: string]: WeekReport } = {};
    let isLoading = true;
    let isOpen = false;
    let db: DBManager<Task, WeekReport>;

    function onCloseModal() {
        isOpen = false;
    }

    function startWeekCreation() {
        isOpen = true;
    }

    async function createWeek(name: string) {
        if (name === "") name = generateWeekName();

        const week = {
            id: generateUUID(),
            name,
            createdAt: Date.now(),
        };
        await db.addWeek(week);
        weeks = await db.getWeeks();
        onCloseModal();
    }

    onMount(async () => {
        db = getContext("db");

        weeks = await db.getWeeks();
        isLoading = false;
    });
</script>

<Container>
    <h1>Отчеты по неделям</h1>
    <div class="actions">
        <Button text="Добавить неделю" on:click={startWeekCreation} />
    </div>
    <div class="content">
        {#if isLoading}
            <div class="loading">Загрузка...</div>
        {:else}
            <WeekList {weeks} />
        {/if}
    </div>
</Container>

<Modal title="Добавление недели" bind:isOpen closeHandler={onCloseModal}>
    <NewWeekForm successHandler={createWeek} cancelHandler={onCloseModal} />
</Modal>

<style>
    :global {
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }
    }
    h1 {
        text-align: center;
        margin-bottom: 20px;
        color: #333;
    }

    .actions {
        display: flex;
        justify-content: start;
        margin-bottom: 20px;
    }

    .content {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        justify-content: center;
    }

    .loading {
        text-align: center;
        font-size: 1.2em;
        color: #888;
    }

    @media (min-width: 768px) {
        .content {
            justify-content: flex-start;
        }
    }
</style>
