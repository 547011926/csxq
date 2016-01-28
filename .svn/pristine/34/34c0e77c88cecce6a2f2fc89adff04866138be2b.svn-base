require.config({
	paths: {
		"global": "../../global",
		"core": "../common.core"
	}
});
require(['global', "core"], function(g, core) {
	var params = core.getUrlRequest();
	if (params == null)
		top.location.href = "index.html";
	var getJXJJ = function() {
		var url = g.urlHttp_file + "FileData/" + params.jgid + "/jxjj.json";
		core.getJSONCache(url, {}, function(data) {
			var jxjjpic=data[0].JXJJPIC.split(",");
			var html=[];
			for (var i=0;i<jxjjpic.length;i++) {
				if(jxjjpic[i]=="")
				continue;
				html.push("<div class='swiper-slide'><img data-src='"+jxjjpic[i]+"' class='swiper-lazy'><div class='swiper-lazy-preloader swiper-lazy-preloader-white'></div></div>")
			}
			$("#div_jxjjpic").html(html.join(""));
			$("#jiaxiaoInfo").html(data[0].JJ.replace(/zs_kg;/g,"&nbsp;") );
//			Initialize Swiper
			var swiper = new Swiper('.swiper-container', {
			        pagination: '.swiper-pagination',
			        // Disable preloading of all images
			        preloadImages: true,
			        // Enable lazy loading
			        lazyLoading: true,
			        autoplay: 5000
			    });
		})
	}


	//初始化方法
	var init = function() {
		getJXJJ();
	};
	init();
});


