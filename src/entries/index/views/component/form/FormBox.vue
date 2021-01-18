<template>
    <van-form
        @submit="onSubmit"
        :style="{
            marginTop:$store.state.form_margin_top + 'px',
            padding:$store.state.form_padding_left_right + 'px'
        }"
    >
        <div v-for="(form,index) in form_data"  style="padding-bottom: 15px">
            <comp-comp-list :form="form" :index="index"></comp-comp-list>
        </div>
        <!--  Submit-->
        <comp-submit :submit_data="submit_data"></comp-submit>
        <!--  ADD-->
        <comp-add></comp-add>
    </van-form>
</template>

<script>
import CompAdd from './Add.vue'
import CompSubmit from './Submit.vue'
import CompCompList from "@/entries/index/views/component/form/CompList";

export default {
    name: "FormBox",
    components:{
        CompAdd,
        CompCompList,
        CompSubmit
    },
    props:{
        form_data:{
            type:Array
        },
        submit_data:{
            type:Object
        }
    },
    data(){
        let vm = this;
        return{

        }
    },
    created() {
    },
    mounted() {
    },
    methods:{
        /**
         * 提交
         */
        onSubmit(){
            let vm = this;

        }
    },
    beforeDestroy() {
    }
}
</script>

<style scoped>

</style>