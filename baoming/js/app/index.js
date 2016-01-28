require.config({
	paths: {
		"global": "../../global",
		"core": "../common.core"
	}
});
require(['global', "core"], function(g, core) {
	//var str = "appName:{0}\r\nappVersion:{1}\r\nappCodeName:{2}\r\nuserAgent:{3}";
	//alert(str.format(navigator.appName, navigator.appVersion, navigator.appCodeName, navigator.userAgent));

	//获取驾校列表
	var getJXList = function() {
		var url = g.urlHttp + 'Phone/GetJxList';
		var data = {
			pageSize: 200,
			pageIndex: 1
		};

		core.getJSONPCache(url, data, function(data) {
			core.result(data, function(data) {
				var list = data.data.Result;
				core.getJSONPCache(g.urlHttp + 'BMTSFW/GetTSFWList', {}, function(data) {
					core.result(data, function(data) {
						var template = '<a href="jiaxiao.html?jgid={JGID}&yhjg={jg}"><div class="index-list" ><div class="drivingImg">{M_JXFMPIC}</div> <div class="driving"> <h1><span>{JXNAME}</span><strong>{YHJG}</strong></h1> <p>{JXDZ}</p> <div class="image">{TSFWID}</div> </div></div>';

						var html = [];
						for (var i = 0; i < list.length; i++) {
							var item = list[i];
							item.M_JXFMPIC = item.M_JXFMPIC == null ? "" : ('<img src="{0}">').format(item.M_JXFMPIC);
							item.jg = item.YHJG;
							item.YHJG = item.YHJG == null ? "暂无" : "￥" + item.YHJG + "元 ↑";
							//添加特色服务
							var tsfws = [];
							for (var j = 0; j < data.data.length; j++) {
								var tsfw = data.data[j];
								var img = '<img src="{0}">';
								if (item.TSFWID != null && item.TSFWID.indexOf(tsfw.ID) > -1)
									tsfws.push(img.format(tsfw.M_KTIMG));
								else
									tsfws.push(img.format(tsfw.M_WKTIMG));
							}
							item.TSFWID = tsfws.join('');
							html.push(template.format(item));
						};
						$("#jxlist").html(html.join(''));
					})
				});
			})
		});
	};

	//初始化方法
	var init = function() {


		//隱藏統計
		$('#tjIcon').hide();

		getJXList();

	};
	init();
});