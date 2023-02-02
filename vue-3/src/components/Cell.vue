<script setup lang="ts">
import { watch, useAttrs, ref } from "vue";

const props = defineProps({
    piece: String,
    win: Array,
})

const attr = useAttrs();
const cellWinner = ref<boolean>(false);

watch(() => props.win, (value) => {
    if (value?.includes(attr['data-cell'])) {
        cellWinner.value = true
    }
})

</script>

<template>
    <div :class="['cell', cellWinner ? 'cell-winner' : '']">
        <span>{{ piece }}</span>
    </div>
</template>

<style scoped>
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