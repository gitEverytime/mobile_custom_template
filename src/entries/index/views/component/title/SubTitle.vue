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
                :readonly="$route.params['status'] !== '2' ? 'readonly' : ''"
                :style="{
                    color:title.color,
                    fontWeight: title.isbold ? 'bold' : '400'
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
    input::-webkit-input-placeholder {
        /* WebKit browsers */
        color: #999999;
    }
    input:-moz-placeholder {
        /* Mozilla Firefox 4 to 18 */
        color: #999999;
    }
    input::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        color: #999999;
    }
    input:-ms-input-placeholder {
        /* Internet Explorer 10+ */
        color: #999999;
    }
</style>