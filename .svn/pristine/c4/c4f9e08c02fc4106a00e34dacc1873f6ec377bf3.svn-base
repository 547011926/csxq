require.config({
	paths: {
		"global": "../../global",
		"core": "../common.core"
	}
});
require(['global', "core"], function(g, core) {
	var params = core.getUrlRequest();
	var html = [];
	var bcxlfunc = function(data, i) {
		var zdurl = g.urlHttp_file + "FileData/" + params.jgid + "/jxbcxl/" + data[i].XLID + ".json";
		core.getJSONCache(zdurl, {}, function(zddata) {
			html.push("<div class='wrap luxian'><h2>" + data[i].XLMC + "</h2><p>");
			for (var j = 0; j < zddata.length; j++) {
				html.push("<span>【" + zddata[j].ZDMC + "】<b>&rarr;</b></span>");
			}
			html.push("</p></div>");
			i++;
			if (i < data.length)
				bcxlfunc(data, i);
			$('body').html(html.join(""));
		})
	}

	var getBCXL = function() {
		var url = g.urlHttp_file + "FileData/" + params.jgid + "/jxbcxl.json";
		//驾校班车线路
		core.getJSONCache(url, {}, function(data) {
			if (data != null)
				bcxlfunc(data, 0);
		})
	}

	//初始化方法
	var init = function() {
		getBCXL();
	};
	init();

});