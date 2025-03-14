<script lang="ts">
    import Button from "../components/Button.svelte";
    import { startNewWeek } from "../lib/weeksManaging/startNewWeek"; 
    import {clearDatabase} from "../lib/database/clearDatabase";

    function handleClick() {
        const result = confirm("Начать новую неделю? Это действие удалит все данные текущей недели.");
        if (result) {
            console.log("Начинаем новую неделю");
            clearDatabase();
            startNewWeek("Name");
        }
    }
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
<Button text="Click me" on:click={handleClick} />
