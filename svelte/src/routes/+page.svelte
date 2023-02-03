<script>
import Desk from '../components/Desk.svelte';

let unique = {};

function changeKey() {
    unique = {};
}
</script>

<main class="container">
    {#key unique}
    <Desk on:reload={changeKey}/>
    {/key}
</main>

<style>
.container {
    display: grid;
    height: 90vh;
    aspect-ratio: 1;
}
</style>
