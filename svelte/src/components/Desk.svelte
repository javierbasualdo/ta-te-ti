<script>
import Cell from './Cell.svelte';
import Modal from './Modal.svelte';

const cellTotal = 9
const deskStore = {
    X: [],
    O: []
}
const winOptions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
let index;
let piece = 'X';
let pieces = Array(9).fill('');
let clickedLength = 0;
let combinationWin = [];
let modal = false;

function cellClicked(i) {
    pieces[i] = piece;
    index = i;
    saveClicked();
}
function saveClicked() {
    clickedLength++;
    addToDeskStore();
    checkGameForWinner();
    nextPiece();
}
function nextPiece() {
    piece = piece === 'X' ? 'O' : 'X';
}
function addToDeskStore() {
    deskStore[piece].push(+index);
}
function checkGameForWinner() {
    const win = winOptions.filter(combination => 
                                combination.every(comb => 
                                    deskStore[piece].includes(comb)
                                )
                            );
    
    if (win.length) {
        return setWinner(win);
    } 
    
    checkEndGame();
}

function setWinner(win) {
    combinationWin = win[0];
    modal = true;
}
function checkEndGame() {
    if(clickedLength == cellTotal) {
        modal = true;
    }
}
</script>

<section id="desk">
    <div class="desk">
        {#each Array(cellTotal) as _, i}
        <Cell 
        datacell={i}
        piece={pieces[i]}
        win={combinationWin}
        on:clicked={() => cellClicked(i)}/>
        {/each}
        {#if modal}
        <Modal on:reload/>
        {/if}
    </div>
</section>

<style>
.desk {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 5px;
    height: 100%;
    position: relative;
}
</style>