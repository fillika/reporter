<script lang="ts">
    import type { Task, TaskCollection, WeekReport } from "$lib/weeksManaging/types";
    import Button from "../ui/Button.svelte";
    import Modal from "../modals/Modal.svelte";
    import TaskList from "../task/TaskList.svelte";
    import WeekTitle from "./WeekTitle.svelte";
    import { getContext, onMount } from "svelte";
    import NewTaskForm from "../forms/EditTaskForm.svelte";
    import { goto } from "$app/navigation";
    import generateUUID from "$lib/utils/generateUUID";
    import ReportForm from "../forms/ReportForm.svelte";
    import type DBManager from "$lib/database/manager/manager";

    let isLoading = true;
    export let week: WeekReport;
    export let tasks: TaskCollection;

    let isModalOpen = false;
    let isReportModalOpen = false;
    let db: DBManager<Task, WeekReport>;
    let localTasks: TaskCollection = {};

    async function createNewTask(data: Task) {
        const isSuccess = await db.addTask(data);
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

    async function createReport() {
        localTasks = await db.getTasks(week.id);
        isReportModalOpen = true;
    }

    function closeReportModal() {
        isReportModalOpen = false;
    }

    function createTask(): Task {
        return {
            id: generateUUID(),
            weekId: week.id,
            title: "",
            notes: "",
            createdAt: Date.now(),
            startTime: Date.now(),
            completionPercentage: 0,
            isCompleted: false,
        };
    }

    onMount(async () => {
        db = getContext("db");
        isLoading = false;
    });
</script>

<div class="container">
    <Button text="Назад" on:click={() => goto("/")} />
    <WeekTitle title={week.name} />
    {#if isLoading}
        <p class="loading">Данные загружаются...</p>
    {:else}
        <TaskList {tasks} />
    {/if}

    <div class="actions">
        <Button text="Добавить задачу" on:click={showNewTaskForm} />
        <Button text="Создать отчет" on:click={createReport} />
    </div>

    <Modal isOpen={isModalOpen} title="Создать задачу" closeHandler={closeModal}>
        <NewTaskForm task={createTask()} successHandler={(data) => createNewTask(data)} cancelHandler={closeModal}>
            <div slot="action-buttons" let:handleSubmit let:handleCancel>
                <Button text="Создать" on:click={handleSubmit} />
                <Button text="Отмена" on:click={handleCancel} />
            </div>
        </NewTaskForm>
    </Modal>

    <Modal isOpen={isReportModalOpen} title="Отчет" closeHandler={closeReportModal}>
        <ReportForm {week} tasks={localTasks} onSuccess={closeReportModal} onCancel={closeReportModal}>
            <div slot="action-buttons" let:handleSubmit let:handleCancel>
                <Button text="Скопировать" on:click={handleSubmit} />
                <Button text="Отмена" on:click={handleCancel} />
            </div>
        </ReportForm>
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
