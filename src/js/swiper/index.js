/*
 * @name LowSwiper 轮播图片/内容组件
 * @param {object} opts 插件的参数设置
 *
*/
import './style.less';
import Tools from '../tools/index';
function LowSwiper(opts){

    this.options = {
        el:'#swiperContainer',//默认选择顶级父元素
		autoPlay:false, //是否开启自动滚动 默认：false
		timeForAuto:3500,//滚动元素自动循环的间隔时间
		timeForAnimate:300, //滚动元素的滚动效果执行时间
        pagination:true,//是否显示小圆圈 默认是true
        initialSlider:0,//默认显示的元素
		ratio:0.4, //滑动的距离比例才进行运动
        isEnd:false,//是否是滚动到最后一个元素
        nextButton:'',//下一个按钮
        prevButton:'',//上一个按钮
        onTouchEnd:null//一个不知道用处的回调函数
	};
    this.iCurrent = 0;//屏幕元素默认为第一个 0
    this.oPosition = {}; //触摸点位置
    this.startX = 0; //触摸点位置 x
    this.startY = 0; //触摸点位置 y
    this.iLeft = 0; //滑动元素原始位置
    this.left3D = 0;//记录已经translated3d的距离
    //初始化相关操作属性
    this.attrW,this.attrL,this.totleWidth,this.timer,this.pagination;

    //相关类名
    this.swiperItem = '.swiper-item';//滚动元素

    //$.extend(this.options,opts); //默认信息合并
    this.$ele = Tools.$(this.options.el); //对象索引
    this.oMover = Tools.findFirst(this.$ele,'.swiper-wrap');//运动的盒子
    var _this = this;

    this.autoPlay = this.options.autoPlay;

    //判断是否存在图片
    this.attrL = Tools.findAll(this.oMover,this.swiperItem).length;
    if(this.attrL){
        this.attrW = this.$ele.clientWidth;
        this.totleWidth = this.attrW * this.attrL;
        Tools.setCss(this.oMover,{
            width:_this.totleWidth,
            transform:'translate3d(0px,0px,0px)'
        });

        var swipers = Tools.findAll(this.oMover,this.swiperItem);
        //设置 图片 的默认属性
        for(var i = 0; i < this.attrL; i++){
         	Tools.setCss(swipers[i],{
         		width: _this.attrW,
         		left: _this.attrW * i
         	})
        }

        // 轮播小圆圈
        this.pagination = Tools.findAll(this.$ele,'.paging-bullet');
        if(this.options.pagination){
            if(this.pagination.length){
                var l = this.attrL;
                this.pagination[0].className += ' bullet-active';
            }
        }
        //初始化点击切换事件
        // var _opt = _this.options;
        // if(_opt.nextButton && _opt.prevButton){
        //     $(_opt.nextButton).on('click',function(){
        //         _this.timer && clearInterval(_this.timer);
        //         if(_this.iCurrent >= _this.attrL - 1){
        //             _this.isEnd = true;
        //             _this.iCurrent = 0;
        //         }else{
        //             _this.isEnd = false;
        //             _this.iCurrent = _this.iCurrent + 1;
        //         }
        //         _this.animating(_this.autoRuning);
        //     })
        //     $(_opt.prevButton).on('click',function(){
        //         _this.timer && clearInterval(_this.timer);
        //         if(_this.iCurrent <= 0){
        //             _this.isEnd = false;
        //             _this.iCurrent = _this.attrL - 1;
        //         }else{
        //             _this.iCurrent = _this.iCurrent - 1;
        //         }
        //         _this.animating(_this.autoRuning);
        //     })
        // }
        if(_this.autoPlay)_this.autoRuning();
    }

    if(_this.oMover){
        this.oMover.addEventListener('touchstart',_this.startFunc.bind(_this),false);
		this.oMover.addEventListener('touchmove',_this.moveFunc.bind(_this),false);
		this.oMover.addEventListener('touchend',_this.endFunc.bind(_this),false);
    }
};
//手势之按下触摸
LowSwiper.prototype.startFunc = function(e){
    clearInterval(this.timer);
    this.touchPos(e);
    this.startX = this.oPosition.x;
    this.startY = this.oPosition.y;
    this.iLeft  = this.oMover.offsetLeft;
};
//手势之获取手势点位置
LowSwiper.prototype.touchPos = function(e){
    var touches,targetX,targetY;
    touches = e.changedTouches;
    targetX = touches[0].clientX;
    targetY = touches[0].clientY;
    this.oPosition.x = targetX;
    this.oPosition.y = targetY;
};
//手势之按下抬起
LowSwiper.prototype.endFunc = function(e){
    this.touchPos(e);
    var _disX = this.oPosition.x - this.startX;
    var _disY = this.oPosition.y - this.startY;
    if(Math.abs(_disY) < Math.abs(_disX)){
        var ratio = Math.abs(_disX) / this.attrW;
        if(ratio >= this.options.ratio){
            if(_disX < 0){//向右滑动
                this.iCurrent++;
                if(this.iCurrent < this.attrL && this.iCurrent >= 0){
                    this.animating(this.autoRuning);
                }else{
                	this.iCurrent = this.attrL - 1;
                	this.animating(this.autoRuning);
                }
            }else{//向左滑动
                this.iCurrent--;
                if(this.iCurrent < 0){
                    this.iCurrent = 0;
                    this.animating(this.autoRuning);
                }else{
                    this.animating(this.autoRuning);
                }
            }
        }else{
            this.animating(this.autoRuning);
        }
    }
};
//手势之按下滑动
LowSwiper.prototype.moveFunc = function(e){
    var _this = this;
    this.touchPos(e);
    var _moveX = _this.oPosition.x - _this.startX;
    var _moveY = _this.oPosition.y - _this.startY;
    if(Math.abs(_moveY) < Math.abs(_moveX)){
        e.preventDefault();
        if(this.left3D){
        	var left = this.left3D + this.iLeft + _moveX;
        }else{
        	var left =  this.iLeft + _moveX;
        }
        Tools.setCss(this.oMover,{
        	transform:'translate3d(' + left + 'px,0px,0px)'
        })
    }
};
//自动滚动
LowSwiper.prototype.autoRuning = function(_this){
    var _this = _this || this;
    _this.timer && clearInterval(_this.timer);
    _this.timer = setInterval(function(){
        _this.iCurrent = _this.iCurrent >= _this.attrL - 1? 0 : _this.iCurrent + 1;
        _this.animating();
    },_this.options.timeForAuto);
};
//运动函数
LowSwiper.prototype.animating = function(fn){
    var _this = this;
    this.left3D = -(this.attrW * this.iCurrent);
    Tools.setCss(this.oMover,{
    	transform:'translate3d(' + this.left3D + 'px,0px,0px)',
    	transitionDuration:'600ms'
    })
    setTimeout(function(){
    	Tools.setCss(_this.oMover,{
    		transitionDuration:'0ms'
    	})
        fn && (fn)(_this)
    },600)
    if(this.options.pagination){
        var oPaginer = this.pagination;
        Tools.raClass(oPaginer,'bullet-active',this.iCurrent);
    }
    if(typeof this.options.onTouchEnd === 'function'){
        this.activeIndex = this.iCurrent;
        this.options.onTouchEnd(this);
    }
};
//滑动向哪一个元素
LowSwiper.prototype.slideTo = function(index){
    this.iCurrent = Number(index);
    this.timer && clearInterval(this.timer);
    this.animating(this.autoRuning);
};

module.exports = LowSwiper;