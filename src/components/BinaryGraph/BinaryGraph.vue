<script setup lang="ts">
import {onMounted, ref} from 'vue';
import createG6Graph from './graph';
import { ElMessage } from 'element-plus';
const dataString = ref('[1,3,2,5,null,null,9,6,null,7]');
let graph: { render: (data: any) => void};
function render() {
    try {
        let data = JSON.parse(dataString.value);
        console.log('data---->', data);
        graph && graph.render(data);
    } catch (error) {
        console.error(error);
        ElMessage({
            showClose: true,
            message: '请检查输入数据',
            type: 'error',
        })
    } 
}
onMounted(() => {
    graph = createG6Graph('container');
    render();
});
</script>

<template>
    <div class="container">
         array to binary tree (针对leetcode优化过的二叉树生成方式)
        <div>
            <el-input
                v-model="dataString"
                type="text"
                autocomplete="off"
            />
            <el-button type="primary" @click="render">Draw</el-button>
        </div> 
        <div id="container" ></div>
    </div>
</template>

<style scoped>
.container {
    width:100vw;
    height:100vh;
}
</style>
