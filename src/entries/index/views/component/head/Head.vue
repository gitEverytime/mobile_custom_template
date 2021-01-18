<template>
	<div 
		 class="comp_title title_fixed"
		 id="comp_title "
		:style="{
			top:titleData.offsetTop + 'px'
		}"
	>
		<!-- 导航 -->
		<van-nav-bar
		    :title="titleData.text"
            :style="{
                backgroundColor:$store.state.common_back_color
            }"
		    left-text=""
		    right-text=""
		    :left-arrow="true"
		    @click-left="$emit('onClickLeft')"
		   >
		</van-nav-bar>
	</div>
</template>

<script>
	export default {
		components:{

		},
		props:{
			titleData:Object
		},
		data(){
			let vm = this;
			return{
			}
		},
		mounted() {
			let vm = this;
			/**
			 * 判断当前环境为沉浸式状态栏模式
			 */
			var immersed = 0;
			var ms=(/Html5Plus\/.+\s\(.*(Immersed\/(\d+\.?\d*).*)\)/gi).exec(navigator.userAgent);
			if(ms&&ms.length>=3){ // 当前环境为沉浸式状态栏模式
				immersed=parseFloat(ms[2]);// 获取状态栏的高度
				/**
				 * 获取title的top
				 */
				var t_top = document.querySelector('.comp_title').offsetTop;
				document.getElementById('comp_title').style.top = (immersed + t_top)+'px';
			}
		},
		methods:{
			/**
			 * 返回
			 */
			onClickLeft(){
				
			},
		}
	}
</script>

<style lang="scss" scoped>
	.comp_title{
		::v-deep .van-nav-bar .van-icon,
		::v-deep .van-nav-bar__title
		{
			color: #FFFFFF;
		}
		.saveBtn{
			color: #FFFFFF;
		}
	}
	.title_fixed{
		position: fixed;
		left: 0;
		z-index: 9999;
		width: 100%;
	}
	::v-deep .van-button--info{
		background-color: transparent;
		border:none;
		font-size: 14px;
	}
	.code{
		color: #FFFFFF;
		display: flex;
		flex-direction: column;
		i{
			font-size: 20px;
		}
		label{
			font-size: 10px;
		}
	}	
</style>

