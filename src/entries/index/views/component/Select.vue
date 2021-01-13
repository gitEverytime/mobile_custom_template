<template>
	<div>
		<van-field
			readonly
			clickable
			:left-icon="form.required && !disabled && !form.disabled ? 'star': ''"
			v-model="form._value"
		   :label="form.name"
		   :name="String(form.tab)"
		   :placeholder="!disabled ? '点击选择'+form.name :''"
		   :rules="[{ required: form.required, message: '请点击选择'+form.name }]"
			@click="handleClickSelect(form)"
			:disabled="disabled || form.disabled"
		/>
		<!-- 选择器 -->
		<van-popup v-model="form.showPicker" position="bottom">
		<van-picker
			show-toolbar
			:columns="form.options"
			@confirm="onConfirmSeclect"
			@cancel="form.showPicker = false"
		/>
		</van-popup>
	</div>
</template>
<script>
	export default{
		props:{
			form:Object,
			disabled:Boolean,
			formData:Object,
			index:Number
		},
		data(){
			return{
				
			}
		},
		created() {
			
		},
		mounted() {
			let vm = this;
			if(vm.form.enumops) vm.getSelectList(vm.form.enumops);
		},
		methods:{
			/**
			 * 列表获取
			 */
			getSelectList: async function(enumops) {
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
			 * 下拉选择
			 */
			onConfirmSeclect(data){
				let vm = this;
				vm.form.value = data.value;
				vm.form._value = data.text;
				vm.form.showPicker = false;
			},
			/**
			 * 点击下拉
			 */
			handleClickSelect(form){
				let vm = this;
				if(vm.disabled || vm.form.disabled) return;
				form.showPicker = true
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
	// ::v-deep .van-field__control:disabled{
	// 	color: #000000;
	// }
	::v-deep .van-uploader{
		padding: 16px;
	} 
</style>
