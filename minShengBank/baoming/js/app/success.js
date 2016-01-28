require.config({
	paths: {
		"global": "../../global",
		"core": "../common.core",
		"user": "user"
	},
	shim: {

	}
});
require(['global', "core","user"], function(g, core,u) {
	var params = core.getUrlRequest();
	var Verification = function(){
		if (params == null) {
			top.location.href = "index.html";
			return;
		}
		if (params.id == null) {
			top.location.href = "index.html";
			return;
		}
	}
	Verification();

	
	//获取订单信息
	var InitOrder = function() {
		core.getJSONPCache(g.urlHttp + 'jxbmx/GetOrderByOrderId', {
			orderid: params.id
		}, function(data) {
			core.result(data, function(data) {
				var template = '<p>订单编号：<span>{Orderid}</span></p><p>订单名称：<span>{ProductName}</span></p><p>订单金额：<span>{Money}</span></p>';
				if (data.data.Result.ZFLX == 0) {
					//在线支付
					if (data.data.Result.Ddzt == 12) {
						$('.zhifuchenggong').text('订单支付成功');
						$('title').text('订单支付成功');
					} else{
						$('.zhifuchenggong').text('订单支付失败');
						$('title').text('订单支付失败');
					}
				}
				else if(data.data.Result.ZFLX == 1){
					//上门
					$('.zhifuchenggong').text('报名成功');
					$('title').text('报名成功');
				}
				else if(data.data.Result.ZFLX == null||data.Date.Result.ZFLX == undefined){
					//不支持在线报名
					$('.zhifuchenggong').text('报名成功');
					$('title').text('报名成功');
				}
				else{
					//qt
				}
				$(".dingdanxinxi").html(template.format(data.data.Result));
			});
		});
		
		//后退按钮
		//后退按钮
		var back = $('.backOff i');
		back.on('click',function(){
			window.location = 'index.html';
		})
		
	};
	InitOrder();
	
})