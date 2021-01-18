<template>
    <div
        class="bg-box"
        :style="{
            padding:'25px 12px 0'
        }"
    >
        <van-uploader>
            <span
                :style="{
                color:$store.state.common_back_color,
            }"
            >
                点此处设置背景图
            </span>
        </van-uploader>
    </div>
</template>

<script>
export default {
    name: "BgSet",
    components:{

    },
    props:{
        background_data:Object
    },
    data(){
        return{

        }
    },
    mounted() {
    },
    created() {
    },
    methods:{

    }
}
</script>

<style scoped lang="scss">
    .bg-box{
        span{
            font-size: 12px;
        }
    }
</style>