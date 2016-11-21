/**
 * UI组件插件解析
 * 
*/
function UI_plugins(){

	var doc = document;
	var subsets = this.subset;
	var _this = this;
	var $ = this.$;
	subsets.map(function(i){
		var UI = $(i);
		UI.forEach(function(ui,index){
			if(i == 'LowAudio'){
				new LowAudio(index,UI);
			}
		})
	})
};

UI_plugins.prototype = {
	subset:['LowAudio'],
	$:function(name){
		return document.querySelectorAll(name);
	}
};
new UI_plugins();