<template>
    <div>
        <van-field
            class="text-box"
            v-model="form.value"
            :rows="form.rows"
            :left-icon="form.required && !form.disabled ? 'star': ''"
            autosize
            readonly
            type="textarea"
            :name="String(form.tab)"
            :label="form.name"
            :maxlength="form.maxlength"
            :show-word-limit="form.show_word_limit"
            :placeholder="!form.disabled ? '请输入'+form.name : ''"
            :rules="[{validator: validatorNumber, message: '邮箱格式不正确' }]"
            :disabled="form.disabled"
        />
    </div>
</template>

<script>
import regular from '../../../../../assets/js/regular.js'
export default{
    props:{
        form:Object,
    },
    data(){
        return{

        }
    },
    created() {

    },
    mounted() {

    },
    methods:{
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
        border: #cecece solid 1px;
        border-radius: 5px;
    }
    ::v-deep .van-cell{
        padding: 6px 10px;
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
    ::v-deep .van-field__label{
        border-right: #cecece solid 1px;
    }
    ::v-deep .van-cell{
        padding: 6px 10px;
    }
    ::v-deep .van-field__label{
        border-right: #cecece solid 1px;
    }
</style>
