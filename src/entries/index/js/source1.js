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
            text:'点击输入主标题',
            type:'main',
            fontsize:'18',
            color:'#666666',
            isbold:true,
            paddingtop:30
        },
        {
            text:'点击输入副标题',
            type:'sub',
            fontsize:'14',
            color:'#999999',
            isbold:false,
            paddingtop:15

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
    form_data:[
        {
            type:'add'
        }

    ],
    forms:[
        {
            name:'文本框',
            key:'',
            value:'',
            type:'text',
            rows:'1',
            required:false,
            disabled:false,
            placeholder:'',
            border:false,
            bordercolor:'#999999',
            readonly:false,
            autofocus:false,
            autosize:false,
            size:'',
        },
        {
            name:'电话号码',
            key:'',
            value:'',
            type:'phone',
            rows:'1',
            required:false,
            disabled:false,
            placeholder:'',
            border:false,
            bordercolor:'#999999',
            readonly:false,
            autofocus:false,
            autosize:false,
            size:'',
        },
        {
            name:'身份证号',
            key:'',
            value:'',
            type:'idcard',
            rows:'1',
            required:false,
            disabled:false,
            placeholder:'',
            border:false,
            bordercolor:'#999999',
            readonly:false,
            autofocus:false,
            autosize:false,
            size:'',
        },
        {
            name:'电子邮箱',
            key:'',
            value:'',
            type:'email',
            rows:'1',
            required:false,
            disabled:false,
            placeholder:'',
            border:false,
            bordercolor:'#999999',
            readonly:false,
            autofocus:false,
            autosize:false,
            size:'',
        },
        {
            name:'日期',
            key:'',
            value:'',
            type:'date',
            rows:'1',
            required:false,
            disabled:false,
            placeholder:'',
            border:false,
            bordercolor:'#999999',
            readonly:false,
            autofocus:false,
            autosize:false,
            size:'',
            mindate:'',
            maxdate:'',
            defaultdate:'',
            showcalendar:false
        },
        {
            name:'验证码',
            key:'',
            value:'',
            type:'code',
            rows:'1',
            required:false,
            disabled:false,
            placeholder:'',
            border:false,
            bordercolor:'#999999',
            readonly:false,
            autofocus:false,
            autosize:false,
            size:'',
        },
        {
            name:'下拉选择',
            key:'',
            value:'',
            type:'select',
            rows:'1',
            required:false,
            disabled:false,
            placeholder:'',
            border:false,
            bordercolor:'#999999',
            readonly:false,
            autofocus:false,
            autosize:false,
            size:'',
            showpicker:false,
            enumops:'',
            options:[
                {
                    text:'选项一',
                    value:'1'
                }
            ]
        },
        {
            name:'单选框',
            key:'',
            value:'',
            type:'radio',
            rows:'1',
            required:false,
            disabled:true,
            placeholder:'',
            border:false,
            bordercolor:'#999999',
            size:'',
            enumops:'',
            options:[
                {
                    text:'是',
                    value:'1'
                },
                {
                    text:'否',
                    value:'2'
                }
            ]
        },
        {
            name:'复选框',
            key:'',
            value:'',
            type:'checkbox',
            rows:'1',
            required:false,
            disabled:true,
            placeholder:'',
            border:false,
            bordercolor:'#999999',
            size:'',
            enumops:'',
            options:[
                {
                    text:'选项一',
                    value:'1'
                },
                {
                    text:'选项二',
                    value:'2'
                },
            ]
        },
        {
            name:'上传图片',
            key:'',
            type:'upload',
            mold:'multi',
            value:'',
            _value:[],
            multiple:false,  //是否开启多传
            count:'10',  //最大上传数量
            uploader:[],
            previewsize:'80',	//预览图和上传区域的尺寸，填写数字，默认80px
            required:false,
            disabled:true,  //
            deletable:true,    //是否展示删除按钮
            maxsize:0   //上传文件大小限制，预留字段
        },
    ]
};
export default source;