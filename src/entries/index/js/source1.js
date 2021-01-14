const source = {
    /***
     * banner 数据源
     */
    banner_data:{
        pics:[
            {
                name:'',
                id:''
            }
        ],                      //轮播图ids数组集合
        title:'',               //轮播title
        type:'banner1',         //类型
        autoplay:'3000',        //自动轮播间隔，单位为 ms
        duration:'500',         //动画时长，单位为 ms
        initialswipe:'0',       //初始位置索引值
        width:'auto',           //轮播滑块的宽度
        height:'150',           //高度
        loop:false,	            //是否开启循环播放  0否1是
        showindicators:true,    //是否显示指示器（小圆点）0否1是
        vertical:false,         //是否为纵向滚动 0否1是
        touchable:true,         //是否可以通过手势滑动
        indicatorcolor:'#1989fa'//指示器颜色
    },
    /**
     * 主，副标题 数据源
     */
    title_data:[
        {
            text:'',
            type:'main',
            fontsize:'',
            color:'',
            isbold:false,
        },
        {
            text:'',
            type:'sub',
            fontsize:'',
            color:'',
            isbold:false
        }
    ],
    /**
     * 背景图 数据源
     */
    background_data:{
        background_pic_id:'',
        type:''
    },
    /**
     * 表单 数据源
     */
    form_data:{

    }
};
export default source;