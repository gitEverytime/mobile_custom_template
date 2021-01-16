<template>
    <div v-if="form.type === 'checkdate'">
        <van-field
                readonly
                clickable
                :left-icon="form.required && !disabled && !form.disabled ? 'star': ''"
                name="calendar"
                v-model="form.value"
                :label="form.name"
                :name="String(form.tab)"
                :placeholder="!disabled ? '点击选择'+form.name : ''"
                :rules="[{ required: form.required, message: '请点击选择'+form.name }]"
                @click="handleClickDate(index)"
                :disabled="disabled || form.disabled"
        />
        <!-- 时间选择器 -->
        <van-calendar
                v-model="form.showCalendar"
                color="#1e9fff"
                :min-date="minDate"
                :max-date="maxDate"
                @confirm="onConfirmDate"
                @open="handleClickOpen(index)"
        />
        <!-- canvas大小-->
        <canvas id="myCanvas1" style="display: none"></canvas>
    </div>
</template>

<script>
import axios from "axios";
const backImg = require('../../../../../assets/images/lingwu_zhang.png');
import time from '../../../../../assets/js/time.js'
export default{
    props:{
        form:Object,
        disabled:Boolean,
        formData:Object,
        index:Number
    },
    data(){
        return{
            basedata:''
        }
    },
    computed: {
        maxDate(){
            let curDate = (new Date()).getTime();
            let one = 365 * 24 * 3600 * 1000 * 10;
            let oneYear = curDate + one;
            return new Date(oneYear);
        },
        minDate(){
            let curDate = (new Date()).getTime();
            let one = 365 * 24 * 3600 * 1000 * 10;
            let oneYear = curDate - one;
            return new Date(oneYear);
        },
        checkDate(){
            let vm = this;
            return vm.form.value
        }
    },
    watch:{

    },
    created() {

    },
    mounted() {
        let vm = this;
        if(!vm.form.value || vm.$route.params.id !== '0') {
            vm.drawAndShareImage();
        }
    },
    methods:{
        drawAndShareImage() {
            let vm = this;
            var canvas = document.getElementById("myCanvas1");
            canvas.width = 400;
            canvas.height = 400;
            var context = canvas.getContext("2d");
            context.rect(0 , 0 , canvas.width , canvas.height);
            context.fillStyle = "#fff";
            context.fill();
            var myImage = new Image();
            myImage.src = backImg;  //背景图片 你自己本地的图片或者在线图片
            myImage.crossOrigin = 'Anonymous';
            myImage.onload = function(){
                context.drawImage(myImage ,  0 , 0 , 400 , 400);
                // 设置字体
                context.font = "30px bold 黑体";
                // 设置颜色
                context.fillStyle = "#000";
                // 设置水平对齐方式
                context.textAlign = "center";
                // 设置垂直对齐方式
                context.textBaseline = "middle";
                // 绘制文字（参数：要写的字，x坐标，y坐标）
                context.fillText(`${time.computed()}（签章）`, 220, 280);
                context.fillText(`灵武市场监督管理局`, 220, 320);
                // myImage2.onload = function(){
                //     context.drawImage(myImage2 , 0 , 0 , 420 , 420);
                vm.basedata = canvas.toDataURL("image/png"); //"image/png" 这里注意一下
                vm.updatavue();
            }
        },
        /**
         * base64转Blob
         * @param base64Data
         * @returns {Blob}
         */
        base64ToBlob(base64Data) {
            let arr = base64Data.split(","),
                fileType = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]),
                l = bstr.length,
                u8Arr = new Uint8Array(l);

            while (l--) {
                u8Arr[l] = bstr.charCodeAt(l);
            }
            return new Blob([u8Arr], {
                type: fileType,
            });
        },
        /**
         * 上传图片
         * @returns {Promise<void>}
         */
        updatavue: async function() {
            let vm = this;
            let fd = new FormData()
            let blobObj = vm.base64ToBlob(vm.basedata);
            let file = new File([blobObj], "pic.png", {
                type: blobObj.type,
                lastModified: Date.now(),
            });
            fd.append('file', file)
            fd.append('resid', '48E89D741AF848569C97F42B79C29238')
            axios.post(vm.api.UPLOADER, fd, {headers: {
                    'Content-Type': 'multipart/form-data'
                }}).then(res => {
                if(res.data.status){
                    vm.formData.data.filter(data => data.key === 'rectnote')[0].value = res.data.data;
                }else{

                }
            }).catch(err => {

            })
        },
        /**
         * 日历弹层open时触发
         */
        handleClickOpen (index) {
            let vm = this;
            vm.index = index;
        },
        /**
         * 点击日期
         */
        handleClickDate(){
            let vm = this;
            if(vm.disabled || vm.form.disabled) return;
            vm.form.showCalendar = true;
        },
        /**
         * 日期选择完成
         */
        onConfirmDate (date) {
            let vm = this;
            let month = null;
            let day = null;
            date.getMonth() + 1 <= 9 ? month = `0${date.getMonth() + 1}` : month = `${date.getMonth() + 1}`;
            date.getDate() + 1 <= 10 ? day = `0${date.getDate()}` : day = `${date.getDate()}`;
            vm.form.value = `${date.getFullYear()}-${month}-${day}`;
            vm.form.showCalendar = false;
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
    // ::v-deep .van-field__control:disabled{
    // 	color: #000000;
    // }
    ::v-deep .van-uploader{
      padding: 16px;
    }
    ::v-deep .van-cell{
        padding: 6px 10px;
    }
    ::v-deep .van-field__label{
        border-right: #cecece solid 1px;
    }
</style>
