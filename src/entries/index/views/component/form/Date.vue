<template>
    <div class="text-box">
        <van-field v-model="form.name" class="text-left" label="" :readonly="form.readonly" />
		<van-field
            :readonly="form.readonly"
			clickable
			:left-icon="form.required && !form.disabled ? 'star': ''"
			name="calendar"
			v-model="form.value"
			label=""
			:name="String(form.tab)"
			:placeholder="!form.disabled ? '点击选择'+form.name : ''"
			:rules="[{ required: form.required, message: '请点击选择'+form.name }]"
			@click="handleClickDate(index)"
			:disabled="form.disabled"
		/>
		<!-- 时间选择器 -->
		<van-calendar 
			v-model="form.showcalendar"
			:color="$store.state.common_back_color"
			:min-date="minDate"
			:max-date="maxDate"
			@confirm="onConfirmDate" 
			@open="handleClickOpen(index)"
		/>
        <div class="clear-form-btn" v-if="$route.params.status === '0'" @click="handleClickClear">
            <van-icon name="clear"/>
        </div>
	</div>
</template>

<script>
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
                text:'',
                readonly:false,
                form_data:page[`${vm.$route.params.type}`].form_data,
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
             * 删除
             */
            handleClickClear(){
                let vm = this;
                vm.form_data.splice(vm.index,1);
            },
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
				if(vm.form.readonly) return;
				vm.form.showcalendar = true;
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
				vm.form.showcalendar = false;
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
	::v-deep .van-uploader{
		padding: 16px;
	}
    ::v-deep .van-cell{
        padding: 6px 10px;
    }
</style>
