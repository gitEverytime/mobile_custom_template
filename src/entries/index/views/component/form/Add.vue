<template>
    <van-button
        icon="plus"
        round
        plain
        block
        :style="{
            marginTop:'12px'
        }"
        type="info"
        native-type="submit"
        :color="$store.state.common_back_color"
        @click="handleClickAdd"
    ></van-button>
</template>

<script>
export default {
    name: "AddForm",
    components:{

    },
    data(){
        return{}
    },
    created() {
    },
    mounted() {
    },
    methods:{
        /**
         * 点击跳转选择表单列表页面
         */
        handleClickAdd(){
            let vm = this;
            vm.$router.push(`/choose/comp/${vm.$route.params.type}/1`)
        }
    },
    beforeDestroy() {
    }
}
</script>

<style scoped>

</style>