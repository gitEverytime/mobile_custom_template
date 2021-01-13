<template>
	<div>
		<van-field
			name="checkboxGroup" 
			:left-icon="form.required && !disabled && !form.disabled ? 'star': ''"
			:label="form.name"
			:name="String(form.tab)"
			@click="handleClickCheckBox(index)"
			:rules="[{ required: form.required, message: '请点击选择'+form.name }]"
			:disabled="disabled"
			>
			<template #input>
				<!-- isDictionary ? 字典模式 ：字符串模式 -->
				<van-checkbox-group
					v-model="form._value" 
					direction="horizontal" 
					@change="handleChangeCheckBox"
				>
					<van-checkbox 
						v-for="checkBox in form.checkboxs"
						:name="checkBox.value" 
						icon-size="16px"
						shape="square"
						checked-color="#1e9fff"
						:disabled="disabled"
					>
					{{checkBox.text}}
					</van-checkbox>
				</van-checkbox-group>
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
				index:null
			}
		},
		created() {
			
		},
		mounted() {
			let vm = this;
			if(vm.form.enumops) vm.getCheckBoxList(vm.form.enumops);
		},
		methods:{
			/**
			 * 列表获取
			 */
			getCheckBoxList: async function(enumops) {
			    let vm = this;
			    let params = {
					enumops: enumops
			    }
			    const res = await vm.http.get(vm.api.OPTIONS,params);
			    if(!res){
			        return
			    }
				let result = res.data;
				vm.form.checkboxs = result;
			},
			/**
			 * 关闭树状
			 */
			handleClickClose(){
				let vm = this;
			},
			/**
			 * @param {Object} data
			 */
			handleClickCheckBox(index){
				let vm = this;
				vm.index = index;
			},
			/**
			 * 复选框组切换
			 */
			handleChangeCheckBox(data){
				let vm = this;
				// data.length > 0 ? vm.formData.data[vm.index].value = data.join(',') : vm.formData.data[vm.index].value = '';
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
	::v-deep .van-uploader{
		padding: 16px;
	} 
</style>