<template>
    <van-popup
        v-model="popupStatus.show"
        get-container="body"
        :close-on-click-overlay="false"
        :closeable="true"
        position="left"
        :style="{ height: '30%' }"
    >
ergere
    </van-popup>
</template>

<script>
export default {
    name: "TitlePopup",
    components:{

    },
    props:{
        popupData:{
            type:Object
        },
        popupStatus:{
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

    }
}
</script>

<style scoped>

</style>