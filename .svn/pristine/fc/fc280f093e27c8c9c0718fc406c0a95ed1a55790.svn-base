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
	if (params == null) {
		top.location.href = "index.html";
		return;
	}
	if (params.id == null) {
		top.location.href = "index.html";
		return;
	}
	if (!u.checklogin()) {
		alert('对不起，您未登录');
		window.location = 'index.html';
		return;
	}
	
	$('#orid').val(params.id);
	//获取订单信息
	var InitOrder = function() {
		core.getJSONPCache(g.urlHttp + 'jxbmx/GetOrderByOrderId', {orderid: params.id}, function(data) {
			core.result(data, function(data) {
				var template = '<p>订单编号：<span>{Orderid}</span></p><p>订单名称：<span>{ProductName}</span></p><p>订单金额：<span id="dingdanjine">{Money}</span></p><p>支付金额：<span id="zhifujine">{ZFJE}</span></p><p>限时优惠手续费立减<span id="youhuijine"></span></p><p>(截至2016-1-31)</p>';
				data.data.Result.ZFJE = data.data.Result.Sxf+ data.data.Result.Money;
				$(".dingdanxinxi").html(template.format(data.data.Result));
			});
			
			InitPayWay();
		});
	};
	//获取支付方式
	var InitPayWay = function() {
		core.getJSONPCache(g.urlHttp + 'pay/GetPayTypeList', {jgid: 0,orderid:params.id}, function(data) {
			core.result(data, function(data) {
				var template = '<dl><dt><img src="{imgSrc}"><p><strong>{title}</strong>{SXF}</p><em data-val={type} data-money={Money} class="{defaultElect}"></em></dt></dl>';

				var htmls = [];
				for (var i = 0; i < data.data.length; i++) {
					var item = data.data[i];
					item.SXF = (item.SXF==null?'0':item.SXF).replace(/([0-9]+.[0-9]{2})[0-9]*/,'$1'); 
					if (item.type == 8) {
						item.title = '支付宝';
						item.imgSrc = 'images/zhifubao.png';
						item.defaultElect = '';
						
						if(item.SFSQSXF == 0){
							item.Money = item.SXF;
							item.SXF = '手续费：'+(item.SXF) + '元';
							
						}
						else{
							item.SXF = '';
							item.Money = 0;
						}
						//默认选中样式
						item.defaultElect = 'cur';
						//在默认选中的支付方式加上
					 	var dModey = $('#dingdanjine').text();
					 	//联动显示支付金额---暂时注释
						//ChangeMoney(item.Money,dModey);
						ChangeMoney(item.Money,dModey);
					}
//					else if(item.type == 1){
//						item.title = '支付宝2';
//						item.imgSrc = 'images/zhifubao.png';
//						if(item.SFSQSXF == 0){
//							item.Money = item.SXF;
//							item.SXF = '手续费：'+(item.SXF) + '元';
//						}
//						else{
//							item.SXF = '';
//							item.Money = 0;
//						}
//					}
					else{
						continue;
					}			
					htmls.push(template.format(item));
				}
				$(".zhifuxuanze").html(htmls.join(''));
				
				var selected = function(obj) {
					$('em').each(function(){
						$(this).removeClass('cur');
					});
					$(obj).addClass('cur');
					
					
					//联动显示支付金额---暂时注释
					//根据不同的支付方式来修改支付金额
					//获取手续费
					var sMoney = $(obj).attr('data-money');
				 	//获取支付金额
				 	var dModey = $('#dingdanjine').text();
					//ChangeMoney(sMoney,dModey);
					ChangeMoney(sMoney,dModey);
				};
				
				(function() {
					$("em").on("click", function() {
						selected(this);
					})

				})(Zepto);
				
				
			});
		});
	};
	InitOrder();
	//InitPayWay();
	
	$('#btn_pay').on('click',function(){
		$("em").each(function(){
			if($(this).hasClass('cur')){
				if ($(this).attr('data-val') != "5") {
		            window.location = g.urlHttp + "Pay/PayClick?orderid=" + $("#orid").val() + "&type=" + $(this).attr('data-val');
		                
		        }
			}
		});
	})
	
	//根据支付方式联动金额
	var ChangeMoney = function (sMoney,dModey){
		//将加上手续费的数字加到订单金额中
		//获取手续费
		//var sMoney = $(obj).attr('data-money');
	 	//获取支付金额
	 	//var dModey = $('#dingdanjine').text();
		//设置支付金额
		//$('#zhifujine').text((+sMoney)+(+dModey));
		
		//$('#youhuijine').text((+sMoney)+(+dModey));
		$('#youhuijine').text(sMoney);
	}

	
	

})