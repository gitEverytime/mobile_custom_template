<template>
    <div>
        <!--    头部-->
        <comp-title :titleData="titleData" @onClickLeft="handleClickLeft"></comp-title>
        <!--    列表-->
        <comp-list :result="result"></comp-list>
        <!--    底部-->
        <comp-foot :titleData="footData" @onClickFoot="handleClickFoot">

        </comp-foot>
    </div>
</template>

<script>
import CompTitle from './component/head/Head.vue'
import CompFoot from './component/foot/Foot.vue'
import CompList from './component/list/List.vue'
import page from "@/entries/index/js/page";
export default {
    name: "ChooseComp",
    components:{
        CompTitle,
        CompFoot,
        CompList
    },
    data(){
        let vm = this;
        return{
            result:{
                value:[]
            },
            page:page[`${vm.$route.params.type}`],
            titleData:{
                text:'选择组件',
                offsetTop:0
            },
            footData:{
                text:'确认选择'
            },
        }
    },
    created() {
    },
    mounted() {
    },
    methods:{
        /**
         * 返回
         */
        handleClickLeft(){
            let vm = this;
            vm.$router.go(-1)
        },
        /**
         * 点击底部确认
         */
        handleClickFoot(){
            let vm = this;
            if(!vm.result.value.length) {
                vm.$toast.fail('请选择对应的组件！');
                return
            }
            /**
             * add form of array
             */
            vm.result.value.forEach((res) => {
                let obj = JSON.parse(res);
                obj['disabled'] = false;
                obj['readonly'] = false;
                vm.page.form_data.push(obj);
            })
            /**
             * back
             */
            vm.$router.go(-1)
        }
    },
    beforeDestroy() {
    }
}
</script>

<style scoped>

</style>