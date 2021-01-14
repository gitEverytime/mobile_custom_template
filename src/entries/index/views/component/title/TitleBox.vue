<template>
    <div>
        <div v-for="title in title_data">
            <!--        主标题-->
            <comp-main-title v-if="title.type === 'main'"></comp-main-title>
            <!--        副标题-->
            <comp-sub-title v-if="title.type === 'sub'"></comp-sub-title>
        </div>
    </div>
</template>

<script>
import CompMainTitle from './MainTitle.vue'
import CompSubTitle from './SubTitle.vue'
export default {
    name: "TitleBox",
    components:{
        CompMainTitle,
        CompSubTitle
    },
    props:{
        title_data:{
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

<style scoped>

</style>