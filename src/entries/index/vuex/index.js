import Vue from 'vue'
// @ts-ignore
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
	state:{
		common_back_color:'#1e9fff',             //公共背景色
		form_margin_top:15,                      //表单距上一元素的高度
		form_padding_left_right:12               //表单距离两边的宽度
	},
	mutations:{
		setCommonBackColor(state,data){
			state.common_back_color = data;
		},
		SetFormMarginTop(state,data){
			state.form_margin_top = data;
		},
		SetFormPaddingLeftRight(state,data){
			state.form_padding_left_right = data;
		},
	}
})