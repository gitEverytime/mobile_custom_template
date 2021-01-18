<template>
    <div class="text-box">
        <van-field v-model="form.name" class="text-left" label="" :readonly="form.readonly" />
        <van-field
            v-model="form.value"
            :rows="form.rows"
            :left-icon="form.required && !form.disabled ? 'star': ''"
            autosize
            size=""
            :readonly="form.readonly"
            :border="true"
            type="textarea"
            :name="String(form.tab)"
            label=""
            :maxlength="form.maxlength"
            :show-word-limit="form.show_word_limit"
            :placeholder="form.name ? '请输入'+form.name : ''"
            :rules="[{ required: form.required, message: '请填写'+form.name,tab:'2' }]"
            :disabled="form.disabled"
        />
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
            }
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../../../../assets/scss/minix";
    .text-box{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        border: #cecece solid 1px;
        border-radius: 5px;
        overflow: hidden;
        position: relative;
        .clear-form-btn{
            position: absolute;
            top: 10px;
            right: 0px;
            z-index: 100;
        }
        .text-left{
            width: 10.2em;
            border-right: #cecece solid 1px;
        }
    }
    ::v-deep .van-field__control{
        color: #646566;
    }
	::v-deep .van-icon-star{
		color: #ee0a24;
		font-size: 12px;
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
	::v-deep .van-cell{
		padding: 6px 10px;
	}
    ::v-deep .van-field__label{
        //border-right: #cecece solid 1px;
    }
</style>
