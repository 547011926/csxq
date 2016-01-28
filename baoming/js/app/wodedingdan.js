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
	
	if (!u.checklogin()) {
		alert('对不起，您未登录');
		window.location = 'index.html';
		return;
	}
	
	
	var list = 	u.getuserinfo();
	
	var InitOrder = function() {
		core.getJSONPCache(g.urlHttp + 'GRZXDD/GetGRZXDDList', {
			userid: list.Id
		}, function(data) {
			core.result(data, function(data) {
				var template = '<div class="wodedingdan"><div class="title"><time>{CREATEDATE}</time><p>订单号<strong>{ORDERID}</strong></p></div><div class="xiangqing"><h1>班型参数</h1><p>驾校名称：<span>{JGMC}</span></p><p>驾照类型：<span>{JZLX}</span></p><p>训练车型：<span>{XLCX}</span></p><p>训练时间：<span>{XLSJ}</span></p><p>约车形式：<span>{YCXS}</span></p><p>教练分配：<span>{JLFP}</span></p><h1>订单参数</h1><p>班型价格：<span>{JG}</span></p><p>优惠活动：<span>{YHHD}</span></p><h1>报名信息</h1><p>姓名：<span>{BMR}</span></p><p>户口类型：<span>{HKLX}</span></p><p>证件类型：<span>{ZJLX}</span></p><p>证件号码：<span>{ZJHM}</span></p><hr /><p>订单金额：<span>{MONEY}元</span></p><p>支付方式：<span>{ZFLX}</span></p><p>订单状态：<span>{DDZTMC}</span></p>{btn}</div></div>';
				var htmls = [];
				for (var i = 0; i < data.data.length; i++) {
					var item = data.data[i];
					item.JZLX = item.JZLX == null?'学校安排':item.JZLX;
				 	item.XLCX = item.XLCX == null?'学校安排':item.XLCX;
					item.HKLX = item.HKLX == '1'?'本地':'外阜';
					item.ZJLX = item.ZJLX == '1'?'身份证':'军官证';
					item.YHHD = item.YHHD == null?'':item.YHHD;
					
					if (item.ZFLX == '0' && item.DDZT == '11') {
						
						item.btn = '<a href="zhifufangshi.html?id=' + item.ORDERID+'">立即支付</a>';
					}
					else{
						item.btn = '';
					}

					
					if(item.ZFLX == '1'){
						item.ZFLX = '上门支付';
					}
					else if(item.ZFLX == '0'){
						item.ZFLX = '在线支付';
					}else if(item.ZFLX == '' || item.ZFLX == null){
						item.ZFLX = ' ';
					}
					htmls.push(template.format(item));
				}
				$("body").html(htmls.join(''));

			});
		});
	};
	InitOrder();
})