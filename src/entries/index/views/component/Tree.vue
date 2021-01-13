<template>
	<div>
		<van-field
			readonly
			clickable
			:left-icon="form.required && !disabled && !form.disabled ? 'star': ''"
			name="calendar"
			autosize
			type="textarea"
			v-model="form._value"
			:label="form.name"
			:name="String(form.tab)"
			:placeholder="!disabled ? '点击选择' + form.name : ''"
			:rules="[{ required: form.required, message: '请点击选择'+form.name }]"
			@click="handleClickTree(index)"
			:disabled="disabled || form.disabled"
		/>
		<van-popup
			v-model="form.showTree" 
			round 
			v-if="!disabled || form.disabled"
			position="bottom"
			@close="handleClickClose"
		>
			<van-button type="info" style='margin-left: 12px; margin-top: 12px;' native-type="button" size="small" @click="handleClickSure">确定</van-button>		
			<van-tree-select
			  :items="wholeosList"
			  :active-id.sync="form.activeId"
			  :main-active-index.sync="activeIndex"
			  @click-item="handleClickRightItems"
			/>
		</van-popup>
	</div>
</template>
<script>
    const storage = window.localStorage;
	export default{
		props:{
			form:Object,
			disabled:Boolean,
			formData:Object,
			index:Number
		},
		data(){
			return{
				wholeosList:[
					
				],
				activeIndex: 0,
			}
		},
		created() {
			
		},
		mounted() {
			let vm = this;
            vm.getWholsesList();
		},
		methods:{
		    /**
             * 获取分局下的监管所
             */
            getWholsesJianGuansuoList: async function() {
                let vm = this;
                let params = {
                    type: 'wholeos'//
                }
                const res = await vm.http.get(vm.api.TREEACT,params);
                if(!res){
                    return
                }
                let result = res.data.data;
                vm.wholeosList = [
                    {
                        text:'监管所',
                        children:result[0].children[0].children
                    }
                ];
            },
			/**
			 * 获取日常监管机构
			 */
			getWholsesList: async function() {
			    let vm = this;
			    let params = {
					type: 'curros'//
			    }
			    const res = await vm.http.get(vm.api.TREEACT,params);
			    if(!res){
			        return
			    }
				let result = res.data.data;
                vm.wholeosList = [
                    {
                        text:'单位信息',
                        children:vm.jsonToArray(result)
                    }
                ];
			},
            /**
             * 递归
             */
            jsonToArray(nodes) {
                let vm = this;
                var r=[];
                if (Array.isArray(nodes)) {
                    for (var i=0, l=nodes.length; i<l; i++) {
                        r.push(nodes[i]); // 取每项数据放入一个新数组
                        if (Array.isArray(nodes[i]["children"])&&nodes[i]["children"].length>0)
                            // 若存在children则递归调用，把数据拼接到新数组中，并且删除该children
                            r = r.concat(vm.jsonToArray(nodes[i]["children"]));
                        delete nodes[i]["children"]
                    }
                }
                return r;
            },
			/**
			 * 确认
			 */
			handleClickSure(){
				let vm = this;
				vm.formData.data[vm.index].showTree = false;
			},
			/**
			 * 关闭树状
			 */
			handleClickClose(){
				let vm = this;
			},
			/**
			 * 点击树状
			 */
			handleClickTree(){
				let vm = this;
				if(vm.disabled || vm.form.disabled) return;
				vm.formData.data[vm.index].showTree = true;
			},
			/**
			 * 点击右侧树状选项
			 */
			handleClickRightItems(data){
				let vm = this;
				let isPush = true;
				let arr = [];
				let value = vm.formData.data[vm.index].value;
				if(vm.formData.data[vm.index].treeType === 'simple') {               //单选
					vm.formData.data[vm.index].value = data.text;
					data.unid ? vm.formData.data[vm.index].value = data.unid : vm.formData.data[vm.index].value = data.id;
					vm.formData.data[vm.index]._value = data.text;
				}else{                                                               //多选
					if(value){
						arr = value.split(',');
						arr.forEach((part,index) => {
							if(part === data.text) {
								isPush = false;
								arr.splice(index,1);
								vm.formData.data[vm.index]._value = arr.join(',');
							}
						})
					}
					if(isPush) {
						arr.push(data.text);
						vm.formData.data[vm.index]._value = arr.join(',');
					}
					
				}
			},
		},
		beforeDestroy() {
			let vm = this;
			vm.form.activeId = '';
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
