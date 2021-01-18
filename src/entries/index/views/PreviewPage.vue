<template>
    <div class="">
        <!--        渲染banner-->
        <comp-banner-box :banner_data="page.banner_data"></comp-banner-box>
        <!--        渲染主、副标题-->
        <comp-title-box :title_data="page.title_data"></comp-title-box>
        <!--        渲染表单-->
        <comp-form-box :form_data="page.form_data" :submit_data="page.submit_data"></comp-form-box>
        <!--    头部-->
        <comp-title :titleData="titleData" @onClickLeft="handleClickLeft"></comp-title>
    </div>
</template>

<script>
import CompTitle from "@/entries/index/views/component/head/Head";
import CompFoot from "@/entries/index/views/component/foot/Foot";
import CompBannerBox from "@/entries/index/views/component/banner/BannerBox";
import CompTitleBox from "@/entries/index/views/component/title/TitleBox";
import CompFormBox from "@/entries/index/views/component/form/FormBox";
import page from "@/entries/index/js/page";

export default {
    name: "PreviewPage",
    components:{
        CompTitle,
        CompFoot,
        CompBannerBox,
        CompTitleBox,
        CompFormBox,
    },
    props:{

    },
    data(){
        let vm = this;
        return{
            page:page[`${vm.$route.params.type}`],
            titleData:{
                text:'预览页面',
                offsetTop:0
            },
            footData:{
                text:'确认选择'
            },
        }
    },
    mounted() {
    },
    created() {
    },
    methods:{
        /**
         * 返回
         */
        handleClickLeft(){
            let vm = this;
            vm.$router.go(-1)
        },
    }
}
</script>

<style scoped>

</style>