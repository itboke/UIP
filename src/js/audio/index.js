/*
 * @name LowAudio 音频播放器组件
 * @param {number} index 元素的索引值
 * @param {object} UI 页面需要实例音频的DOM 
 * @param {object} data 音频组件实例的相关属性
 * @data = {
	 	data-src: "url" 播放的MP3链接
    }
 *
*/
require('./style.less');
function LowAudio(index,UI,data){

	var data = data;
	this.opts = {
		el:'lowAudio',
		play:'play',
		pause:'pause',
		progress:'runing',
		wrapClass:'low-audio-box'
	};

	var opt = this.opts;
	var $   = this.$;
	var find = this.find;

	//获取组件模板
	var el = this.opts.el + index;
	var tpl = this.tpl(el,data);

	//渲染页面UI组件
	var oldNode = UI[index];
	var newNode = document.createElement("div");
	newNode.innerHTML = tpl;
	oldNode.parentNode.replaceChild(newNode,oldNode);


	this.ele = $('#' + el);

	var audio = this.ele;
	var _this = this;
	//判断是否就绪
	audio.addEventListener('canplay',function(){
		if(audio.readyState === 4){
			_this.timer();
		}
	},false)
	//监听播放
	this.isPlay = false;
	var oParent = audio.parentNode;
	var oPause  = find(oParent,opt.pause);
	oPause.addEventListener('click',this.play.bind(this,oPause),false);

	//进度条
	this.oProgress = find(oParent,opt.progress);

	//当媒介改变其播放位置时运行脚本
	audio.addEventListener('timeupdate',this.progress.bind(this),false);
}
LowAudio.prototype = {
	$:function(ele){
		return ele.indexOf('#') > -1 ? document.getElementById(ele.replace('#','')) : document.querySelectorAll(ele);
	},
	find:function(parent,name){
		return parent.getElementsByClassName(name)[0];
	},
	play:function(obj){
		if(this.isPlay){
			this.isPlay = false;
			this.ele.pause();
			obj.className = 'pause';
			return;
		}
		this.isPlay = true;
		this.ele.play();
		obj.className = 'play';
	},
	progress:function(oProgress){
		var progress = this.oProgress;
		var per = Math.floor(this.ele.currentTime / this.ele.duration * 100);
		progress.style.width = per + '%';
		//计算当前播放时间
		this.currentTimer();
	},
	timer:function(){
		var audio = this.ele;
		var duration = Math.floor(audio.duration);
		var minute = Math.floor(duration/60);
		var second = duration%60;
		duration = this.supply(minute) + ':' + this.supply(second);
		this.find(audio.parentNode,'duration').innerHTML = duration;
	},
	currentTimer:function(){
		var audio = this.ele;
		var currenttime = Math.floor(audio.currentTime);
		var minute = Math.floor(currenttime/60);
		var second = currenttime%60;
		currenttime = this.supply(minute) + ':' + this.supply(second);
		this.find(audio.parentNode,'current').innerHTML = currenttime;
	},
	supply:function(str){
		if(str.toString().length > 1){
			return str;
		}else{
			return '0' + str;
		}
	}
};
LowAudio.prototype['tpl'] = function(id,data){

	var html = 
		'<div class="low-audio-box">' +
			'<div class="inner-box">' +
				'<audio src="' + data.dataSrc + '" id="'+ id +'"></audio>' +
				'<div class="inner-property">' +
					'<div class="pro pro-volume">' +
						'<i class="iconfont icon-yinliang-copy"></i>' +
					'</div>' +
					'<div class="pro pro-progress">' +
						'<div class="pause"><i class="iconfont icon-bofanganniu"></i><i class="iconfont icon-anniuguanbi"></i></div>' +
						'<div class="progress">' +
							'<div class="runing"></div>' +
							'<div class="timer"><em class="current">00:00</em>/<em class="duration">00:00</em></div>' + 
						'</div>'
					'</div>'+
				'</div>' +
			'</div>' +
		'</div>';
	return html;
}

module.exports = LowAudio;
	