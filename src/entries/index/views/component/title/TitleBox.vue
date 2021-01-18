<template>
    <div>
        <div
            class="title-box"
            v-for="(title,index) in title_data"
            @click="handleClickTitle(title,index)"
        >
            <!--        主标题-->
            <comp-main-title v-if="title.type === 'main'" :title="title"></comp-main-title>
            <!--        副标题-->
            <comp-sub-title v-if="title.type === 'sub'" :title="title"></comp-sub-title>
        </div>
        <!--        编辑弹窗-->
        <comp-title-popup
            :popupData="popupData"
            :popupStatus="popupStatus"
        >

        </comp-title-popup>
    </div>
</template>

<script>
import CompMainTitle from './MainTitle.vue'
import CompSubTitle from './SubTitle.vue'
import CompTitlePopup from './TitlePopup.vue'
export default {
    name: "TitleBox",
    components:{
        CompMainTitle,
        CompSubTitle,
        CompTitlePopup
    },
    props:{
        title_data:{
            type:Array
        }
    },
    data(){
        let vm = this;
        return{
            popupData:{},
            popupStatus:{
                show:false
            }
        }
    },
    created() {
    },
    mounted() {
    },
    methods:{
        /**
         * 双击进入编辑
         */
        handleClickTitle(title,index){
            // let vm = this;
            // vm.i ++;
            // setTimeout( ()=> {
            //     vm.i = 0;
            // }, 500);
            // if (vm.i > 1) {
            //     vm.popupData = title;
            //     vm.popupStatus.show = true;
            //     vm.i = 0;
            // }
        }
    },
    beforeDestroy() {
    }
}
</script>

<style scoped>

</style>