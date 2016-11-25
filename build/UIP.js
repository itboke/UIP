/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * @description main.js
	 *
	*/

	var UIP = __webpack_require__(1);
	new UIP.Parser();


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * UI组件插件解析
	 * 
	*/

	var LowAudio = __webpack_require__(2);

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
			})
		})
	};

	Parser.prototype = {
		subset:['LowAudio'],
		$:function(name){
			return document.querySelectorAll(name);
		}
	};

	module.exports = {
		LowAudio:LowAudio,
		Parser:Parser
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

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
	__webpack_require__(3);
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
		

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(4);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(6)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/less-loader/index.js!./style.less", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/less-loader/index.js!./style.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(5)();
	// imports


	// module
	exports.push([module.id, "html,\nbody {\n  font-family: Helvetica Neue, Helvetica, STHeiTi, Arial, sans-serif;\n  font-size: .18rem;\n  line-height: 1.5;\n  -webkit-font-smoothing: antialiased;\n  background: #f0f1f3;\n}\n* {\n  margin: 0;\n  padding: 0;\n}\n.container {\n  max-width: 750px;\n  min-width: 320px;\n  margin: 0 auto;\n  overflow: hidden;\n}\n.low-audio-box .inner-box {\n  margin: auto;\n  background-color: #252525;\n  border: 0.15rem solid #10101a;\n  border-radius: 0.04rem;\n  overflow: hidden;\n}\n.low-audio-box .inner-box .inner-tv {\n  position: relative;\n  width: 100%;\n  height: 85%;\n}\n.low-audio-box .inner-box .inner-tv .play-tv {\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  margin-left: -51px;\n  margin-top: -31px;\n  width: 100px;\n  height: 60px;\n  border-radius: 6px;\n  border: 1px solid #3B3B3B;\n  background: -webkit-linear-gradient(top, #282828 0%, #202020 50%, #151515 100%);\n  background: linear-gradient(top, #282828 0%, #202020 50%, #151515 100%);\n  cursor: pointer;\n}\n.low-audio-box .inner-box .inner-tv .play-tv:after {\n  content: \" \";\n  display: block;\n  margin-left: 41px;\n  margin-top: 16px;\n  width: 0;\n  height: 0;\n  border-top: 14px solid transparent;\n  border-bottom: 14px solid transparent;\n  border-left: 24px solid #fff;\n}\n.low-audio-box .inner-box .inner-property {\n  width: 100%;\n  overflow: hidden;\n}\n.low-audio-box .inner-box .inner-property .pro {\n  float: left;\n  border-radius: 2px;\n  border: 1px solid #3B3B3B;\n  background: -webkit-linear-gradient(top, #282828 0%, #202020 50%, #151515 100%);\n  background: -moz-linear-gradient(top, #282828 0%, #202020 50%, #151515 100%);\n  background: linear-gradient(top, #282828 0%, #202020 50%, #151515 100%);\n}\n.low-audio-box .inner-box .inner-property .pro-volume {\n  position: relative;\n  width: 0.8rem;\n  height: 0.8rem;\n  text-align: center;\n  line-height: 0.8rem;\n  cursor: pointer;\n}\n.low-audio-box .inner-box .inner-property .pro-volume .controller {\n  position: absolute;\n  left: 0px;\n  top: -102px;\n  width: 50px;\n  height: 100px;\n  background: -webkit-linear-gradient(top, #282828 0%, #202020 50%, #151515 100%);\n  background: -moz-linear-gradient(top, #282828 0%, #202020 50%, #151515 100%);\n  background: linear-gradient(top, #282828 0%, #202020 50%, #151515 100%);\n  border-left: 1px solid #3B3B3B;\n  border-top: 1px solid #3B3B3B;\n  border-right: 1px solid #3B3B3B;\n}\n.low-audio-box .inner-box .inner-property .pro-volume .bar {\n  margin: auto;\n  margin-top: 10%;\n  width: 5px;\n  height: 90%;\n  border-radius: 2px;\n  background-color: #fff;\n}\n.low-audio-box .inner-box .inner-property .pro-progress {\n  width: 6.35rem;\n  height: 0.8rem;\n  overflow: hidden;\n}\n.low-audio-box .inner-box .inner-property .pro-progress .pause {\n  position: relative;\n  float: left;\n  width: 0.8rem;\n  height: 0.8rem;\n  text-align: center;\n  line-height: 0.8rem;\n  cursor: pointer;\n}\n.low-audio-box .inner-box .inner-property .pro-progress .pause .icon-bofanganniu {\n  display: block;\n  font-size: 0.28rem;\n  color: #fff;\n}\n.low-audio-box .inner-box .inner-property .pro-progress .pause .icon-anniuguanbi {\n  display: none;\n}\n.low-audio-box .inner-box .inner-property .pro-progress .play {\n  position: relative;\n  float: left;\n  width: 0.8rem;\n  height: 0.8rem;\n  text-align: center;\n  line-height: 0.8rem;\n  cursor: pointer;\n}\n.low-audio-box .inner-box .inner-property .pro-progress .play .icon-bofanganniu {\n  display: none;\n}\n.low-audio-box .inner-box .inner-property .pro-progress .play .icon-anniuguanbi {\n  display: block;\n  font-size: 0.32rem;\n  color: #fff;\n}\n.low-audio-box .inner-box .inner-property .pro-progress .progress {\n  float: right;\n  position: relative;\n  margin-right: 0.2rem;\n  margin-top: 0.3rem;\n  width: 5.3rem;\n  height: 0.2rem;\n  background: #474747;\n  border-radius: 2px;\n}\n.low-audio-box .inner-box .inner-property .pro-progress .progress .runing {\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 0%;\n  height: 100%;\n  background: #55EFF9;\n  border-radius: 2px;\n}\n.low-audio-box .inner-box .inner-property .pro-progress .timer {\n  position: absolute;\n  right: 0.05rem;\n  bottom: -0.32rem;\n  font-size: 0.22rem;\n  color: #999;\n}\n.low-audio-box .inner-box .inner-property .icon-yinliang-copy {\n  display: block;\n  font-size: 0.36rem;\n  color: #fff;\n}\n", ""]);

	// exports


/***/ },
/* 5 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }
/******/ ]);