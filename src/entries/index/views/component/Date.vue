<template>
	<div v-if="form.type === 'date'">
		<van-field
			readonly
			clickable
			:left-icon="form.required && !disabled && !form.disabled ? 'star': ''"
			name="calendar"
			v-model="form.value"
			:label="form.name"
			:name="String(form.tab)"
			:placeholder="!disabled ? '点击选择'+form.name : ''"
			:rules="[{ required: form.required, message: '请点击选择'+form.name }]"
			@click="handleClickDate(index)"
			:disabled="disabled || form.disabled"
		/>
		<!-- 时间选择器 -->
		<van-calendar 
			v-model="form.showCalendar" 
			color="#1e9fff" 
			:min-date="minDate"
			:max-date="maxDate"
			@confirm="onConfirmDate" 
			@open="handleClickOpen(index)"
		/>
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
		computed: {
		    maxDate(){
		        let curDate = (new Date()).getTime();
		        let one = 365 * 24 * 3600 * 1000 * 10;
		        let oneYear = curDate + one;
		        return new Date(oneYear);
		    },
			minDate(){
		        let curDate = (new Date()).getTime();
				let one = 365 * 24 * 3600 * 1000 * 10;
				let oneYear = curDate - one;
		        return new Date(oneYear);
		    },
		 },
		created() {
			
		},
		mounted() {
			
		},
		methods:{
			/**
			 * 日历弹层open时触发
			 */
			handleClickOpen (index) {
				let vm = this;
				vm.index = index;
			},
			/**
			 * 点击日期
			 */
			handleClickDate(){
				let vm = this;
				if(vm.disabled || vm.form.disabled) return;
				vm.form.showCalendar = true;
			},
			/**
			 * 日期选择完成
			 */
			onConfirmDate (date) {
				let vm = this;
				let month = null;
				let day = null;
				date.getMonth() + 1 <= 9 ? month = `0${date.getMonth() + 1}` : month = `${date.getMonth() + 1}`;
				date.getDate() + 1 <= 10 ? day = `0${date.getDate()}` : day = `${date.getDate()}`;
				vm.form.value = `${date.getFullYear()}-${month}-${day}`;
				vm.form.showCalendar = false;
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
