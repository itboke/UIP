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

	'use strict';

	var _lib = __webpack_require__(1);

	var _lib2 = _interopRequireDefault(_lib);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	new _lib2.default.Parser(); /*
	                             * @description main.js
	                             *
	                            */

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _index = __webpack_require__(2);

	var _index2 = _interopRequireDefault(_index);

	var _index3 = __webpack_require__(7);

	var _index4 = _interopRequireDefault(_index3);

	var _index5 = __webpack_require__(11);

	var _index6 = _interopRequireDefault(_index5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function Parser() {
		var doc = document;
		var subsets = this.subset;
		var _this = this;
		var $ = this.$;
		subsets.map(function (i) {
			var UI = $(i);
			UI.forEach(function (ui, index) {
				if (i == 'LowAudio') {
					var data = {
						dataSrc: ui.getAttribute('data-src') || ""
					};
					new _index2.default(index, UI, data);
				}
				if (i == 'LowSwiper') {
					new _index4.default();
				}
			});
		});
	} /**
	   * UI组件插件解析
	   * 
	  */
	;

	Parser.prototype = {
		subset: ['LowAudio', 'LowSwiper'],
		$: function $(name) {
			return document.querySelectorAll(name);
		}
	};

	module.exports = {
		LowAudio: _index2.default,
		Parser: Parser
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

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
	function LowAudio(index, UI, data) {

		var data = data;
		this.opts = {
			el: 'lowAudio',
			play: 'play',
			pause: 'pause',
			progress: 'runing',
			wrapClass: 'low-audio-box'
		};

		var opt = this.opts;
		var $ = this.$;
		var find = this.find;

		//获取组件模板
		var el = this.opts.el + index;
		var tpl = this.tpl(el, data);

		//渲染页面UI组件
		var oldNode = UI[index];
		var newNode = document.createElement("div");
		newNode.innerHTML = tpl;
		oldNode.parentNode.replaceChild(newNode, oldNode);

		this.ele = $('#' + el);

		var audio = this.ele;
		var _this = this;
		//判断是否就绪
		audio.addEventListener('canplay', function () {
			if (audio.readyState === 4) {
				_this.timer();
			}
		}, false);
		//监听播放
		this.isPlay = false;
		var oParent = audio.parentNode;
		var oPause = find(oParent, opt.pause);
		oPause.addEventListener('click', this.play.bind(this, oPause), false);

		//进度条
		this.oProgress = find(oParent, opt.progress);

		//当媒介改变其播放位置时运行脚本
		audio.addEventListener('timeupdate', this.progress.bind(this), false);
	}
	LowAudio.prototype = {
		$: function $(ele) {
			return ele.indexOf('#') > -1 ? document.getElementById(ele.replace('#', '')) : document.querySelectorAll(ele);
		},
		find: function find(parent, name) {
			return parent.getElementsByClassName(name)[0];
		},
		play: function play(obj) {
			if (this.isPlay) {
				this.isPlay = false;
				this.ele.pause();
				obj.className = 'pause';
				return;
			}
			this.isPlay = true;
			this.ele.play();
			obj.className = 'play';
		},
		progress: function progress(oProgress) {
			var progress = this.oProgress;
			var per = Math.floor(this.ele.currentTime / this.ele.duration * 100);
			progress.style.width = per + '%';
			//计算当前播放时间
			this.currentTimer();
		},
		timer: function timer() {
			var audio = this.ele;
			var duration = Math.floor(audio.duration);
			var minute = Math.floor(duration / 60);
			var second = duration % 60;
			duration = this.supply(minute) + ':' + this.supply(second);
			this.find(audio.parentNode, 'duration').innerHTML = duration;
		},
		currentTimer: function currentTimer() {
			var audio = this.ele;
			var currenttime = Math.floor(audio.currentTime);
			var minute = Math.floor(currenttime / 60);
			var second = currenttime % 60;
			currenttime = this.supply(minute) + ':' + this.supply(second);
			this.find(audio.parentNode, 'current').innerHTML = currenttime;
		},
		supply: function supply(str) {
			if (str.toString().length > 1) {
				return str;
			} else {
				return '0' + str;
			}
		}
	};
	LowAudio.prototype['tpl'] = function (id, data) {

		var html = '<div class="low-audio-box">' + '<div class="inner-box">' + '<audio src="' + data.dataSrc + '" id="' + id + '"></audio>' + '<div class="inner-property">' + '<div class="pro pro-volume">' + '<i class="iconfont icon-yinliang-copy"></i>' + '</div>' + '<div class="pro pro-progress">' + '<div class="pause"><i class="iconfont icon-bofanganniu"></i><i class="iconfont icon-anniuguanbi"></i></div>' + '<div class="progress">' + '<div class="runing"></div>' + '<div class="timer"><em class="current">00:00</em>/<em class="duration">00:00</em></div>' + '</div>';
		'</div>' + '</div>' + '</div>' + '</div>';
		return html;
	};

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
	exports.push([module.id, "html,\nbody {\n  font-family: Helvetica Neue, Helvetica, STHeiTi, Arial, sans-serif;\n  font-size: .18rem;\n  line-height: 1.5;\n  -webkit-font-smoothing: antialiased;\n  background: #f0f1f3;\n}\n* {\n  margin: 0;\n  padding: 0;\n}\n.container {\n  max-width: 750px;\n  min-width: 320px;\n  margin: 0 auto;\n  overflow: hidden;\n}\n.low-audio-box .inner-box {\n  margin: auto;\n  background-color: #252525;\n  border: 0.15rem solid #10101a;\n  border-radius: 0.04rem;\n  overflow: hidden;\n}\n.low-audio-box .inner-box .inner-tv {\n  position: relative;\n  width: 100%;\n  height: 85%;\n}\n.low-audio-box .inner-box .inner-tv .play-tv {\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  margin-left: -51px;\n  margin-top: -31px;\n  width: 100px;\n  height: 60px;\n  border-radius: 6px;\n  border: 1px solid #3B3B3B;\n  background: -webkit-linear-gradient(top, #282828 0%, #202020 50%, #151515 100%);\n  background: linear-gradient(top, #282828 0%, #202020 50%, #151515 100%);\n  cursor: pointer;\n}\n.low-audio-box .inner-box .inner-tv .play-tv:after {\n  content: \" \";\n  display: block;\n  margin-left: 41px;\n  margin-top: 16px;\n  width: 0;\n  height: 0;\n  border-top: 14px solid transparent;\n  border-bottom: 14px solid transparent;\n  border-left: 24px solid #fff;\n}\n.low-audio-box .inner-box .inner-property {\n  width: 100%;\n  overflow: hidden;\n}\n.low-audio-box .inner-box .inner-property .pro {\n  float: left;\n  border-radius: 2px;\n  border: 1px solid #3B3B3B;\n  background: -webkit-linear-gradient(top, #282828 0%, #202020 50%, #151515 100%);\n  background: -moz-linear-gradient(top, #282828 0%, #202020 50%, #151515 100%);\n  background: linear-gradient(top, #282828 0%, #202020 50%, #151515 100%);\n}\n.low-audio-box .inner-box .inner-property .pro-volume {\n  position: relative;\n  width: 0.8rem;\n  height: 0.8rem;\n  text-align: center;\n  line-height: 0.8rem;\n  cursor: pointer;\n}\n.low-audio-box .inner-box .inner-property .pro-volume .controller {\n  position: absolute;\n  left: 0px;\n  top: -102px;\n  width: 50px;\n  height: 100px;\n  background: -webkit-linear-gradient(top, #282828 0%, #202020 50%, #151515 100%);\n  background: -moz-linear-gradient(top, #282828 0%, #202020 50%, #151515 100%);\n  background: linear-gradient(top, #282828 0%, #202020 50%, #151515 100%);\n  border-left: 1px solid #3B3B3B;\n  border-top: 1px solid #3B3B3B;\n  border-right: 1px solid #3B3B3B;\n}\n.low-audio-box .inner-box .inner-property .pro-volume .bar {\n  margin: auto;\n  margin-top: 10%;\n  width: 5px;\n  height: 90%;\n  border-radius: 2px;\n  background-color: #fff;\n}\n.low-audio-box .inner-box .inner-property .pro-progress {\n  width: 6.32rem;\n  height: 0.8rem;\n  overflow: hidden;\n}\n.low-audio-box .inner-box .inner-property .pro-progress .pause {\n  position: relative;\n  float: left;\n  width: 0.8rem;\n  height: 0.8rem;\n  text-align: center;\n  line-height: 0.8rem;\n  cursor: pointer;\n}\n.low-audio-box .inner-box .inner-property .pro-progress .pause .icon-bofanganniu {\n  display: block;\n  font-size: 0.28rem;\n  color: #fff;\n}\n.low-audio-box .inner-box .inner-property .pro-progress .pause .icon-anniuguanbi {\n  display: none;\n}\n.low-audio-box .inner-box .inner-property .pro-progress .play {\n  position: relative;\n  float: left;\n  width: 0.8rem;\n  height: 0.8rem;\n  text-align: center;\n  line-height: 0.8rem;\n  cursor: pointer;\n}\n.low-audio-box .inner-box .inner-property .pro-progress .play .icon-bofanganniu {\n  display: none;\n}\n.low-audio-box .inner-box .inner-property .pro-progress .play .icon-anniuguanbi {\n  display: block;\n  font-size: 0.32rem;\n  color: #fff;\n}\n.low-audio-box .inner-box .inner-property .pro-progress .progress {\n  float: right;\n  position: relative;\n  margin-right: 0.2rem;\n  margin-top: 0.3rem;\n  width: 5.3rem;\n  height: 0.2rem;\n  background: #474747;\n  border-radius: 2px;\n}\n.low-audio-box .inner-box .inner-property .pro-progress .progress .runing {\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 0%;\n  height: 100%;\n  background: #55EFF9;\n  border-radius: 2px;\n}\n.low-audio-box .inner-box .inner-property .pro-progress .timer {\n  position: absolute;\n  right: 0.05rem;\n  bottom: -0.32rem;\n  font-size: 0.22rem;\n  color: #999;\n}\n.low-audio-box .inner-box .inner-property .icon-yinliang-copy {\n  display: block;\n  font-size: 0.36rem;\n  color: #fff;\n}\n", ""]);

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


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(8);

	var _index = __webpack_require__(10);

	var _index2 = _interopRequireDefault(_index);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*
	 * @name LowSwiper 轮播图片/内容组件
	 * @param {object} opts 插件的参数设置
	 *
	*/
	function LowSwiper(opts) {

	    this.options = {
	        el: '#swiperContainer', //默认选择顶级父元素
	        autoPlay: false, //是否开启自动滚动 默认：false
	        timeForAuto: 3500, //滚动元素自动循环的间隔时间
	        timeForAnimate: 300, //滚动元素的滚动效果执行时间
	        pagination: true, //是否显示小圆圈 默认是true
	        initialSlider: 0, //默认显示的元素
	        ratio: 0.4, //滑动的距离比例才进行运动
	        isEnd: false, //是否是滚动到最后一个元素
	        nextButton: '', //下一个按钮
	        prevButton: '', //上一个按钮
	        onTouchEnd: null //一个不知道用处的回调函数
	    };
	    this.iCurrent = 0; //屏幕元素默认为第一个 0
	    this.oPosition = {}; //触摸点位置
	    this.startX = 0; //触摸点位置 x
	    this.startY = 0; //触摸点位置 y
	    this.iLeft = 0; //滑动元素原始位置
	    this.left3D = 0; //记录已经translated3d的距离
	    //初始化相关操作属性
	    this.attrW, this.attrL, this.totleWidth, this.timer, this.pagination;

	    //相关类名
	    this.swiperItem = '.swiper-item'; //滚动元素

	    //$.extend(this.options,opts); //默认信息合并
	    this.$ele = _index2.default.$(this.options.el); //对象索引
	    this.oMover = _index2.default.findFirst(this.$ele, '.swiper-wrap'); //运动的盒子
	    var _this = this;

	    this.autoPlay = this.options.autoPlay;

	    //判断是否存在图片
	    this.attrL = _index2.default.findAll(this.oMover, this.swiperItem).length;
	    if (this.attrL) {
	        this.attrW = this.$ele.clientWidth;
	        this.totleWidth = this.attrW * this.attrL;
	        _index2.default.setCss(this.oMover, {
	            width: _this.totleWidth,
	            transform: 'translate3d(0px,0px,0px)'
	        });

	        var swipers = _index2.default.findAll(this.oMover, this.swiperItem);
	        //设置 图片 的默认属性
	        for (var i = 0; i < this.attrL; i++) {
	            _index2.default.setCss(swipers[i], {
	                width: _this.attrW,
	                left: _this.attrW * i
	            });
	        }

	        // 轮播小圆圈
	        this.pagination = _index2.default.findAll(this.$ele, '.paging-bullet');
	        if (this.options.pagination) {
	            if (this.pagination.length) {
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
	        if (_this.autoPlay) _this.autoRuning();
	    }

	    if (_this.oMover) {
	        this.oMover.addEventListener('touchstart', _this.startFunc.bind(_this), false);
	        this.oMover.addEventListener('touchmove', _this.moveFunc.bind(_this), false);
	        this.oMover.addEventListener('touchend', _this.endFunc.bind(_this), false);
	    }
	};
	//手势之按下触摸
	LowSwiper.prototype.startFunc = function (e) {
	    clearInterval(this.timer);
	    this.touchPos(e);
	    this.startX = this.oPosition.x;
	    this.startY = this.oPosition.y;
	    this.iLeft = this.oMover.offsetLeft;
	};
	//手势之获取手势点位置
	LowSwiper.prototype.touchPos = function (e) {
	    var touches, targetX, targetY;
	    touches = e.changedTouches;
	    targetX = touches[0].clientX;
	    targetY = touches[0].clientY;
	    this.oPosition.x = targetX;
	    this.oPosition.y = targetY;
	};
	//手势之按下抬起
	LowSwiper.prototype.endFunc = function (e) {
	    this.touchPos(e);
	    var _disX = this.oPosition.x - this.startX;
	    var _disY = this.oPosition.y - this.startY;
	    if (Math.abs(_disY) < Math.abs(_disX)) {
	        var ratio = Math.abs(_disX) / this.attrW;
	        if (ratio >= this.options.ratio) {
	            if (_disX < 0) {
	                //向右滑动
	                this.iCurrent++;
	                if (this.iCurrent < this.attrL && this.iCurrent >= 0) {
	                    this.animating(this.autoRuning);
	                } else {
	                    this.iCurrent = this.attrL - 1;
	                    this.animating(this.autoRuning);
	                }
	            } else {
	                //向左滑动
	                this.iCurrent--;
	                if (this.iCurrent < 0) {
	                    this.iCurrent = 0;
	                    this.animating(this.autoRuning);
	                } else {
	                    this.animating(this.autoRuning);
	                }
	            }
	        } else {
	            this.animating(this.autoRuning);
	        }
	    }
	};
	//手势之按下滑动
	LowSwiper.prototype.moveFunc = function (e) {
	    var _this = this;
	    this.touchPos(e);
	    var _moveX = _this.oPosition.x - _this.startX;
	    var _moveY = _this.oPosition.y - _this.startY;
	    if (Math.abs(_moveY) < Math.abs(_moveX)) {
	        e.preventDefault();
	        if (this.left3D) {
	            var left = this.left3D + this.iLeft + _moveX;
	        } else {
	            var left = this.iLeft + _moveX;
	        }
	        _index2.default.setCss(this.oMover, {
	            transform: 'translate3d(' + left + 'px,0px,0px)'
	        });
	    }
	};
	//自动滚动
	LowSwiper.prototype.autoRuning = function (_this) {
	    var _this = _this || this;
	    _this.timer && clearInterval(_this.timer);
	    _this.timer = setInterval(function () {
	        _this.iCurrent = _this.iCurrent >= _this.attrL - 1 ? 0 : _this.iCurrent + 1;
	        _this.animating();
	    }, _this.options.timeForAuto);
	};
	//运动函数
	LowSwiper.prototype.animating = function (fn) {
	    var _this = this;
	    this.left3D = -(this.attrW * this.iCurrent);
	    _index2.default.setCss(this.oMover, {
	        transform: 'translate3d(' + this.left3D + 'px,0px,0px)',
	        transitionDuration: '600ms'
	    });
	    setTimeout(function () {
	        _index2.default.setCss(_this.oMover, {
	            transitionDuration: '0ms'
	        });
	        fn && fn(_this);
	    }, 600);
	    if (this.options.pagination) {
	        var oPaginer = this.pagination;
	        _index2.default.raClass(oPaginer, 'bullet-active', this.iCurrent);
	    }
	    if (typeof this.options.onTouchEnd === 'function') {
	        this.activeIndex = this.iCurrent;
	        this.options.onTouchEnd(this);
	    }
	};
	//滑动向哪一个元素
	LowSwiper.prototype.slideTo = function (index) {
	    this.iCurrent = Number(index);
	    this.timer && clearInterval(this.timer);
	    this.animating(this.autoRuning);
	};

	module.exports = LowSwiper;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(9);
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
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(5)();
	// imports


	// module
	exports.push([module.id, ".swiper-container {\n  position: relative;\n}\n.swiper-container img {\n  vertical-align: top;\n}\n.swiper-container .swiper-wrap {\n  position: relative;\n  height: 2.3rem;\n  -webkit-transition-property: -webkit-transform;\n  transition-property: transform;\n}\n.swiper-container .swiper-item {\n  position: absolute;\n  left: 0;\n  top: 0;\n}\n.swiper-container .swiper-item img {\n  display: block;\n  width: 100%;\n}\n.swiper-container .paging {\n  position: absolute;\n  width: auto;\n  right: 0.05rem;\n  bottom: 0.05rem;\n}\n.swiper-container .paging .paging-bullet {\n  display: inline-block;\n  margin-right: 0.1rem;\n  width: 0.16rem;\n  height: 0.16rem;\n  opacity: 0.8;\n  border-radius: 50%;\n  background: #fff;\n}\n.swiper-container .paging .bullet-active {\n  background: rgba(0, 0, 0, 0.5);\n}\n", ""]);

	// exports


/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/**
	 * @description 常用工具函数
	 *
	 *
	*/
	var Tools = {

		/*获取id 、 class 对应的 dom*/
		$: function $(ele) {
			return ele.indexOf('#') > -1 ? document.getElementById(ele.replace('#', '')) : document.querySelectorAll(ele);
		},
		/*获取第一个子元素*/
		findFirst: function findFirst(parent, name) {
			return parent.querySelectorAll(name)[0];
		},
		/*获取所有子元素*/
		findAll: function findAll(parent, name) {
			return parent.querySelectorAll(name);
		},
		/*先全局删除后添加单个class类*/
		raClass: function raClass(dom, name, index) {
			for (var i = 0, l = dom.length; i < l; i++) {
				var _class = dom[i].className;
				if (_class.indexOf(name) > -1) {
					dom[i].className = _class.replace(name, '').replace(/(^\s*)|(\s*$)/g, "");
				}
			}
			dom[index].className += ' ' + name;
		},
		/*给元素设置样式*/
		setCore: function setCore(dom, style) {
			if (dom.setAttribute) {
				if (dom.getAttribute('style')) {
					var styleArr = style.split(';');
					styleArr.map(function (style) {
						if (style) {
							var style = style.split(':');
							dom.style[style[0]] = style[1];
						}
					});
				} else {
					dom.setAttribute("style", style);
				}
			} else {
				dom.style.cssText = style;
			}
		},
		setCss: function setCss(dom, css) {
			var style = '';
			if ((typeof css === 'undefined' ? 'undefined' : _typeof(css)) === 'object') {
				Object.keys(css).forEach(function (attr) {
					var ext = attr == 'width' || attr == 'height' || attr == 'left' ? 'px;' : ';';
					style += attr + ':' + css[attr] + ext;
				});
			} else if (typeof css === 'string') {
				style = css;
			}
			var isArr = dom.length;
			if (isArr) {
				for (var i = 0; i < isArr; i++) {
					this.setCore(dom[i], style);
				}
			} else {
				this.setCore(dom, style);
			}
		}
	};

	module.exports = Tools;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(12);

	var _index = __webpack_require__(10);

	var _index2 = _interopRequireDefault(_index);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function Gyrate() {

		this.rotateX = -25;
		this.rotateY = 25;

		this.startX = 0;
		this.startY = 0;

		this.oPosition = {};

		this.ele = _index2.default.$('#gyrate3d');

		//3D正方体
		var spin = _index2.default.findFirst(this.ele, '.spin');

		var _this = this;
		setTimeout(function () {
			_index2.default.setCss(spin, {
				transform: 'rotateX(' + _this.rotateX + 'deg) rotateY(' + _this.rotateY + 'deg)'
			});
		}, 500);

		this.ele.addEventListener('touchstart', this.start.bind(this), false);
		this.ele.addEventListener('touchmove', this.move.bind(this, spin), false);
		this.ele.addEventListener('touchend', this.end.bind(this), false);
	}
	Gyrate.prototype.touchPos = function (e) {
		var touches, targetX, targetY;
		touches = e.changedTouches;
		targetX = touches[0].clientX;
		targetY = touches[0].clientY;
		this.oPosition.x = targetX;
		this.oPosition.y = targetY;
	};
	Gyrate.prototype.start = function (e) {
		this.touchPos(e);
		this.startX = this.oPosition.x;
		this.startY = this.oPosition.y;
	};
	Gyrate.prototype.move = function (spin, e) {
		this.touchPos(e);
		var left = this.oPosition.x - this.startX;
		var top = this.oPosition.y - this.startY;
		console.log(top);
		if (left < 0 && top < 0) {
			left = left + this.rotateY;
			top = Math.abs(top) + this.rotateX;
			this.rotateY = left;
			this.rotateX = top;
			_index2.default.setCss(spin, {
				transform: 'rotateX(' + top + 'deg) rotateY(' + left + 'deg)'
			});
		}
		if (left < 0 && top > 0) {
			left = left + this.rotateY;
			top = -top + this.rotateX;
			this.rotateY = left;
			this.rotateX = top;
			_index2.default.setCss(spin, {
				transform: 'rotateX(' + top + 'deg) rotateY(' + left + 'deg)'
			});
		}

		if (left > 0 && top < 0) {
			left = left + this.rotateY;
			top = Math.abs(top) + this.rotateX;
			this.rotateY = left;
			this.rotateX = top;
			_index2.default.setCss(spin, {
				transform: 'rotateX(' + top + 'deg) rotateY(' + left + 'deg)'
			});
		}

		if (left > 0 && top > 0) {
			left = left + this.rotateY;
			top = -top + this.rotateX;
			this.rotateY = left;
			this.rotateX = top;
			_index2.default.setCss(spin, {
				transform: 'rotateX(' + top + 'deg) rotateY(' + left + 'deg)'
			});
		}
	};
	Gyrate.prototype.end = function () {
		//console.log(this)
	};
	new Gyrate();
	module.exports = Gyrate;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(13);
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
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(5)();
	// imports


	// module
	exports.push([module.id, ".gyrate-3d {\n  perspective: 1000px;\n  width: 3.6rem;\n  height: 3.6rem;\n  margin: 1.5rem auto;\n}\n.gyrate-3d .spin {\n  position: relative;\n  width: 100%;\n  height: 100%;\n  transform-style: preserve-3d;\n  -webkit-transition: all 0.5s;\n  transition: all 0.5s;\n  -webkit-transform: translate3d(0, 0, 0);\n  transform: translate3d(0, 0, 0);\n}\n.gyrate-3d .spin .img-face {\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n}\n.gyrate-3d .spin .font-face {\n  transform: translate3d(0, 0, 1.8rem);\n}\n.gyrate-3d .spin .top-face {\n  transform: rotateX(90deg) translate3d(0, 0, 1.8rem);\n}\n.gyrate-3d .spin .bottom-face {\n  transform: rotateX(-90deg) translate3d(0, 0, 1.8rem);\n}\n.gyrate-3d .spin .left-face {\n  transform: rotateY(-90deg) translate3d(0, 0, 1.8rem);\n}\n.gyrate-3d .spin .right-face {\n  transform: rotateY(90deg) translate3d(0, 0, 1.8rem);\n}\n.gyrate-3d .spin .back-face {\n  transform: rotateX(180deg) translate3d(0, 0, 1.8rem);\n}\n.gyrate-3d .spin img {\n  width: 100%;\n  height: 100%;\n}\n", ""]);

	// exports


/***/ }
/******/ ]);