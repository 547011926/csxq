require.config({
	paths: {
		"global": "../../global",
		"core": "../common.core",
		"xqvalidate": "../lib/xqvalidate",
		"user": "user"
	},
	shim: {
		
	}
});
require(['global', "core", "user", "xqvalidate"], function(g, core, u, xqvalidate) {
	//user.appsign();
	//alert(window.location.href);
	var jgid = "";
	var params = core.getUrlRequest();
	if(params == null){
		core.goBack('index.html');
		return;
	}
	
	if(params.id == null){
		core.goBack('index.html');
		return;
	}
	
	//alert(u.checklogin());
	
	var list = null;
	if (u.checklogin()) {
		list = u.getuserinfo();
		//将登陆用户id写入隐藏域
		$('#CJRID').val(list.Id);
	}
	else{
		alert('对不起，您未登录');
		//history.back();
		core.goBack('index.html');
		return;
	}
	
	//将班型id写入隐藏域
	$('#BXID').val(params.id);		
	
	//判断是否为报名返回页面
	if(params.isPass != null || params.isPass != undefined){
		if(params.isPass == 1){
			//报名成功
			if (params.zflx == 1) {
				//在线支付
				window.location = 'zhifufangshi.html?gonext=no&id=' + params.orderid;
			}
			else if(params.zflx == 2){
				//上门支付
				//alert(decodeURI(params.msg));
				window.location = 'success.html?gonext=no&id=' + params.orderid;
			}
			else{
				//不支持付款方式
//				alert(decodeURI(params.msg));	
				window.location = 'success.html?gonext=no&id=' + params.orderid;
			}
		}
		else if(params.isPass == 0){
			alert(decodeURI(params.msg));
		}
		else{
			alert(decodeURI(params.msg));
		}
	}
	

	var baoMingModel = function() {
			var url = g.urlHttp + "JXBMX/GetBXJGListById";
			core.getJSONPCache(url, {
				Id: params.id
			}, function(data) {
				core.result(data, function(data) {
					jgid = data.data.Result.JGID;
					var baoMing = $("#baoming"),
						baoMingXiangQing = '<p>{JXNAME}<span>{BXMC}</span></p><p>￥{YHJG}</p><p>优惠活动<span>{YHHD}</span></p>',
						baomingBox = $('#baomingBox')
						//fixend = "<div id='dingdanjine'><span>订单金额</span><strong>{YHJG}</strong><a href='javascript:;' class='tijiao' id='btn_commit'>提交订单</a></div>";
					data.data.Result.YHHD = data.data.Result.YHHD == null ? '' : data.data.Result.YHHD;
					baoMing.html(baoMingXiangQing.format(data.data.Result));
					//baomingBox.append(fixend.format(data.data.Result));
					//如果驾校不支持在线报名则隐藏付款
					if(data.data.Result.TSFWID.indexOf('1') == -1){
						$('#ZFLX').remove();
						$('#zhifu').remove();
					}
					else{
						$('#zhifu').css('display','block');
						$('.xieyi').css('display','block');
					}
					//判断是否存在优惠活动来控制推荐人
					if (data.data.Result.YHHD != '' && data.data.Result.YHHD != null&&data.data.Result.YHHD != undefined) {
						$('#tuijianren').css('display','block');
					}					
					
					$('#orderMoney').text(data.data.Result.YHJG);
					
					//记录jgid；
					//jgid = data.data.Result.JGID;
				})
			});
			var selected = function(obj) {
					$(obj).parent().find("em").removeClass("cur");
					$(obj).addClass('cur');
				},
				baominginfo = {
                    bmcl: "<h1>一、个人资料</h1><h2>1、身份证</h2><h3>(1)身份证复原件（包括有效期内临时身份证）</h3><h3>(2)身份证复印件（签名）电子版</h3><img src='images/01.jpg'><span>注意事项：</span><p>需在右下角签名</p><p>正反面在一张A4纸上</p><p>复印件应1:1比例,有清楚的边框与底纹</p><h2>2、照片：一寸白底免冠彩色证件6张（如下图）</h2> <p>驾驶证申请人本人6个月内的正面免冠彩色单人半身小一寸照片</p><p>驾驶证照片尺寸：照片大小为3.2cm*2.2cm，头部长度1.9cm-2.2cm；头部宽度1.4cm-1.6cm，白色背景</p><p>不能穿着制式服装照相，并且相片清晰可见，神态自然</p><p><strong>拍摄地点及注意事项：</strong>车管所或者外面持有正规营业执照的照相馆。如在外照相馆拍照，在拍照时只需要跟照相馆说明“你要拍考驾照的相片”，照相馆自会按规格执行。只需要按照相馆指示拍摄完毕即可。</p><img src='images/02.jpg'><h2>3、非京户籍暂住证（或工作证）原件</h2><p>暂住证示意图或工作居住证示意图</p><img src='images/zzza.jpg'><img src='images/zzzb.jpg'><img src='images/jzza.jpg'><img src='images/jzzb.jpg'><h1>体验证明原件</h1><h2>二、《机动车驾驶人身体体检证明》示意图</h2><img src='images/05.jpg'>",
					bmtj: "<h1>年龄规定：</h1><p>申请小型汽车、小型自动挡汽车、残疾人专用小型自动挡载客汽车、轻便摩托车准驾车型的，在18周岁以上，70周岁；</p><h1>身体条件：</h1><p>身高：申请小型客车准驾车型的，身高为 145CM 以上，申请大型客车准驾车型的，身高为 155CM 以上；</p><p>视力：两眼裸视或矫正视力达到对数表 5.0以上；申请小客车，两眼裸视或矫正视力达到对数表 4.9 以上;</p><p>辨色力：无红绿色盲；</p><p>听力：两耳分别距音叉50厘米能辨别声源方向。有听力障碍但佩戴助听设备能够达到以上条件的，可以申请小型汽车、小型自动挡汽车准驾车型的机动车驾驶证；</p><p>上肢：双手拇指健全，每只手其他手指必须有三指健全，肢体和手指运动功能正常。但手指末节残缺或者右手拇指缺失的，可以申请小型汽车、小型自动挡汽车准驾车型的机动车驾驶证；</p><p>下肢：双下肢健全且运动功能正常，不等长度不得大于5厘米。但左下肢缺失或者丧失运动功能的，可以申请小型自动挡汽车准驾车型的机动车驾驶证。右下肢、双下肢缺失或者丧失运动功能但能够自主坐立的，可以申请残疾人专用小型自动挡载客汽车准驾车型的机动车驾驶证；</p><p>躯干、颈部：无运动功能障碍；</p><h1>证件要求：</h1><p>提交白色背景真面免冠一寸彩色照片？ 张。本人戴眼镜照片也应戴眼镜；</p><p>提交身份证件（居民身份证），外省市人员还应提交暂住证或居住证（有效期限一年以上）；</p><h1>老年人报名学车：</h1><p>按国家规定60周岁至69周岁零10个月年龄段的老年人可以报名学车，但按我校规定，必须报考老年班。老年人体检需到指定的 119 家医疗机构，报名时将体检表一并带到驾校。</p><h1>肢障人报名：</h1><p>按国家规定 肢障人员可以申领驾驶证，体检需到指定的 122 家医疗机构。</p>"
				};
			(function() {
				$("#hukou em").on("touchstart", function() {
					selected(this);
					//将户口类型写入隐藏域
					$('#HKLX').val($(this).attr('data-val'));
				})
				$("#zhifu em").on("touchstart", function() {
					selected(this);
					//将支付类型写入隐藏域
					$('#ZFLX').val($(this).attr('data-val'));
				});
				$(".baomingxuanxiang em").on("touchstart", function() {
					if (this.innerHTML == "报名条件") {
						//var height=document.body.scrollTop+"100%"+"px";
                        //console.log(height);
						core.createClose(baominginfo.bmtj, "100%", "100%");
					} else if (this.innerHTML == "报名材料") {
						core.createClose(baominginfo.bmcl, "100%", "100%");
					}
				});
				
				//获取协议
				var IsGetxieyi = false;
				var xieyiContent = '';
				$('#xieyiCentent').click(function(){
					
					if (!IsGetxieyi && xieyiContent == '') {
						if (jgid==null||jgid=='') {
							alert('对不起，程序未响应，请稍后再试');
							return;
						}
						url=g.urlHttp + "Agreement/GetAgreementByJgidAndCode";
						core.getJSONPCache(url, {jgid: jgid,code:"xcbbmxy"},function(data){
							core.result(data, function(data) {
								if(data.data.Result == null){
									return;
								}
								xieyiContent = data.data.Result.CONTENT;
								IsGetxieyi = true;
								core.createClose(data.data.Result.CONTENT, "100%", "100%");
							});
						});
					} else{
						core.createClose(xieyiContent, "100%", "100%");
					}
					
				});
			})(Zepto);
		}
		/*var xieyi=(function () {
		 var url=g.urlHttp + "Agreement/GetAgreementByJgidAndCode";
		 core.getJSONPCache(url, {jgid: jgid,code:"bmxy"}, function (data) {
		 console.log(data.Result.jgid);
		 })
		 //http://jptest3.xuechebu.com/Agreement/GetAgreementByJgidAndCode?code=bmxy&jgid=0
		 })();*/

	//入口函数
	var init = function() {
		//隱藏統計
		$('#tjIcon').hide();
		
		baoMingModel();
		var url = window.location.href;
		var index = url.indexOf("login=1");
//		if(u.checklogin() == true && index > -1){
//			var lefturl = url.substr(0,index);
//			var righturl = url.substr(index+7,url.length-index-8);
//			//alert(lefturl + righturl);
//		}
	};
	init();

	var ValidateForm = function(){
		//将默认选中的户口类型和支付类型写入隐藏域
		$("#hukou em").each(function(){
			if($(this).hasClass('cur')){
				$('#HKLX').val($(this).attr('data-val'));
			}
		});
		$("#zhifu em").each(function(){
			if($(this).hasClass('cur')){
				$('#ZFLX').val($(this).attr('data-val'));
			}
		});
		
		selectPapers();
		$('#textName').xqValidate(validatePrompt.xx_name, validateFunction.xxnameFunc, "");
		//$('#textSfzh').xqValidate(validatePrompt.xx_sfzh, validateFunction.xxSfzhFunc, "");	
		$('#textTel').xqValidate(validatePrompt.xx_tel, validateFunction.xxTelFunc, "");
		
		$('#textTelephone').xqValidate(validatePrompt.xx_telphone, validateFunction.xxTelphoneFunc, "");
		$('#textReferralCode').xqValidate(validatePrompt.xx_referralCode, validateFunction.xxReferralCodeFunc, "");
		$('#textTel').val(list.phoneNum);
	}
	ValidateForm();
	
	$('#selPapers').on('change',function(){
		selectPapers();
	})
	
	
	
	//提交表单 报名
	$('#btn_commit').on('click',function(){
		
		if ($('#ClientCode').val() != 1) {
			alert('出现错误，请刷新重试');
			return;
		}
		if ($('#BXID').val() == null|| $('#BXID').val() == undefined) {
			alert('对不起，班型出现错误，请稍后重试');
			return;
		}
		if ($('#HKLX').val() == null|| $('#HKLX').val() == undefined) {
			alert('对不起，户口类型出现错误，请稍后重试');
			return;
		}
		if ($('#CJRID').val() == null||$('#CJRID').val() == undefined) {
			alert('对不起，您未登录');
			history.go(-1);
			return;
		}
//		if ($('#ZFLX').val() == null|| $('#ZFLX').val() == undefined) {
//			alert('对不起，支付类型出现错误，请稍后重试');
//		}
		
		
		
		$('#textName').xqValidate(validatePrompt.xx_name, validateFunction.xxnameFunc, true);
		$('#textTel').xqValidate(validatePrompt.xx_tel, validateFunction.xxTelFunc, true);
		var v = $('#selPapers').val();
		if (v == 1) {
			$('#textSfzh').xqValidate(validatePrompt.xx_sfzh, validateFunction.xxSfzhFunc, true);			
		} else{
			$('#textSfzh').xqValidate(validatePrompt.xx_jgz, validateFunction.xxJgzFunc, true);				
		}
			
		$('#textTelephone').xqValidate(validatePrompt.xx_telphone, validateFunction.xxTelphoneFunc, true);
		$('#textReferralCode').xqValidate(validatePrompt.xx_referralCode, validateFunction.xxReferralCodeFunc, true);
		var isPass = false;
		isPass = validateFunction.FORM_submit(['#textName', '#textSfzh', '#textTel','#textTelephone','#textReferralCode']);


		if(isPass){
		    if (!$('#xieyi').is(":checked")){
				alert('请阅读并同意《三方代收代付协议》');
				return;
			}
			
			$('#fm').attr('action', g.urlHttp + 'JXBMX/AddBmxx');
			//$('#fm').attr('action', 'http://testxcbapi.xuechebu.com/JXBMX/AddBmxx');
			if (confirm('是否确认提交？')) {
				$('#fm').submit();	
			}
			
		}
	});
	
	
	$(document).scroll(function() {
		$('.mask').css('top',document.body.scrollTop+"px");		
	});
	
	
	
})

function selectPapers(){
	var v = $('#selPapers').val();
	if (v == 1) {
		$('#textSfzh').xqValidate(validatePrompt.xx_sfzh, validateFunction.xxSfzhFunc, "");		
	} 
	else if(v == 2){
		$('#textSfzh').xqValidate(validatePrompt.xx_jgz, validateFunction.xxJgzFunc, "");
	}
}
