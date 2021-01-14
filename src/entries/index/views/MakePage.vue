<template>
    <div class="make-page-box">
        <!--    头部-->
        <comp-title :titleData="titleData">

        </comp-title>
        <!--        渲染banner-->
        <comp-banner-box :banner_data="page.banner_data"></comp-banner-box>
        <!--        渲染主、副标题-->
        <comp-title-box :title_data="page.title_data"></comp-title-box>
        <!--    底部-->
        <comp-foot :titleData="footData">

        </comp-foot>
    </div>
</template>

<script>
import page from '../js/page.js'
import CompBannerBox from './component/banner/BannerBox.vue'
import CompTitleBox from './component/title/TitleBox.vue'
import CompTitle from './component/Title.vue'
import CompFoot from './component/Foot.vue'
export default {
    name: "MakePage",
    components:{
        CompBannerBox,
        CompTitleBox,
        CompTitle,
        CompFoot
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