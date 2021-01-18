<template>
    <div>
        <!--   输入框-->
        <comp-text v-if="form.type === 'text'" :form="form" :index="index"></comp-text>
        <!--   电话号码-->
        <comp-phone v-if="form.type === 'phone'" :form="form" :index="index"></comp-phone>
        <!--   身份证号-->
        <comp-i-dcard v-if="form.type === 'idcard'" :form="form" :index="index"></comp-i-dcard>
        <!--   邮箱-->
        <comp-email v-if="form.type === 'email'" :form="form" :index="index"></comp-email>
        <!--   日期-->
        <comp-date v-if="form.type === 'date'" :form="form" :index="index"></comp-date>
        <!--   验证码-->
        <comp-code v-if="form.type === 'code'" :form="form" :index="index"></comp-code>
        <!--   下拉框-->
        <comp-select v-if="form.type === 'select'" :form="form" :index="index"></comp-select>
        <!--   单选框-->
        <comp-radio v-if="form.type === 'radio'" :form="form" :index="index"></comp-radio>
        <!--   复选框-->
        <comp-check-box v-if="form.type === 'checkbox'" :form="form" :index="index"></comp-check-box>
        <!--   上传组件-->
        <comp-upload v-if="form.type === 'upload'" :form="form" :index="index"></comp-upload>
    </div>
</template>

<script>
import CompAdd from "@/entries/index/views/component/form/Add";
import CompText from "@/entries/index/views/component/form/Text";
import CompPhone from "@/entries/index/views/component/form/Phone";
import CompIDcard from "@/entries/index/views/component/form/IDcard";
import CompEmail from "@/entries/index/views/component/form/Email";
import CompDate from "@/entries/index/views/component/form/Date";
import CompCode from "@/entries/index/views/component/form/Code";
import CompSelect from "@/entries/index/views/component/form/Select";
import CompRadio from "@/entries/index/views/component/form/Radio";
import CompCheckBox from "@/entries/index/views/component/form/CheckBox";
import CompUpload from "@/entries/index/views/component/form/Upload";

export default {
    name: "CompList",
    components:{
        CompAdd,
        CompText,
        CompPhone,
        CompIDcard,
        CompEmail,
        CompDate,
        CompCode,
        CompSelect,
        CompRadio,
        CompCheckBox,
        CompUpload
    },
    props:{
        form:{
            type:Object
        },
        index:{
            type:Number
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

    },
    beforeDestroy() {
    }
}
</script>

<style scoped>

</style>