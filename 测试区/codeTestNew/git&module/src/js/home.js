
require.confit({
	//baseUrl:'lib' //data-main文件所在文件夹
	paths:{
		"jquery":"../lib/jquery-3.1.1",
		"gdszoom":"../lib/jquery-gdszoom/jquery.gdszoom"
	}
})

//首页

// 利用require引用其他js
// js/
// js/lib/jquery-3.1.1

require(['jquery','common','list'],function($,com){
	console.log($);
	console.log(com);
	com.randomNum();
	console.log('home.js')
})


// baseUrl:js/
// * 不添加后缀名
// * 不使用绝对路径
require(['config'],function(){
	// 这里不能保证jquery,gdszoom,common的加载顺序
	require(['jquery','common'],function(){
		console.log('首页')
	});
});

