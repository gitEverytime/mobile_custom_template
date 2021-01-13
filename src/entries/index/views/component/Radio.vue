<template>
	<div>
		<van-field
			name="radios" 
			:left-icon="form.required && !disabled && !form.disabled ? 'star': ''"
			:label="form.name"
			:disabled="disabled || form.disabled"
			:name="String(form.tab)"
			:rules="[{ required: form.required, message: '请点击选择' + form.name }]"
			>
			<template #input>
				<van-radio-group v-if="form.level"  v-model="form.value" direction="horizontal" @change="handleChange">
					<van-radio icon-size="16px" :disabled="disabled || form.disabled" checked-color="#1e9fff" name="X2IHIBIBA">
						<img src="../../../../../assets/images/优秀.png">
					</van-radio>
					<van-radio icon-size="16px" :disabled="disabled || form.disabled" checked-color="#1e9fff" name="X2IHIBIBB">
						<img src="../../../../../assets/images/良好.png">
					</van-radio>
					<van-radio icon-size="16px" :disabled="disabled || form.disabled" checked-color="#1e9fff" name="X2IHIBIBC">
						<img src="../../../../../assets/images/一般.png">
					</van-radio>
				</van-radio-group>
				<van-radio-group v-else v-model="form.value" direction="horizontal" @change="handleChange">
					<van-radio 
						icon-size="16px"
						v-for="radio in form.radios"
						:name="form.isDictionary ? radio.value : radio" 
						checked-color="#1e9fff"
						:disabled="disabled || form.disabled"
					>
					{{form.isDictionary ? radio.text : radio}}
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
				vm.form.radios = result;
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
	::v-deep .van-uploader{
		padding: 16px;
	} 
</style>
