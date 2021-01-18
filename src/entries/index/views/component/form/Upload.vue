<template>
    <div class="text-box">
        <van-field v-model="form.name" class="text-left" label="" :readonly="form.readonly" />
        <van-field
            class="text-right"
            name="uploader"
            label=""
            :name="String(form.tab)"
            :disabled="form.disabled"
        >
            <template #input>
                <van-uploader
                    @before-delete="handleClickBeforeDelete"
                    @delete="handleClickDelete"
                    v-model="form.uploader"
                    :deletable="!form.disabled"
                    :capture="capture"
                    :after-read="afterRead"
                    :disabled="form.disabled"
                    :preview-image="true"
                    :max-count="form.count"
                    preview-size="60px"
                />
            </template>
        </van-field>
        <div class="clear-form-btn" v-if="$route.params.status === '0'"  @click="handleClickClear">
            <van-icon name="clear"/>
        </div>
    </div>
</template>

<script>
	import axios from 'axios'
    import page from "@/entries/index/js/page";
	export default {
		components:{
		},
		props:{
			form:Object,
            index:{
                type:Number
            }
		},
		data(){
            const isAndroid = /android/.test(navigator.userAgent.toLowerCase());
            let vm = this;
			return{
                capture: isAndroid ? 'camera' : null,
                form_data:page[`${vm.$route.params.type}`].form_data,
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
        }
        .text-right{
            border-left: #cecece solid 1px;
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
</style>
