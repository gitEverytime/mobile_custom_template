<template>
    <div class="banner-page-box">
        <!--    头部-->
        <comp-title :titleData="titleData" @onClickLeft="handleClickLeft">

        </comp-title>
        <van-form
            @submit="onSubmit"
            label-width="8em"
            :style="{
                marginTop:'46px'
            }"
        >
            <van-field
                v-model="banner_data.title"
                name="title"
                label="标题"
                placeholder="请输入标题"
            />
            <van-field
                name="uploader"
                label="上传轮播图"
            >
                <template #input>
                    <van-uploader
                        @before-delete="handleClickBeforeDelete"
                        @delete="handleClickDelete"
                        v-model="uploader"
                        :after-read="afterRead"
                        max-count="10"
                        preview-size="80px"
                    />
                </template>
            </van-field>
            <van-field
                v-model="banner_data.height"
                name="title"
                label="高度"
                placeholder="请输入高度（默认150）"
            />
            <van-field
                v-model="banner_data.autoplay"
                name="title"
                label="自动轮播间隔"
                placeholder="单位为ms"
            />
            <van-field
                v-model="banner_data.duration"
                name="title"
                label="动画时长"
                placeholder="单位为ms"
            >
            </van-field>
            <van-field
                v-model="banner_data.initialswipe"
                name="title"
                label="初始位置索引值"
                placeholder="单位为ms"
            >
            </van-field>
            <van-field
                name="uploader"
                label="是否开启循环播放"
            >
                <template #input>
                    <van-switch v-model="banner_data.loop" size="24px"  :active-color="$store.state.common_back_color"/>
                </template>
            </van-field>
            <van-field
                name="uploader"
                label="是否显示指示器"
            >
                <template #input>
                    <van-switch v-model="banner_data.showindicators" size="24px"  :active-color="$store.state.common_back_color"/>
                </template>
            </van-field>
            <van-field
                name="uploader"
                label="是否为纵向滚动"
            >
                <template #input>
                    <van-switch v-model="banner_data.vertical" size="24px"  :active-color="$store.state.common_back_color"/>
                </template>
            </van-field>
            <van-field
                name="uploader"
                label="是否通过手势滑动"
            >
                <template #input>
                    <van-switch v-model="banner_data.touchable" size="24px"  :active-color="$store.state.common_back_color"/>
                </template>
            </van-field>
            <div style="margin: 16px;">
                <van-button
                    round
                    block
                    type="info"
                    native-type="submit"
                    :color="$store.state.common_back_color"
                >保存</van-button>
            </div>
        </van-form>
        <!--    底部-->
        <comp-foot :titleData="footData">

        </comp-foot>
    </div>
</template>

<script>
import page from '../js/page.js'
import CompBannerBox from "./component/banner/BannerBox";
import CompTitle from './component/head/Head.vue'
import CompFoot from './component/foot/Foot.vue'
import axios from 'axios'
export default {
    name: "BannerPage",
    components:{
        CompBannerBox,
        CompTitle,
        CompFoot
    },
    data(){
        let vm = this;
        return{
            banner_data:JSON.parse(JSON.stringify(page[`${vm.$route.params.type}`].banner_data)),
            titleData:{
                text:'轮播编辑页面',
                offsetTop:0
            },
            footData:{
                text:'预览'
            },
            uploader:[]
        }
    },
    created() {
    },
    mounted() {
    },
    methods:{
        /**
         * 返回
         */
        handleClickLeft(){
            let vm = this;
            vm.$router.go(-1)
        },
        /**
         * 删除之前
         */
        handleClickBeforeDelete(){
            let vm = this;
        },
        /**
         * 删除
         */
        handleClickDelete(){
            let vm = this;
        },
        /**
         * 提交信息
         */
        onSubmit(){
            let vm = this;
            page[`${vm.$route.params.type}`].banner_data = vm.banner_data;
            vm.$router.go(-1);
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
    },
    beforeDestroy() {
    }
}
</script>

<style scoped lang="scss">
    .banner-page-box{
        overflow: hidden;
    }
</style>