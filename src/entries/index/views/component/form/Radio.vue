<template>
    <div>
        <van-field
            class="text-box"
            name="radios"
            :left-icon="form.required && !form.disabled ? 'star': ''"
            :label="form.name"
            readonly
            :disabled="form.disabled"
            :name="String(form.tab)"
            :rules="[{ required: form.required, message: '请点击选择' + form.name }]"
        >
            <template #input>
                <van-radio-group v-model="form.value" readonly direction="horizontal" @change="handleChange">
                    <van-radio
                        icon-size="16px"
                        v-for="radio in form.options"
                        :name="radio.value"
                        readonly
                        :checked-color="$store.state.common_back_color"
                        :disabled="form.disabled"
                    >
                        {{radio.text}}
                    </van-radio>
                </van-radio-group>
            </template>
        </van-field>
    </div>
</template>
<script>
	export default{
		props:{
			form:Object,
			disabled:Boolean,
			formData:Object
		},
		data(){
			return{
				
			}
		},
		created() {
			
		},
		mounted() {
			let vm = this;
			if(vm.form.enumops) vm.getRadioList(vm.form.enumops);
		},
		methods:{
			/**
			 * 列表获取
			 */
			getRadioList: async function(enumops) {
			    let vm = this;
			    let params = {
					enumops: enumops
			    }
			    const res = await vm.http.get(vm.api.OPTIONS,params);
			    if(!res){
			        return
			    }
				let result = res.data;
				vm.form.options = result;
			},
			/**
			 * @param {Object} index radio change
			 */
			handleChange(data){
				let vm = this;
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
	::v-deep .van-field__control:disabled{
		color: #000000;
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
</style>
