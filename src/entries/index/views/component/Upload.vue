<template>
	<div class="filesWrap">
        <van-field
            name="uploader"
            :label="form.name || ''"
            :name="String(form.tab)"
            :disabled="disabled"
        >
            <template #input>
                <van-uploader
                    @before-delete="handleClickBeforeDelete"
                    @delete="handleClickDelete"
                    v-model="form.uploader"
                    :deletable="!disabled"
                    :capture="capture"
                    :after-read="afterRead"
                    :disabled="disabled"
                    :preview-image="false"
                    :max-count="form.count"
                    preview-size="60px"
                />
                <!--      <van-uploader :capture="capture" />-->
            </template>
        </van-field>
        <div class="boxs">
            <div class="files" v-for="(arr,index) in arrs">
                <!--WORD-->
                <div v-if="arr.ftype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'" class="imgBox">
                    <img src="../../../../../assets/images/word.jpg" class="showPic" @click="handleClickShowDoc(arr)">
                    <span class="close" @click="handleClickDelete(arr,index)" v-if="$route.params.code === '0'">
                        <van-icon name="cross"  class="van-icon van-icon-cross van-uploader__preview-delete-icon"/>
                    </span>
                </div>
                <!--EXCEL-->
                <div v-if="arr.ftype === 'application/vnd.ms-excel'" class="imgBox">
                    <img src="../../../../../assets/images/excel.jpg" class="showPic"  @click="handleClickShowDoc(arr)">
                    <span class="close" @click="handleClickDelete(arr,index)" v-if="$route.params.code === '0'">
                        <van-icon name="cross"  class="van-icon van-icon-cross van-uploader__preview-delete-icon"/>
                    </span>
                </div>
                <!--IMG-->
                <div v-else-if="arr.ftype === 'image/png' || arr.ftype === 'image/jpg' || arr.ftype === 'image/jpeg'" class="imgBox">
                    <img
                        :src="`/api/appendix/sximage/${arr.id}.jspx`"
                        class="showPic"
                        @click="showBigPic(`/api/appendix/sximage/${arr.id}.jspx`)"
                    >
                    <span class="close" @click="handleClickDelete(arr,index)" v-if="$route.params.code === '0'">
                        <van-icon name="cross"  class="van-icon van-icon-cross van-uploader__preview-delete-icon"/>
                    </span>
                </div>
                <!--PDF-->
                <div v-else-if="arr.ftype === 'application/pdf'" class="showPdf imgBox">
                    <div @click="showBigPdf(`/api/appendix/download/${arr.id}.jspx`)">
                        <pdf
                            :src="`/api/appendix/download/${arr.id}.jspx`"
                        ></pdf>
                    </div>
                    <span class="close"  @click="handleClickDelete(arr,index)" v-if="$route.params.code === '0'">
                        <van-icon name="cross"  class="van-icon van-icon-cross van-uploader__preview-delete-icon"/>
                    </span>
                </div>
                <span style="display: block; width: 60px; height: 20px; overflow: hidden">{{arr.name}}</span>
                <a
                    :href="`/api/appendix/download/${arr.id}.jspx`"
                    class="van-button van-button--info van-button--mini"
                    style="color: #ffffff; line-height: 24px"
                >
                    下载
                </a>
<!--                <van-button type="info" size="mini">下载</van-button>-->
            </div>
        </div>
        <van-popup
            v-model="showPopupPdf"
            closeable
            :style="{ height: '70%',width:'100%' }"
        >
            <p class="arrow">
                <!-- // 上一页 -->
                <span @click="changePdfPage(0)" class="turn" :class="{grey: currentPage==1}">上一页</span>
                {{currentPage}} / {{pageCount}}
                <!-- // 下一页 -->
                <span @click="changePdfPage(1)" class="turn" :class="{grey: currentPage==pageCount}">下一页</span>
            </p>
            <div class="pdf-box">
                <pdf
                        :src="pdfUrl"
                        :page="currentPage"
                        @num-pages="pageCount = $event"
                        @page-loaded="currentPage = $event"
                        @loaded="loadPdfHandler"
                ></pdf>
            </div>
        </van-popup>
        <van-popup
                v-model="showPopupWord"
                closeable
                :style="{ height: '70%',width:'100%' }"
        >
            <iframe :src="`http://www.xdocin.com/xdoc?_func=to&_format=html&_cache=1&_xdoc=${domin}/appendix/download/${id}.jspx`">
            </iframe>
        </van-popup>
        <!-- 遮罩层 -->
        <van-overlay :show="show" @click="show = false">
            <div class="wrapper" >
                <van-loading type="spinner" color="#1e9fff">上传中</van-loading>
            </div>
        </van-overlay>
    </div>
</template>

<script>
	import axios from 'axios'
    import pdf from 'vue-pdf'
    import Word from './Word.vue'
    import {ImagePreview} from "vant";
	const host = window.location.host
	export default {
		components:{
            pdf,
            Word
		},
		props:{
			form:Object
		},
		data(){
            const isAndroid = /android/.test(navigator.userAgent.toLowerCase());
			return{
                capture: isAndroid ? 'camera' : null,
				disabled:false,
                arrs:[],
                currentPage: 0,
                pageCount: 0,
                showPopupPdf:false,
                pdfUrl:'',
                showPopupWord:false,
                host:host,
                show:false,
                domin:'',
                id:''
			}
		},
        computed:{
		    filesVal(){
		        return this.form.value
            },
        },
        watch:{
            filesVal(data) {
               let vm = this;
               console.log(vm.form._value,vm.form.value)
               if(data) vm.getFileTypeAndValue(data);
            },
        },
		mounted() {
			let vm = this;
			if(vm.$route.params.code === '1') vm.disabled = true;
			console.log(host);
			if(host === 'fsapp.wx.nxmcs.com') {
                vm.domin = 'https://fsafety.wx.nxmcs.com'
            }
            if(host === 'fsapp-pro.wx.nxmcs.com') {
                vm.domin = 'https://fspro.wx.nxmcs.com/'
            }
		},
		methods:{
            handleClickShowDoc(arr){
                let vm = this;
                vm.showPopupWord = true;
                vm.id = arr.id;
            },
            /**
             * 删除
             */
            handleClickDelete(arr,index){
                let vm = this;
                if(vm.form.mold === 'multi') {
                    vm.form._value.forEach((id,key) => {
                        if(id === arr.id) vm.form._value.splice(key,1);
                    })
                    vm.form._value.length > 1 ? vm.form.value = vm.form._value.join(',') : vm.form.value = '';
                }else{
                    vm.form._value = ''
                    vm.form.value = '';
                }
            },
            /**
             * 改变PDF页码,val传过来区分上一页下一页的值,0上一页,1下一页
             */
            changePdfPage (val) {
                if (val === 0 && this.currentPage > 1) {
                    this.currentPage--
                }
                if (val === 1 && this.currentPage < this.pageCount) {
                    this.currentPage++
                }
            },
		    /**
             * 查看大图
             */
            showBigPic(url){
                ImagePreview([url]);
            },
            /**
             * 查看大pdf
             */
            showBigPdf(url){
                let vm = this;
                vm.pdfUrl = url;
                vm.showPopupPdf = true
            },
            // pdf加载时
            loadPdfHandler (e) {
                this.currentPage = 1 // 加载的时候先加载第一页
            },
			/**
			 * @param {Object} file上传之前
			 */
			afterRead(file) {
				let vm = this;
			    file.status = 'uploading';
			    file.message = '上传中...';
			    vm.fileUpload(file);
			},
            /**
             * 查看类型
             */
            getFileTypeAndValue: async function(data) {
                let vm = this;
                let params = {
                    ids:data
                }
                const res = await vm.http.get(vm.api.APPENDIX_LOADS, params);
                if(res.data.status) {
                    vm.arrs = res.data.data;
                }
            },
			/**
			 * 上传
			 */
			fileUpload: async function(file) {
			    let vm = this;
				let fd = new FormData()
				//48E89D741AF848569C97F42B79C29238
				//访问地址：/appendix/image/xxxxx.jspx
				fd.append('file', file.file)
				fd.append('resid', '48E89D741AF848569C97F42B79C29238')
                vm.show = true;
				axios.post(vm.api.UPLOADER, fd, {headers: {
					'Content-Type': 'multipart/form-data'
				}}).then(res => {
					if(res.data.status){
						if(vm.form.mold === 'multi') {
							vm.form._value.push(res.data.data);
							vm.form._value.length > 1 ? vm.form.value = vm.form._value.join(',') : vm.form.value = vm.form._value[0];
						}else{
							vm.form.value = res.data.data;
						}
						file.status = 'done';
						file.message = '上传成功';
					}else{
						file.status = 'failed';
						file.message = '上传失败';
					}
                    vm.show = false;
				}).catch(err => {
					file.status = 'failed';
					file.message = '上传失败';
                    vm.show = false;
				})
			},
			handleClickBeforeDelete(){
				let vm = this;
				if(vm.disabled) return
			},
		},
		beforeDestroy() {
			let vm = this;
            vm.form.value = '';
			vm.form._value = [];
			vm.form.uploader = [];
		}
	}
</script>

<style lang="scss" scoped>
    @import "../../../../../assets/scss/minix";
    .wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100%;
    }
    .showPic,.showPdf{
      width: 60px;
      height: 60px;
      border-radius: 3px;
      overflow: hidden;
    }
    iframe{
      border: 0;
      width: 100%;
      height: 100%;
    }
    .files{
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      margin-right: 10px;
      margin-bottom: 10px;
      margin-top: 0px;
    }
    ::v-deep .van-cell{
      padding: 10px 0 10px 16px;
      width: 50%;
      //width: auto;
    }
    .boxs{
       width: 50%;
      padding-top: 10px;
    }
    .filesWrap,.boxs{
      display: flex;
      flex-direction: row;
     // justify-content: flex-start;
      flex-wrap: wrap;
    }
    .imgBox{
      position: relative;
      height: 60px;
      .close{
        position: absolute;
        top: 0;
        right: 0;
        width: 14px;
        height: 14px;
        background-color: rgba(0, 0, 0, 0.7);
        border-radius: 0 0 0 12px;
        z-index: 99;
      }
    }
    //.pdf-box {
    //  -webkit-box-sizing: border-box;
    //  box-sizing: border-box;
    //  max-width: 1024px;
    //  width: 100%;
    //  margin: 0 auto;
    //  overflow-x: hidden;
    //  height: 100%;
    //  overflow-y: auto;
    //  -webkit-overflow-scrolling: touch;
    //  font-size: .28rem;
    //  span {
    //    width: 100%;
    //  }
    //}
</style>
