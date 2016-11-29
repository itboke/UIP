/**
 * @description 常用工具函数
 *
 *
*/
var Tools = {

	/*获取id 、 class 对应的 dom*/
	$: function(ele){
		return ele.indexOf('#') > -1 ? document.getElementById(ele.replace('#','')) : document.querySelectorAll(ele);
	},
	/*获取第一个子元素*/
	findFirst: function(parent,name){
		return parent.querySelectorAll(name)[0];
	},
	/*获取所有子元素*/
	findAll: function(parent,name){
		return parent.querySelectorAll(name);
	},
	/*先全局删除后添加单个class类*/
	raClass: function(dom,name,index){
		for(var i=0,l=dom.length;i<l;i++){
			var _class = dom[i].className;
			if(_class.indexOf(name) > -1){
				dom[i].className = _class.replace(name,'').replace(/(^\s*)|(\s*$)/g, "");
			}
		}
		dom[index].className += ' ' + name;
	},
	/*给元素设置样式*/
	setCore: function(dom,style){
		if(dom.setAttribute){
			if(dom.getAttribute('style')){
				var styleArr = style.split(';');
				styleArr.map(function(style){
					if(style){
						var style = style.split(':');
						dom.style[style[0]] = style[1];
					}
				})
			}else{
				dom.setAttribute("style",style);
			}
		}else{
			dom.style.cssText = style;
		}
	},
	setCss: function(dom,css){
		var style = '';
		if(typeof css === 'object'){
			Object.keys(css).forEach(function(attr){
				var ext = (attr == 'width') || (attr == 'height') || (attr == 'left') ? 'px;' : ';'
				style+= attr + ':' + css[attr] + ext;
			})
		}else if(typeof css === 'string'){
			style = css;
		}
		var isArr = dom.length;
		if(isArr){
			for(var i=0;i<isArr;i++){
				this.setCore(dom[i],style);
			}
		}else{
			this.setCore(dom,style);
		}
	}
};

module.exports = Tools;