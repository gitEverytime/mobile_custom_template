<template>
    <div class="text-box">
        <van-field v-model="form.name" class="text-left" label="" :readonly="form.readonly" />
		<van-field
			name="checkboxGroup" 
			:left-icon="form.required && !form.disabled ? 'star': ''"
			label=""
			:name="String(form.tab)"
			@click="handleClickCheckBox(index)"
			:rules="[{ required: form.required, message: '请点击选择'+form.name }]"
			:disabled="form.disabled"
			>
			<template #input>
				<van-checkbox-group
					v-model="form._value" 
					direction="horizontal" 
					@change="handleChangeCheckBox"
				>
					<van-checkbox 
						v-for="checkBox in form.options"
						:name="checkBox.value" 
						icon-size="16px"
						shape="square"
						:checked-color="$store.state.common_back_color"
						:disabled="form.disabled"
					>
					{{checkBox.text}}
					</van-checkbox>
				</van-checkbox-group>
			</template>
		</van-field>
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
                form_data:page[`${vm.$route.params.type}`].form_data,
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
             * 删除
             */
            handleClickClear(){
                let vm = this;
                vm.form_data.splice(vm.index,1);
            },
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
	::v-deep .van-field__control:disabled{
		color: #000000;
	}
	::v-deep .van-uploader{
		padding: 16px;
	}
</style>