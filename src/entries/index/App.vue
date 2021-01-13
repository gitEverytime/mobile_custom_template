<template>
    <div id="index">
        <transition name="component-fade" mode="out-in">
            <router-view :key="key"></router-view>
        </transition>
    </div>
</template>

<script>
	import cookie from '../../assets/js/cookie.js'
	const storage = window.localStorage;
    export default {
        name: 'index',
        components: {

        },
        data(){
            return{
                transitionName:''
            }
        },
        created () {
			let vm = this;
        },
        mounted(){

        },
        computed:{
            key(){
                return this.$route.fullPath + Math.random();
            }
        },
        methods:{

        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/minix";
    #index{
        @include set-width-height(100%,100%);
    }
</style>
