<template>
    <van-button
        round
        block
        :style="{
            marginTop:'12px'
        }"
        type="info"
        readonly
        native-type="submit"
        :color="$store.state.common_back_color"
        @click="handleClickAdd"
    >
        <input
            type="text"
            name="username"
            class="van-field__control"
            v-model="submit_data.text"
        >
    </van-button>
</template>

<script>
export default {
    name: "AddForm",
    components:{

    },
    props:{
        submit_data:{
            type:Object
        }
    },
    data(){
        return{

        }
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
            // if(vm.$route.params['status'] === '0') return;
            // vm.$router.push(`/choose/comp/${vm.$route.params.type}/1/1`)
        }
    },
    beforeDestroy() {
    }
}
</script>

<style scoped lang="scss">
    .van-field__control{
        text-align: center;
        color: #FFFFFF;
    }
</style>