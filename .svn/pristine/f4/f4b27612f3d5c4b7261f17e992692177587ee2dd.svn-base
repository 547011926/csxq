require.config({
	paths: {
		"core": "../common.core"
	},
	shim: {

	}
});
define(["core"], function(core) {
	
var check= {
    operation: function (oArticle) {
	        document.getElementsByTagName("article")[0].onclick=function () {
	            window.location.href="yuyue.html";
	        };
	        document.getElementsByTagName("aside")[0].onclick=function () {
	            window.location.href="baoming/index.html";
	        };
	    },
    GetUserInfo:function(){
    	//document.write(window.location.href);
    	//var pars = core.GetUrlRequest();
    	//alert(window.location.href);
//		if (pars != null) {
//			//document.write(pars.param);
////			document.write(pars.param);
////			alert(pars.param);
////			alert(pars.telephone);
////			alert(core.base64decode(pars.param));
//		}
    },
    init: function () {
        this.operation();
        this.GetUserInfo();
    }

}
		
	
	check.init();

	//暂时测试用
	
    var ss = function(){
    	var p = core.GetUrlRequest();
    	//document.write(window.location.href);
    	if(p == null){
    		return;
    	}
//	  	alert(p.param);
	    var u = 'http://jptest3.xuechebu.com/api/log/WriteLog';
	    core.getJSONPCache(u, {txt:window.location.href}, function (data) {
	        
	    })
    }();
    //暂时测试用


});



