require.config({
	// baseUrl:'lib'//data-main文件所在的文件夹
	paths : {
		//这里的路径基于baseUrl
        "jquery": "../lib/jquery-3.1.1",
        "gdszoom":"../lib/jquery-gdszoom/jquery.gdszoom"
    },


    shim:{
    	// 表示gdszoom依赖jquery
    	"gdszoom":["jquery"]
    }
})