<template>
    <div style="margin-top: 46px; padding: 0 12px">
        <van-checkbox-group v-model="result.value">
            <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
            >
                <van-row
                    type="flex"
                    v-for="(form,index) in forms"
                    :key="'list' + index"
                    @click="handleClickCol(form)"
                >
                    <van-col
                        span="4"
                        class="list_left"
                    >
                        <van-checkbox :name="JSON.stringify(form)"></van-checkbox>
                    </van-col>
                    <van-col
                        span="20"
                        class="list_right"
                    >
                        <comp-comp-list :form="form"></comp-comp-list>
                    </van-col>
                </van-row>
            </van-list>
        </van-checkbox-group>
    </div>
</template>

<script>

import page from "@/entries/index/js/page";
import CompCompList from '@/entries/index/views/component/form/CompList.vue'
export default {
    name: "List",
    components:{
        CompCompList
    },
    props:{
        result:{
            type:Object
        }
    },
    data(){
        let vm = this;
        return{
            forms:[],
            list: [],
            loading: false,
            finished: false,
        }
    },
    created() {
    },
    mounted() {
    },
    methods:{
        /**
         * 加载数据
         */
        onLoad() {
            let vm = this;
            // 异步更新数据
            setTimeout(() => {
                vm.forms = JSON.parse(JSON.stringify(page[`${vm.$route.params.type}`].forms));
                // 加载状态结束
                this.loading = false;
                // 数据全部加载完成
                this.finished = true;
            }, 1000);
        },
        /**
         * 点击行
         */
        handleClickCol(item){
            let vm = this;
        }
    },
    beforeDestroy() {
    }
}
</script>

<style scoped lang="scss">
    ::v-deep .van-row{
        padding: 5px 0;
        border-bottom: #eeeeee solid 1px;
    }
    .list_left{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
</style>