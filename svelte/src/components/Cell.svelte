<script>
import { createEventDispatcher } from 'svelte';
export let datacell;
export let piece;
export let win;

const dispatch = createEventDispatcher();

function send(){
    dispatch('clicked');
}

$: cellWinner = win.includes(datacell) ? 'cell-winner' : '';

</script>

<div class={"cell " + cellWinner} on:click|once={send}>
    <span>{piece}</span>
</div>

<style>
.cell {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: black;
    cursor: pointer;
}
.cell:hover {
    background-color: rgb(55, 51, 51);
}
.cell span {
    font-size: 7em;
}
.cell span::after {
    content: ' ';
    display: inline-block;
}
.cell-winner {
    background-color: gold;
}
</style>