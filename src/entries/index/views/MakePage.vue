<template>
    <div class="make-page-box" id="make-page-box">
        <!--    头部-->
        <comp-title :titleData="titleData" @onClickLeft="handleClickLeft">

        </comp-title>
        <!--        渲染banner-->
        <comp-banner-box :banner_data="page.banner_data"></comp-banner-box>
        <!--        渲染主、副标题-->
        <comp-title-box :title_data="page.title_data"></comp-title-box>
        <!--        渲染表单-->
        <comp-form-box :form_data="page.form_data"></comp-form-box>
        <!--    底部-->
        <comp-foot :titleData="footData">

        </comp-foot>
    </div>
</template>

<script>
import page from '../js/page.js'
import CompBannerBox from './component/banner/BannerBox.vue'
import CompTitleBox from './component/title/TitleBox.vue'
import CompFormBox from './component/form/FormBox.vue'
import CompTitle from './component/Title.vue'
import CompFoot from './component/Foot.vue'
export default {
    name: "MakePage",
    components:{
        CompBannerBox,
        CompTitleBox,
        CompFormBox,
        CompTitle,
        CompFoot,
    },
    data(){
        let vm = this;
        return{
            page:page[`${vm.$route.params.type}`],
            titleData:{
                text:'制作界面',
                offsetTop:0
            },
            footData:{
                text:'预览'
            }
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
    },
    beforeDestroy() {
    }
}
</script>

<style scoped>
    .make-page-box{
        overflow: hidden;
    }
</style>