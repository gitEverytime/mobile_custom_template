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
            :placeholder="form.name ? '请输入'+form.name : ''"
            :rules="[{ required: form.required, message: '请填写'+form.name,tab:'2' }]"
            :disabled="form.disabled"
        >
            <template #button>
                <van-button size="mini" type="primary" :color="$store.state.common_back_color">发送验证码</van-button>
            </template>
        </van-field>
    </div>
</template>

<script>
const storage = window.localStorage;
export default{
    props:{
        form:Object
    },
    data(){
        return{

        }
    },
    created() {

    },
    mounted() {
        let vm = this;
        if(
            (vm.$route.params.name === 'food_vendors_register' && vm.form.key === 'auditorname')
            || (vm.$route.params.name === 'food_vendors_check' && (vm.form.key === 'username'))
            || (vm.$route.params.name === 'circulation_check' && (vm.form.key === 'username'))
            || (vm.$route.params.name === 'restautant_check' && (vm.form.key === 'username'))
        ){
            vm.form.value = JSON.parse(storage.getItem('baseInfo')).cuser.name;
            vm.form._value = JSON.parse(storage.getItem('baseInfo')).cuser.id;
        }
    },
    methods:{

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
    ::v-deep .van-field__label{
        border-right: #cecece solid 1px;
    }
    ::v-deep .van-field__button{
        display: flex;
        flex-direction: row;
        align-items: center;
    }
</style>
