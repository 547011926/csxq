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
						var template = '<a href="banxingjiage.html?jgid={JGID}"><div class="index-list" ><div class="drivingImg">{M_JXFMPIC}</div> <div class="driving"> <h1><span>{JXNAME}</span><strong>{YHJG}</strong></h1> <p>{JXDZ}</p> <div class="image">{TSFWID}</div> </div></div>';

						var html = [];
						for (var i = 0; i < list.length; i++) {
							var item = list[i];
							item.M_JXFMPIC = item.M_JXFMPIC == null ? "" : ('<img src="{0}">').format(item.M_JXFMPIC);
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
		var back = $('.backOff i');
		back.on('click',function(){
			window.location = '../index.html';
		});
		
		
		
		//隱藏統計
		$('#tjIcon').hide();
		
		getJXList();
		
	};
	init();

//	var str = 'AcgEAACAAB5ETrdgys8Hd/ins70zWeiga4UAMKxANftAFlA0xTZJW7XB03W/zEXLAv+mXVYk2IqZbZC/siyjPRnm1fbjUZLwxztUMScPbUoZmlh+b64ls3tLHpeI/0xaX0SEwG3WeFTyXhKF5UHdrz0FRjzyIvH14tLfzcG2H5BUNM7Ea+uDtMlltebeNENtkERN5heaIV7mkh2m3wF1NrxcWMpOTPvh80ivqehI/ic01qY9dHiEMik5X/hQRXKv52Zy0dWhpvHThOkNmt7ARw+jkmgfSe964tP0qBqkqTgije5Y6RA4hv8dOWESmzoR+nMAHWbGHNpE28nU3UCnU6hcA5QxZ5ACPpr79w9AuIa0SETnMYqnjHwfGdNNF1o539CXqRVHxpg97Y3hYXcOsvHfTiw+0//1oTpGvLF5Sg2SpOF0aCs/DwUOBWue9U/4f9LWwUb+xLovo28dYnPXyHk3Z0uGEnRowBHTfncYR8QPNRUJv2XlZC0Won0qgWOnr2gjVgHYvvo4Ynmjbp/GyQE5MnZQCijWrJDc4TNqHueJS3tGssK2kB5xV1LCKWZoa4SJ4G+J2Ie4v50LlMB+WnllIkM+6Z2eUfUNjrDWk+b1CYK/PkLSY1OcyJRco1qhy90hNANzil1gvyiVVfK+w1QxDsxRIsl2IxIdeyNliDAVuUIt1w1qQZYELp/EdPFxNA6H8biUk0OySIytBALVKW12Jzq3NTYW4sxi3jr2FbBEUd7887nwZfQzKOwBdVYF/K4hb/4UlEvnBTzKj//AVDH/tvz2juW7lAw2AlzzWaQ4jbeZfl73ZBqcw89cybApD7Lp92dPjSj4QhHuxOkPFpnYvFhpYmlsA5+OS5hzMRBsHqSApkQN50TbH0BbBqjYGrLc/K/X3RVKQm16SFtbI8qINoH+6nUFvrZ7rcBeGIVD+/VgN3WENYiWtK9O2jC3HS3sZsj270SUceA0HRur66ZVayjPhC1GYiDwv+a51PgWyd43fR65xobLGmJgoAD32+nTNnXu9EbAJwXWA4v4daTBekIh8fWPucpLgtTroDj9B1+H6NxFnKYh0V18NovWn/pnbtQm2DVIAd3JYuzI8U8uWezFG91XHTamMAsNuKxsxhOeE+LRb6qjprSieyg9TZ4pHP2qjEaXUd+x1ePwBHLEPZoLYeEK+ZFa6lSW4cVGakkAeMgtuVkO/lde6q7L/qsjdb7LR+jFpwJS3dbbyijmOshFEyml6wyNpN4Wu8wWZfIcw2lggVZnp7GxkI04DNot/RchOVqGNibq47iZmX1qj1/UzG8+ED6XfnS47S/SzI3ScML5r1fDF+ZcX3x/l5t6plZx6pJ1/z2l3emDwL5bcEeYKI6+JggS5I6h20HcB02ToF9eROtngOAvbxUt7vZHDSBJfh+VeViT9ZPOisth2pzUURiRYiZLJd7gTK1RMzWQM2yKoeevEvJWKWBlrAavzw1ckfEzaykeIvrO90kI9zIHyYayfWAXoMtSBQqVoslUuElBZvFWrkuD0kKJzKw3hjKPcqGMEMrmSuou48omIXSgmJoCrYyRJIoEKJmCmIqve45i1h9Bp7L2UIuVK/YLR2r9riVD/6Zqzkhv0pRjJ9EgZmhegdSRbD0A1W5/S+IY2eI39isIWPRkDa1CcRng994bZtZR8zSq+RZ6o0k1jdrGllMD7QT1MPepKfFgI1krVSbLky5CWZTOwX3nOuy/8mdf9JGMVhydMS9yS8t1UJcpB514iCANgljiOm079TB/gzzb0UWvnqNLmyKXexd0kHUSw9PMb18bEhNA';

//	submitOrderForCash(str);


//	g.urlHttp = 'http://testxcbapi.xuechebu.com/';
//	core.getJSONPCache(g.urlHttp + 'pay/testMinsheng', {}, function(data) {
//		core.result(data, function(data) {
//			var r = data.data.Result;
//			alert(r);
//			document.write(r);
//		});
//	});

	$('#btnzz').on('click',function(){
		submitForm($('#orderInfo').val());
	})


	function submitForm(orderinfo){
        var params = "";
        var toUrl = "http://220.194.27.54:7007/ecshopMerchantTest/shopPage3.jsp";
        var beforeUrl = "http://220.194.27.54:7007/ecshopMerchantTest/shopPage2.jsp";
        loginForComm(beforeUrl, toUrl);
        submitOrderForCash(orderinfo);
    }
	
});




