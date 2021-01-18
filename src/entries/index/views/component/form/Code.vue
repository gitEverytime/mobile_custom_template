<template>
    <div class="text-box">
        <van-field v-model="form.name" class="text-left" label="" :readonly="form.readonly" />
        <van-field
            v-model="form.value"
            :rows="form.rows"
            :left-icon="form.required && !form.disabled ? 'star': ''"
            autosize
            :readonly="form.readonly"
            type="textarea"
            :name="String(form.tab)"
            label=""
            :maxlength="form.maxlength"
            :show-word-limit="form.show_word_limit"
            :placeholder="form.name ? '请输入'+form.name : ''"
            :rules="[{ required: form.required, message: '请填写'+form.name,tab:'2' }]"
            :disabled="form.disabled"
        >
            <template #button>
                <van-button
                    size="mini"
                    type="primary"
                    :disabled="readonly"
                    :color="$store.state.common_back_color"
                    @click="handleClickSendCode"
                >
                    <label>{{text ? text : '发送验证码'}}</label>
                </van-button>
            </template>
        </van-field>
        <div class="clear-form-btn" v-if="$route.params.status === '0'" @click="handleClickClear">
            <van-icon name="clear"/>
        </div>
    </div>
</template>

<script>
const storage = window.localStorage;
import page from "@/entries/index/js/page";
export default{
    props:{
        form:Object,
        index:{
            type:Number
        }
    },
    data(){
        let vm = this;
        return{
            text:'',
            readonly:false,
            form_data:page[`${vm.$route.params.type}`].form_data,
        }
    },
    created() {

    },
    mounted() {
        let vm = this;
    },
    methods:{
        /**
         * 删除
         */
        handleClickClear(){
            let vm = this;
            vm.form_data.splice(vm.index,1);
        },
        /**
         * 点击发送验证码
         */
        handleClickSendCode(){
            let vm = this;
            let s = 60;
            if(vm.readonly || vm.form.readonly) return;
            vm.readonly = true;
            let timer = setInterval(() => {
                s -- ;
                vm.text = `剩余(${s})s可发送`
                if(s === -1) {
                    clearInterval(timer);
                    vm.readonly = false;
                    vm.text = '';
                }
            },1000)
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "../../../../../assets/scss/minix";
    ::v-deep .van-icon-star{
        color: #ee0a24;
        font-size: 12px;
    }
    .text-box{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        border: #cecece solid 1px;
        border-radius: 5px;
        overflow: hidden;
        position: relative;
        .text-left{
            width: 10.2em;
            border-right: #cecece solid 1px;
        }
        .clear-form-btn{
            position: absolute;
            top: 10px;
            right: 0px;
            z-index: 100;
        }
    }
    ::v-deep .van-cell::after {
        position: absolute;
        box-sizing: border-box;
        content: ' ';
        pointer-events: none;
        right: 16px;
        bottom: 0;
        left: 16px;
        border-bottom: 1px solid #ebedf0;
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
    }
    ::v-deep .van-uploader{
        padding: 16px;
    }
    ::v-deep .van-cell{
        padding: 6px 10px;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    ::v-deep .van-field__button{
        display: flex;
        flex-direction: row;
        align-items: center;
    }
</style>
