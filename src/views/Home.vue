<script setup>
</script>

<template>
    <!-- home 页面 -->
    <div class="home">
        <main>
            <div class="title" >
                <el-card class="title_card" shadow="always" @click="$router.push('/')"> BK编程网 </el-card>
            </div>
            <div class="cards">
                <el-card class="card" shadow="hover" @click="$router.push('/signer')"> 数字签名制作 </el-card>
                <el-card class="card" style="color: rgb(134, 132, 132);" shadow="never"> 更多功能 </el-card>
            </div>
        </main>
    </div>
</template>

<script>
export default {
    name: 'Home'
}
</script>

<style scoped>
/* card 居中显示，高度400px 宽度自适应*/
.cards {
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 400px;
}

.card {
    width: 300px;
    height: 300px;
    /* 左右边距 */
    margin: 0 20px;
    /* 文字上下左右居中 */
    display: flex;
    align-items: center;
    justify-content: center;
    /* 背景颜色 */
    /* background-color: #eee; */
    /* 文字颜色 */
    color: #162e9c;
    /* 文字大小 */
    font-size: 20px;
    /* 文字不可选中 */
    user-select: none;
}

.title {
    display: flex;
    margin-bottom: 20px;
}

.title_card {
    width: 120px;
    height: 50px;
    /* 文字上下左右居中 */
    display: flex;
    align-items: center;
    justify-content: center;
    /* 背景颜色 */
    background-color: #4e56d1;
    /* 文字不可选中 */
    user-select: none;
    /* 文字颜色 */
    color: #fff;

}
</style>