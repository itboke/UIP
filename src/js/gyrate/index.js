import './style.less';

import Tools from '../tools/index';
function Gyrate(){

	this.rotateX = -25;
	this.rotateY = 25;

	this.startX = 0;
	this.startY = 0;

	this.oPosition = {};

	this.ele = Tools.$('#gyrate3d');

	//3D正方体
	var spin = Tools.findFirst(this.ele,'.spin');
	
	var _this = this;
	setTimeout(function(){
		Tools.setCss(spin,{
			transform:'rotateX('+ _this.rotateX +'deg) rotateY(' + _this.rotateY + 'deg)'
		})
	},500);

	this.ele.addEventListener('touchstart',this.start.bind(this),false);
	this.ele.addEventListener('touchmove',this.move.bind(this,spin),false);
	this.ele.addEventListener('touchend',this.end.bind(this),false);
}
Gyrate.prototype.touchPos = function(e){
    var touches,targetX,targetY;
    touches = e.changedTouches;
    targetX = touches[0].clientX;
    targetY = touches[0].clientY;
    this.oPosition.x = targetX;
    this.oPosition.y = targetY;
}
Gyrate.prototype.start = function(e){
	this.touchPos(e);
    this.startX = this.oPosition.x;
    this.startY = this.oPosition.y;
}
Gyrate.prototype.move = function(spin,e){
	this.touchPos(e);
	var left = this.oPosition.x - this.startX;
	var top  = this.oPosition.y - this.startY;
	console.log(top);
	if(left < 0 && top < 0){
		left = left + this.rotateY;
		top  = Math.abs(top) + this.rotateX;
		this.rotateY = left;
		this.rotateX = top;
		Tools.setCss(spin,{
			transform:'rotateX(' + top + 'deg) rotateY('+ left +'deg)'
		})
	}
	if(left < 0 && top > 0){
		left = left + this.rotateY;
		top  = -top + this.rotateX;
		this.rotateY = left;
		this.rotateX = top;
		Tools.setCss(spin,{
			transform:'rotateX(' + top + 'deg) rotateY('+ left +'deg)'
		})
	}

	if(left > 0 && top < 0){
		left = left + this.rotateY;
		top  = Math.abs(top) + this.rotateX;
		this.rotateY = left;
		this.rotateX = top;
		Tools.setCss(spin,{
			transform:'rotateX(' + top + 'deg) rotateY('+ left +'deg)'
		})
	}

	if(left >0 && top > 0){
		left = left + this.rotateY;
		top  = -top + this.rotateX;
		this.rotateY = left;
		this.rotateX = top;
		Tools.setCss(spin,{
			transform:'rotateX(' + top + 'deg) rotateY('+ left +'deg)'
		})
	}
}
Gyrate.prototype.end = function(){
	//console.log(this)
}
new Gyrate();
module.exports = Gyrate;