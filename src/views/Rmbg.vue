<script setup>
import RemoveBG from '@/components/RemoveBG.vue'
</script>

<template>
    <!-- 登陆成功，用户信息展示 -->
    <RemoveBG />
</template>

<script>

export default {
    name: 'Rmbg',
    data() {
        return {
            username: ''
        }
    },
    methods: {


    },
}

</script>

<style scoped>
.use-flexbox {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 800px;
    /* border:1px solid #000;
    background:#099; */
}

/* .use-flexbox div{
    width:100px;
    height:50px;
    background:#099;
} */
</style>