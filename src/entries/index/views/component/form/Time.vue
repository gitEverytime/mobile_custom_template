<template>
	<div>
		<van-field
			readonly
			clickable
			:left-icon="form.required && !disabled && !form.disabled ? 'star': ''"
			name="calendar"
			v-model="form.timeValue"
			:label="form.name"
			:name="String(form.tab)"
			:placeholder="!disabled ? '点击选择'+form.name : ''"
			:rules="[{ required: form.required, message: '请点击选择'+form.name }]"
			@click="handleClickDateTime(index)"
			:disabled="disabled"
		/>
		<!-- 时间选择器 -->
		<van-popup v-model="form.showPickerTime" position="bottom">
			<van-datetime-picker
				type="time"
				@confirm="onConfirmTime"
				@cancel="form.showPickerTime = false"
				:min-hour="form.minHour"
				:max-hour="form.maxHour"
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
				value:''
			}
		},
		created() {
			
		},
		mounted() {
		},
		computed:{
			hour(){
				return this.form.value
			}
		},
		watch:{
			hour(data){
				let vm = this;
				if(data) {
					let hour = vm.form.value;
					let minutes = vm.form._value;
					if(Number(hour) <= 9 && String(hour).length === 1) hour = `0${hour}`;
					if(Number(minutes) <= 9 && String(minutes).length === 1) minutes = `0${minutes}`;
					vm.form.timeValue = `${hour}:${minutes}`;
				}
			}
		},
		methods:{
			/**
			 * 点击时间
			 */
			handleClickDateTime(){
				let vm = this;
				if(vm.disabled) return;
				vm.form.showPickerTime = true;
			},
			/**
			 * 时间回调
			 */
			onConfirmTime(data){
				let vm = this;
				let arr = data.split(':');
				vm.form.timeValue = data;
				vm.form.value = arr[0];
				vm.form._value = arr[1];
				vm.form.showPickerTime = false;
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
    ::v-deep .van-cell{
        padding: 6px 10px;
    }
    ::v-deep .van-field__label{
        border-right: #cecece solid 1px;
    }
</style>
