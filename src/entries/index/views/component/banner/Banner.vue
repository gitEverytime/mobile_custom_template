<template>
    <!--    轮播-->
    <van-swipe
        :autoplay = banner_data.autoplay
        :duration = banner_data.duration
        :initial-swipe = banner_data.initialswipe
        :width = banner_data.width
        :height = banner_data.height
        :loop = banner_data.loop
        :show-indicators = banner_data.showindicators
        :vertical = banner_data.vertical
        :touchable = banner_data.touchable
        :indicator-color = banner_data.indicatorcolor
    >
        <van-swipe-item v-for="(image, index) in banner_data.pics" :key="index" >
            <img v-lazy="image" style="width: 100%; height: 100%"/>
        </van-swipe-item>
    </van-swipe>
</template>

<script>

export default {
    name: "Banner",
    components:{

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
    },
    beforeDestroy() {
    }
}
</script>

<style scoped>

</style>