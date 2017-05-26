//模块化
define(function() {
	return {
		// 获取一个100-1000的随机整数数
		randomNum: function(min, max) {
			return parseInt(Math.random() * (max - min + 1)) + min;
		},
		randomColor: function() {
			var r = randomNum(0, 255);
			var g = randomNum(0, 255);
			var b = randomNum(0, 255);

			return 'rgb(' + r + ',' + g + ',' + b + ')';
		},
		/**
		 * [过滤文本节点，得到元素节点]
		 */
		getEle: function(nodes) {
			var res = [];
			for(var i = 0; i < nodes.length; i++) {
				// 通过节点类型去判断
				if(nodes[i].nodeType === 1) {
					res.push(nodes[i]);
				}
			}

			return res;
		},
		prevEle: function(node) {
			// 获取前一个节点（但可能是文本节点）
			var prev = node;

			// 判断是否为第一个元素
			do {
				prev = prev.previousSibling;
			} while (prev && prev.nodeType != 1 && prev != node.parentNode.firstChild);

			return prev;
		},
		nextEle: function(node) {
			var next = node.nextSibling;

			while(nex.nodeType != 1) {
				next = next.nextSibling;
			}

			return next;
		},
		getCss: function(ele, attr) {
			// 高级浏览器写法
				if(window.getComputedStyle) {
				return getComputedStyle(ele)[attr];
			}

			// IE8-
			else if(ele.currentStyle) {
				return ele.currentStyle[attr];
			}

			// 如果两者都不支持，直接返回内联样式
			else {
				return ele.style[attr]
			}
		},
		/**
		 * [给元素添加事件的方法，兼容ie8-]
		 * @param {[DOM]} ele    [需要绑定事件的元素]
		 * @param {[String]} type   [事件类型]
		 * @param {[Function]} handle [事件处理函数]
		 * @param {[Boolean]} capture [是否捕获]
		 */
		addEvent: function(ele, type, handle, capture) {
			// 标准浏览器
			if(ele.addEventListener) {
				ele.addEventListener(type, handle, capture);
			}

			// IE8-
			else if(ele.attachEvent) {
				ele.attachEvent('on' + type, handle);
			}

			// 如果以上两种都不支持，则使用传统事件绑定方式
			else {
				ele['on' + type] = handle
			}
		},
		/**
		 * [设置cookie]
		 * @param {[String]} name    [cookie名]
		 * @param {[String]} val     [cookie值]
		 * @param {[Date]} expires 	 [cookie有效期]
		 * @param {[String]} path    [cookie保存路径]
		 */
		setCookie: function(name, val, expires, path) {
			var str = name + '=' + val;

			if(expires) {
				str += ';expires=' + expires;
			}

			if(path) {
				str += ';path=' + path;
			}

			document.cookie = str;
		},
		getCookie: function(name) {
			// 得到所有的cookie
			var cookies = document.cookie;

			var res = '';

			if(cookies.length) {
				cookies = cookies.split('; ');
				cookies.forEach(function(item) {
					var arr = item.split('=');
					if(arr[0] === name) {
						res = arr[1];
					}
				})
			}

			return res;
		},
		removeCookie: function(name) {
			var now = new Date();
			now.setDate(now.getDate() - 7);

			// setCookie(name,null,now);
			document.cookie = name + '=null;expires=' + now;
		},
		/**
		 * [动画函数]
		 * @param  {[Element]}   ele      [动画元素]
		 * @param  {[String]}   attr     [动画css属性名]
		 * @param  {[Number]}   target   [动画的目标值]
		 * @param  {Function} callback 	 [回调函数：当前动画完成后再调用的函数]
		 */
		animate: function(ele, options, callback) {
			// 记录属性个数
			var timerLen = 0;

			// 遍历options对象
			// 为每个属性设置定时器
			for(var attr in options) {
				timerLen++;
				createTimer(attr);
			}

			function createTimer(attr) {
				// 把timer跟DOM节点绑定
				// 用属性区分不同的timer
				var timerName = attr + 'timer';
				clearInterval(ele[timerName]);

				// 获取目标值
				var target = options[attr]; //0.5

				ele[timerName] = setInterval(function() {
					// 获取当前值
					var current = getCss(ele, attr); //10px,5em,8rem,30deg,1

					// 提取单位
					var unit = current.match(/[a-z]+$/i);

					// unit为null时，单位为空字符串
					unit = unit ? unit[0] : '';

					// 去掉单位，以便计算
					current = parseFloat(current);

					// 根据当前值和目标值计算速度
					var speed = (current - target) / 10;

					if(attr === 'opacity') {
						// 透明度速度
						speed = speed > 0 ? 0.05 : -0.05;
						// speed = Number(speed.toFixed(2));
					} else {
						speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
					}

					// 当到达目标值时，清除定时器
					if(current == target) {
						clearInterval(ele[timerName]);

						current = target + speed;

						// 每一个定时器完成timerLen减一
						timerLen--;

						// 执行回调函数
						// 最后一个动画完成时才执行回调函数
						if(typeof callback === 'function' && timerLen === 0) {
							callback();
						}
					}

					// 不断改变ele的attr属性
					ele.style[attr] = current - speed + unit;
				}, 30);
			}

		},
		ajax: function(options) {
			var defaults = {
				type: 'get',
				async: true
			}

			// 覆盖默认参数
			// var opt = Object.assign({},defaults,options);
			for(var attr in options) {
				defaults[attr] = options[attr];
			}

			var opt = defaults;

			var xhr = null;
			try {
				xhr = new XMLHttpRequest();
			} catch(error) {
				try {
					xhr = new ActiveXObject("Msxml2.XMLHTTP");
				} catch(err) {
					try {
						xhr = new ActiveXObject("Microsoft.XMLHTTP");
					} catch(e) {
						alert('你的浏览器太low了，赶紧换google浏览');
					}
				}
			}

			//处理参数
			//?pageNo=1&qty=10
			var params = '';
			if(opt.data) {
				for(var attr in opt.data) {
					params += attr + '=' + opt.data[attr] + '&';
				}

				// 去重最后一个&
				params = params.slice(0, -1);
			}

			if(opt.type === 'get') {
				opt.url += '?' + params;
				params = null;
			}

			// 处理数据
			xhr.onreadystatechange = function() {
				if(xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 304)) {
					//[{}],'yes'
					var res;
					try {
						// 如果接口返回的数据不符合json字符串格式，则原样返回
						res = JSON.parse(xhr.responseText);
					} catch(error) {
						res = xhr.responseText;
					}

					// if(typeof opt.success === 'function'){
					// 	opt.success(res);
					// }
					typeof opt.success === 'function' && opt.success(res);
				}
			}

			xhr.open(opt.type, opt.url, opt.async);

			// 设置post请求的content-type请求头，以便后端获取post数据
			if(opt.type === 'post') {
				xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
			}

			xhr.send(params);
		},
		type: function(data) {
			// data.toString();
			// Object.prototype.toString(data)
			var res = Object.prototype.toString.call(data);
			res = res.slice(8, -1).toLowerCase();

			return res;
		}
	}
})