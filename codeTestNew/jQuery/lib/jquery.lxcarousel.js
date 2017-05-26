/*
	编写jquery插件就是给jquery的原型对象添加方法
	jquery.lxcarousel.js
 */
;(function($){
	// $.prototype.lxcarousel = function(options){
	$.fn.lxcarousel = function(options){
		// 这里的this为jquery对象（实例）
		console.log(options);

		var defaults = {
			width:810,
			height:320,

			// 滚动间隔时间
			duration:3000,

			// 当前索引值（默认0）
			index:0,
		}


		// 使用this.each()迭代元素,为了实现多个调用
		this.each(function(){
			// jquery扩展对象$.extend()
			// var opt = Object.assign({},defaults,options);
			var opt = $.extend({},defaults,options);

			var $self = $(this);
			var $ul

			init();

			// 
			function init(){
				//设置样式
				$self.addClass('carousel');
				$self.css({width:opt.width,height:opt.height})

				$ul = $('<ul/>');
				$ul.html(opt.imgs.map(function(item){
					return `<li><img src="${item}"></li>`
				}).join(''));

				// $ul.appendTo($self)
				$self.append($ul);


				// 轮播
				setInterval(function(){
					opt.index++;
					showPic();
				},opt.duration)
			}


			function showPic(){
				if(opt.index > opt.imgs.length-1){
					opt.index = 0;
				}else if(opt.index < 0){
					opt.index = opt.imgs.length-1
				}
				$ul.animate({top:-opt.index*opt.height})
			}
		});

		return this;
	}

	// 如果同时添加多个插件，使用
	// $.fn.extend()
	/*$.fn.extend({
		lxcarousel:function(){},
		lxtabs:function(){}
	})*/
})(jQuery);
