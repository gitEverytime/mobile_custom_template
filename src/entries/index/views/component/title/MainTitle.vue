<template>
    <div class="van-cell__value van-field__value"
         :style="{
             paddingTop:title.paddingtop + 'px'
         }"
    >
        <div class="van-field__body">
            <input
                type="text"
                name="username"
                placeholder="请您输入主标题"
                class="van-field__control"
                v-model="title.text"
                :style="{
                    color:title.color,
                    fontWeight: title.isbold ? 'bold' : '400',
                    fontSize:title.fontsize + 'px'
                }"
            >
        </div>
    </div>
</template>

<script>
export default {
    name: "MainTitle",
    components:{

    },
    props:{
        title:{
            type:Object
        }
    },
    data(){
        let vm = this;
        return{
            i:0
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

<style scoped lang="scss">
    .van-field__control{
        text-align: center;
    }
</style>