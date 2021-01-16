<template>
    <van-form
        @submit="onSubmit"
        :style="{
            marginTop:$store.state.form_margin_top + 'px',
            padding:$store.state.form_padding_left_right + 'px'
        }"
    >
        <div v-for="form in form_data"  style="padding-bottom: 15px">
            <comp-comp-list :form="form"></comp-comp-list>
        </div>
        <!--  ADD-->
        <comp-add></comp-add>
    </van-form>
</template>

<script>
import CompAdd from './Add.vue'
import CompCompList from "@/entries/index/views/component/form/CompList";

export default {
    name: "FormBox",
    components:{
        CompAdd,
        CompCompList
    },
    props:{
        form_data:{
            type:Array
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