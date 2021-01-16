<template>
	<div class="collapseBox">
		<van-collapse v-model="activeNames">
		  <van-collapse-item name="1">
			    <template #title>
					<div>{{form.name}}</div>
			    </template>
				<p>
					<van-icon name="add" color="#1e9fff" v-if="!disabled"  size="25" @click="handleClickAdd"/>
				</p>
				<van-row>
					<van-col
					span="24"
					class="list-box"
					v-for="(item,index) in form.list"
					:key="item.id"
					@click="handleClickCol(item,index)"
				  >
						<p>
							<span class="title">{{item.hotelname}}</span>
							<span class="name">地址：{{item.hoteladdress}}</span>
							<span class="address">就餐时间：{{item.mealtime}}</span>
						</p>
						<div class="radio_box">
							<van-icon name="clear" color="#ee0a24" v-if="!disabled"  size="27" @click="form.list.splice(index,1)" />
						</div>
					</van-col>
				</van-row>
		  </van-collapse-item>
		</van-collapse>
		<!-- 自定义面板 -->
		<van-action-sheet v-model="form.showSheet" :title="form.name">
			<van-form validate-first @submit="onSubmit">
				<div  v-for="(form,index) in form.detail">
					<!-- 输入框 -->
					<van-field
						v-if="form.type === 'text'"
						v-model="form.value"
						:rows="form.rows"
						:left-icon="form.required ? 'star': ''"
						autosize
						type="textarea"
						:name="form.name"
						:label="form.name"
						:maxlength="form.maxlength"
						:show-word-limit="form.show_word_limit"
						:placeholder="!disabled ? '请输入'+form.name : ''"
						:rules="[{ required: form.required, message: '请填写' + form.name }]"
						:disabled="disabled"
					/>
					<!-- 日期 -->
					<div v-if="form.type === 'date'">
						<van-field
							readonly
							clickable
							:left-icon="form.required ? 'star': ''"
							name="calendar"
							v-model="form.value"
							:label="form.name"
							:placeholder="!disabled ? '点击选择'+form.name : ''"
							:rules="[{ required: form.required, message: '请点击选择' + form.name }]"
							@click="handleClickDate(index)"
							:disabled="disabled"
						/>
						<!-- 时间选择器 -->
						<van-calendar v-model="form.showCalendar" color="#07BD72" @confirm="onConfirmDate" @open="handleClickOpen(index)"/>
					</div>
					<!-- 下拉选择 -->
					<div v-if="form.type === 'select'">
						<van-field
							readonly
							clickable
							:left-icon="form.required ? 'star': ''"
							v-model="form.value"
						   :label="form.name"
						   :placeholder="!disabled ? '点击选择'+form.name :''"
						   :rules="[{ required: form.required, message: '请点击选择' + form.name }]"
							@click="handleClickSelect(form,index)"
							:disabled="disabled"
						/>
						<!-- 选择器 -->
						<van-popup v-model="form.showPicker" position="bottom">
						<van-picker
							show-toolbar
							:columns="form.is_server_data ? columns : form.options"
							@confirm="onConfirmSeclect"
							@cancel="form.showPicker = false"
						/>
						</van-popup>
					</div>
					<!-- 树状选择-->
					<div v-if="form.type === 'tree'">
						<van-field
							readonly
							clickable
							:left-icon="form.required ? 'star': ''"
							name="calendar"
							autosize
							type="textarea"
							v-model="form.value"
							:label="form.name"
							:placeholder="!disabled ? '点击选择'+form.name : ''"
							:rules="[{ required: form.required, message: '请点击选择'+form.name }]"
							@click="handleClickTree(index)"
							:disabled="disabled"
						/>
						<van-popup
							v-model="form.showTree" 
							round 
							position="bottom"
						>
							<van-tree-select
							  :items="formData[form.listKey]"
							  :active-id.sync="form.activeId"
							  @click-item="handleClickRightItems"
							/>
						</van-popup>
					</div>
					<!-- 复选组件 -->
					<van-field 
						v-if="form.type === 'checkbox'"
						name="checkboxGroup" 
						:left-icon="form.required ? 'star': ''"
						:label="form.name"
						@click="handleClickCheckBox(index)"
						:disabled="disabled"
						>
						<template #input>
							<van-checkbox-group v-model="form._value" direction="horizontal" @change="handleChangeCheckBox">
								<van-checkbox 
									v-for="checkBox in form.checkboxs"
									:name="checkBox" 
									icon-size="16px"
									shape="square"
									checked-color="#1e9fff"
									:disabled="disabled"
								>
								{{checkBox}}
								</van-checkbox>
							</van-checkbox-group>
						</template>
					</van-field>
					<!-- 自定义弹出面板 -->
					<temp-form-sheet v-if="form.type === 'sheet'" :form="form"></temp-form-sheet>
				
				</div>
				<div style="margin: 16px;">
					<van-button 
						round 
						block  
						type="primary" 
						native-type="submit"
						:loading="loading"
						loading-text="提交中..."
					>
					  保存信息
					</van-button>
				</div>
			</van-form>
		</van-action-sheet>
	</div>
</template>

<script>
	import TempFormSheet from '../component/Sheet.vue'
	export default{
		components:{
			TempFormSheet
		},
		props:{
			form:Object
		},
		data(){
			return{
				activeNames: [],
				formData:Object,
				disabled:false,
				index:null,
				loading:false,
				hotelIndex:null
			}
		},
		mounted() {
			let vm = this;
			if(vm.$route.params.code === '1') vm.disabled = true;
		},
		methods:{
			/**
			 * 添加
			 */
			handleClickAdd(){
				let vm = this;
				vm.form.showSheet = true;
				vm.hotelIndex = null;
			},
			/**
			 * @param {Object} index提交
			 */
			onSubmit(values){
				let vm = this;
				let row = {};
				vm.form.detail.forEach((val) => {
					if(val.type === 'checkbox') {
						row[val.key] = val._value.join(',')
					}else{
						if(val.key === 'hotelname') {
							row['regulatoryname'] = val.regulatoryname;
							row['regulatoryunid'] = val.regulatoryunid;
						}
						row[val.key] = val.value;
					}
				})
				console.log(row)
				vm.hotelIndex || vm.hotelIndex === 0 ? vm.form.list.splice(index,1,row) : vm.form.list.push(row);
				vm.form.showSheet = false;
				vm.hotelIndex = null;
			},
			/*
			 * 点击日期
			 */
			handleClickDate(index){
				let vm = this;
				if(vm.disabled) return;
				vm.form.detail[index].showCalendar = true;
			},
			/**
			 * 日历弹层open时触发
			 */
			handleClickOpen (index) {
				let vm = this;
				vm.index = index;
			},
			/**
			 * 日期选择完成
			 */
			onConfirmDate (date) {
				let vm = this;
				let month = null;
				let day = null;
				date.getMonth() + 1 <= 10 ? month = `0${date.getMonth() + 1}` : month = `${date.getMonth() + 1}`;
				date.getDate() + 1 <= 10 ? day = `0${date.getDate()}` : day = `${date.getDate()}`;
				vm.form.detail[vm.index].value = `${date.getFullYear()}-${month}-${day}`;
				vm.form.detail[vm.index].showCalendar = false;
			},
			/**
			 * 点击酒店信息
			 */
			handleClickCol(row,index){
				let vm = this;
				vm.hotelIndex = index;
				vm.form.detail.forEach((item,index) => {
					Object.keys(row).forEach((res) => {
						if(item.key === res) {
							item.value = row[res]
							if(item.type === 'checkbox') item._value = item.value.split(',');
						}
					})
				})
				vm.form.showSheet = true;
			},
			/**
			 * 下拉选择
			 */
			onConfirmSeclect(data){
				let vm = this;
				vm.form.detail[vm.index].value = data.text;
				vm.form.detail[vm.index].showPicker = false;
			},
			/**
			 * 点击下拉
			 */
			handleClickSelect(form,index){
				let vm = this;
				vm.index = index;
				switch(form.selectType) {
					case 'enterpriseType':
						vm.columns = vm.enterpriseType;
					break;
					case 'sechecktasklevel':
						vm.columns = vm.sechecktasklevel;
					break;
					case '':
					break;
					// default:
					//     return [];
				}
				form.showPicker = true
			},
			/**
			 * 点击树状
			 */
			handleClickTree(index){
				let vm = this;
				if(vm.disabled) return;
				vm.index = index;
				vm.form.detail[vm.index].showTree = true;
			},
			/**
			 * 点击右侧树状选项
			 */
			handleClickRightItems(data){
				let vm = this;
				let isPush = true;
				let arr = [];
				let value = vm.form.detail[vm.index].value;
				if(vm.form.detail[vm.index].treeType === 'simple') {               //单选
					vm.form.detail[vm.index].value = data.text;
				}else{                                                               //多选
					if(value){
						arr = value.split(',');
						arr.forEach((part,index) => {
							if(part === data.text) {
								isPush = false;
								arr.splice(index,1)
								vm.form.detail[vm.index].value = arr.join(',');
							}
						})
					}
					if(isPush) {
						arr.push(data.text);
						vm.form.detail[vm.index].value = arr.join(',');
					}
				}
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
			},
		}
	}
</script>

<style lang="scss" scoped>
    @import "../../../../../assets/scss/minix";
	.collapseBox{
		
	}
	.list-box{
		padding: 12px;
		background-color: #fff;
		border-radius: 8px;
		margin-bottom: 12px;
		@include layout-flex-r;
		background-color: rgb(247, 248, 250);
		.radio_box{
			width: 66px;
			height: 66px;
			@include layout-flex-r-center;
			align-items: center;
		}
		p{
			@include layout-flex-c-sb;
			.title{
				color: #07BD72;
				font-weight: bold;
				width: 14rem;
				@include hiddenLineMax
			}
			.name{
				font-size: 13px;
				color: #323233;
			}
			.address{
				font-size: 12px;
				color: #323233;
				width: 13rem;
				@include hiddenLineMax
			}
		}
	}
</style>
