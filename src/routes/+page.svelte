<script lang="ts">
    import getWeek from "$lib/database/getWeek";
    import saveTask from "$lib/database/saveTask";
    import type { Task, TaskCollection } from "$lib/weeksManaging/types";
    import Button from "../components/Button.svelte";
    import CreateNewTask from "../components/forms/CreateNewTask.svelte";
    import Modal from "../components/Modal.svelte";
    import TaskList from "../components/TaskList.svelte";
    import WeekTitle from "../components/WeekTitle.svelte";
    import { startNewWeek } from "../lib/weeksManaging/startNewWeek";
    import { onMount } from "svelte";

    let isLoading = true;
    let tasks: TaskCollection = {};
    let weekName = "";
    let isModalOpen = false;

    async function start() {
        const result = confirm("Начать новую неделю? Это действие удалит все данные текущей недели.");
        if (result) {
            await startNewWeek();
            const [_, reportData] = await getWeek();
            isLoading = false;
            weekName = reportData.name;
            tasks = reportData.tasks;
        }
    }

    async function createNewTask(data: Task) {
        const isSuccess = await saveTask(data);
        if (isSuccess) {
            tasks[data.id] = data;
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
        const [_, reportData] = await getWeek();
        isLoading = false;
        weekName = reportData.name;
        tasks = reportData.tasks;
    });
</script>

<div class="container">
    <WeekTitle title={weekName} />
    {#if isLoading}
        <p class="loading">Данные загружаются...</p>
    {:else}
        <TaskList {tasks} />
    {/if}

    <div class="actions">
        <Button text="Добавить задачу" on:click={showNewTaskForm} />
        <Button text="Начать новую неделю" on:click={start} />
        <Button text="Создать отчет" on:click={createReport} />
    </div>

    <Modal isOpen={isModalOpen} title="Создать задачу" closeHandler={closeModal}>
        <CreateNewTask successHandler={createNewTask} cancelHandler={closeModal} />
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
