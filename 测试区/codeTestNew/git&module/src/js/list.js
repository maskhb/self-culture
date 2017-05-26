//列表
//console.log('list');

/*require(['config'],function(){
	require(['jquery'],function($){

	});
});*/
require(['config'],function(){
	require(['jquery','common'],function(jq,com,gds){
		console.log(jq,com,gds);
		console.log(com.randomNum());
	});
});


