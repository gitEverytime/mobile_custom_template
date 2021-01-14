<template>
    <div class="swipe-box"
         :style="{
             height:banner_data.height + 'px',
             color:'#ffffff',
             marginTop:'46px',
             backgroundColor:$store.state.common_back_color
         }"
         @click="handleClick"
    >
        <comp-banner v-if="banner_data['type'] === 'banner1'" :banner_data="banner_data">
        </comp-banner>
        Banner(点击编辑)
    </div>
</template>

<script>
import CompBanner from './Banner.vue'
export default {
    name: "BannerBox",
    components:{
        CompBanner
    },
    props:{
        banner_data:{
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
         * 点击编辑轮播
         */
        handleClick(){
            let vm = this;
            vm.$router.push(`/make/banner/${vm.$route.params.type}`)
        }
    },
    beforeDestroy() {
    }
}
</script>

<style scoped lang="scss">
    .swipe-box{
        position: relative;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
</style>