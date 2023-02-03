<script>
import { createEventDispatcher } from 'svelte';

const dispatch = createEventDispatcher();

function send(){
    dispatch('reload');
}

</script>

<div class="overlay fa-solid fa-repeat" on:click={send}>
</div>

<style>
.overlay {
    background-color: rgba(0,0,0,.8);
    position: absolute;
    width: 100%;
    height: 90vh;
    display: grid;
    place-content: center;
    font-size: 17em;
    color: #a93232;
    cursor: pointer;
    transition: .5s;
}
.overlay:hover {
    background-color: rgba(0,0,0,.9);
    font-size: 18em;
}
</style>