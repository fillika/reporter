<script lang="ts">
    import saveTask from "$lib/database/methods/saveTask";
    import type { Task, WeekReport } from "$lib/weeksManaging/types";
    import Button from "../ui/Button.svelte";
    import CreateNewTask from "../forms/NewTaskForm.svelte";
    import Modal from "../modals/Modal.svelte";
    import TaskList from "../task/TaskList.svelte";
    import WeekTitle from "./WeekTitle.svelte";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";

    let isLoading = true;
    export let report: WeekReport;

    let isModalOpen = false;

    async function createNewTask(weekId: string, data: Task) {
        const isSuccess = await saveTask(weekId, data);
        if (isSuccess) {
            report.tasks[data.id] = data;
            closeModal();
        } else {
            alert("Не удалось сохранить задачу");
        }
    }

    function showNewTaskForm() {
        isModalOpen = true;
    }

    function closeModal() {
        isModalOpen = false;
    }

    function createReport() {
        alert("// todo implement");
    }

    onMount(async () => {
        // todo: get weeks from server
        // const report = await getWeek();
        isLoading = false;
        // weekName = reportData.name;
        // tasks = reportData.tasks;
    });
    // todo: show all weeks
</script>

<div class="container">
    <Button text="Назад" on:click={() => goto("/")} />
    <WeekTitle title={report.name} />
    {#if isLoading}
        <p class="loading">Данные загружаются...</p>
    {:else}
        <TaskList tasks={report.tasks} />
    {/if}

    <div class="actions">
        <Button text="Добавить задачу" on:click={showNewTaskForm} />
        <Button text="Создать отчет" on:click={createReport} />
    </div>

    <Modal isOpen={isModalOpen} title="Создать задачу" closeHandler={closeModal}>
        <CreateNewTask successHandler={(data) => createNewTask(report.id, data)} cancelHandler={closeModal} />
    </Modal>
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

    .actions {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
    }
</style>
