/**
 * UI组件插件解析
 * 
*/
import LowAudio  from './audio/index';
import LowSwiper from './swiper/index';


function Parser(){
	var doc = document;
	var subsets = this.subset;
	var _this = this;
	var $ = this.$;
	subsets.map(function(i){
		var UI = $(i);
		UI.forEach(function(ui,index){
			if(i == 'LowAudio'){
				var data = {
					dataSrc:ui.getAttribute('data-src') || ""
				};
				new LowAudio(index,UI,data);
			}
			if(i == 'LowSwiper'){
				new LowSwiper();
			}
		})
	})
};

Parser.prototype = {
	subset:['LowAudio','LowSwiper'],
	$:function(name){
		return document.querySelectorAll(name);
	}
};

module.exports = {
	LowAudio:LowAudio,
	Parser:Parser
};