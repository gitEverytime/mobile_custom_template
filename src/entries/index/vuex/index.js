import Vue from 'vue'
// @ts-ignore
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
	state:{
		common_back_color:'#1e9fff',             //公共背景色
	},
	mutations:{
		commonBackColor(state,data){
			state.common_back_color = data;
		},
	}
})