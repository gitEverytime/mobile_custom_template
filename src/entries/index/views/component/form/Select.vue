<template>
    <div class="text-box">
        <van-field v-model="form.name" class="text-left" label="" :readonly="form.readonly"  />
		<van-field
            :readonly="form.readonly"
            clickable
			:left-icon="form.required && !disabled && !form.disabled ? 'star': ''"
			v-model="form._value"
		    label=""
		    :name="String(form.tab)"
		    :placeholder="!form.disabled ? '点击选择'+form.name :''"
		    :rules="[{ required: form.required, message: '请点击选择'+form.name }]"
			@click="handleClickSelect(form)"
			:disabled="$route.params.status === '1' || form.disabled"
		/>
		<!-- 选择器 -->
		<van-popup v-model="form.showpicker" position="bottom">
            <van-picker
                show-toolbar
                :columns="form.options"
                @confirm="onConfirmSeclect"
                @cancel="form.showpicker = false"
            />
		</van-popup>
        <div class="clear-form-btn" v-if="$route.params.status === '0'"  @click="handleClickClear">
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
		created() {
			
		},
		mounted() {
			let vm = this;
			if(vm.form.enumops) vm.getSelectList(vm.form.enumops);
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
				vm.form.showpicker = false;
			},
			/**
			 * 点击下拉
			 */
			handleClickSelect(form){
				let vm = this;
				if(vm.form.readonly) return;
				form.showpicker = true
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
    ::v-deep .van-cell{
        padding: 6px 10px;
    }
	::v-deep .van-uploader{
		padding: 16px;
	}
</style>
