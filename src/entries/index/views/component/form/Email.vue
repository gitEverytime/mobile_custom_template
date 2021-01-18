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
            :placeholder="!form.disabled ? '请输入'+form.name : ''"
            :rules="[{validator: validatorNumber, message: '邮箱格式不正确' }]"
            :disabled="form.disabled"
        />
        <div class="clear-form-btn" v-if="$route.params.status === '0'"  @click="handleClickClear">
            <van-icon name="clear"/>
        </div>
    </div>
</template>

<script>
import regular from '../../../../../assets/js/regular.js'
import page from "@/entries/index/js/page";
export default{
    props:{
        form:Object,
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

    },
    methods:{
        /**
         * 删除
         */
        handleClickClear(){
            let vm = this;
            vm.form_data.splice(vm.index,1);
        },
        validatorNumber(val) {
            return regular.email().test(val);
        },
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
    ::v-deep .van-field__label{
        border-right: #cecece solid 1px;
    }
    ::v-deep .van-uploader{
        padding: 16px;
    }
    ::v-deep .van-cell{
        padding: 6px 10px;
    }
</style>
