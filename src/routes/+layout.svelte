<script lang="ts">
    import { setContext } from "svelte";
    import IndexedDB from "$lib/database/storages/indexedDB";
    import DBManager from "$lib/database/manager/manager";
    import type { Task, WeekReport } from "$lib/weeksManaging/types";

    let isDatabaseReady = false;
    let db: DBManager<Task, WeekReport>;

    async function initializeDatabase() {
        if (typeof window !== "undefined") {
            const indexedDB = new IndexedDB<Task, WeekReport>();
            db = new DBManager(indexedDB);
            await db.init();
            isDatabaseReady = true;
        }
    }

    initializeDatabase();

    $: if (isDatabaseReady) {
        setContext("db", db);
    }
</script>

{#if isDatabaseReady}
    <slot />
{:else}
    <p>Загрузка...</p>
{/if}
