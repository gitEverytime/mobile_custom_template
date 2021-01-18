<template>
    <div class="title-page-box">
        <!--    头部-->
        <comp-title :titleData="titleData"></comp-title>
        <!--    底部-->
        <comp-foot :titleData="footData">

        </comp-foot>
    </div>
</template>

<script>
import page from '../js/page.js'
import CompTitle from './component/head/Head.vue'
import CompFoot from './component/foot/Foot.vue'
export default {
    name: "TitlePage",
    components:{
        CompTitle,
        CompFoot,
    },
    props:{

    },
    data(){
        let vm = this;
        return{
            title_data:JSON.parse(JSON.stringify(page[`${vm.$route.params.type}`].title_data)),
            titleData:{
                text:'标题编辑页面',
                offsetTop:0
            },
            footData:{
                text:'保存'
            }
        }
    },
    created() {
    },
    mounted() {
    },
    methods:{

    }
}
</script>

<style scoped lang="scss">
    .title-page-box{
        overflow: hidden;
    }
</style>