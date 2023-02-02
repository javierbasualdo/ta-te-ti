<script setup lang="ts">
import { ref, reactive, defineEmits } from 'vue'
import Cell from './Cell.vue'
import Modal from './Modal.vue'

const emits = defineEmits<{ (e: 'reload'): void }>()

const cellTotal: number = 9

interface IdeskStore {
    X: Array<string>;
    O: Array<string>;
}
const deskStore: IdeskStore = {
    X: [],
    O: []
}

const winOptions: number[][] = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
let index:number;
let piece = ref<string>('X');
let pieces = reactive(Array(9));
let clickedLength = ref<number>(0);
let combinationWin = ref<Array<number>>([]);
let modal = ref<boolean>(false)

function cellClicked(i:number): void {
    pieces[i] = piece.value;
    index = i;
    saveClicked();
}
function saveClicked(): void {
    clickedLength.value++;
    nextPiece();
    addToDeskStore();
    checkGameForWinner();
}
function nextPiece(): void {
    piece.value = piece.value === 'X' ? 'O' : 'X';
}
function addToDeskStore(): void {
    deskStore[piece.value].push(+index);
}
function checkGameForWinner(): void {
    const win: number[][] = winOptions.filter(combination => 
                                combination.every(comb => 
                                    deskStore[piece.value].includes(comb)
                                )
                            );
    
    if (win.length) {
        return setWinner(win);
    } 
    
    checkEndGame();
}
function setWinner(win): void {
    combinationWin.value = win[0];
    modal.value = true
}
function checkEndGame(): void {
    if(clickedLength.value == 9) {
        modal.value = true
    }
}
function reloadGame(): void {
    emits('reload');
}

</script>

<template>
    <section id="desk">
        <div class="desk">
            <Cell v-for="(c,i) in cellTotal" 
            :key="i"
            :data-cell="i"
            :piece="pieces[i]"
            :win="combinationWin"
            @click.once="cellClicked(i)"
            />
            <Modal
            v-if="modal" 
            @click="reloadGame"/>
        </div>
    </section>
</template>

<style scoped>
.desk {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 5px;
    height: 100%;
    position: relative;
}
</style>