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
	$('.protocol_xfx').on('tap', function() {
		$('.choosesafe').hide();
		var pageii = layer.open({
			type: 1,
			content: $('.xfxProxy').html(),
			style: 'width:100%; height:100%; border:none;',
	
		});
		$('body').scrollTop(0);
		$('.protocolBtn').on('tap', function() {
			layer.close(pageii);
			$("#xfxTk").attr("checked", "checked");
			$('.choosesafe').show();
			$('#xfxTkSm').text('已阅读')
		});
	});
	$('.protocol_ywx').on('tap', function() {
		$('.choosesafe').hide();
		$('.ywxInfo *').each(function() {
			$(this).removeAttr('style');
		})
		var content = $('.ywxInfo').html();
		var pageiii = layer.open({
			type: 1,
			content: content,
			style: 'width:100%; height:100%; border:none;',
	
		});
		$('body').scrollTop(0);
		$('.protocolBtn').on('tap', function() {
			layer.close(pageiii);
			$("#ywxTk").attr("checked", "checked");
			$('.choosesafe').show();
			$('#ywxTkSm').text('已阅读')
		});
	});

    //获取驾校信息
    var GetJX = function () {
        //var apiurl = urlHttp_user + 'school/GetSchoolList';
        var apiurl = g.urlHttp + 'JXDB/GetJgList';
        core.getJSONPCache(apiurl, {},function (data) {
        	core.result(data, function(data) {
	            var v = data.data.Result;
	            console.log(v)
	            var html = "<option value=''>请选择</option>";
	            for (var i = 0; i < v.length; i++) {
	                html += "<option value='" + v[i].JGID + "'>" + v[i].JXNAME + "</option>";
	            }
	            $("#selJX").html(html);
	        });
        });
    };
    GetJX();
    //btn同上
    $('#btnCopy').unbind('click').click(function () {
        if ($(this).prop("checked")) {
            $('#txtBTBR').val($('#txtTBR').val());
            $('#txtBTBRAddress').val($('#txtTBRAddress').val());
            $('#txtBTBRHandset').val($('#txtTBRHandset').val());
            $('#txtBTBREmail').val($('#txtTBREmail').val());
            $("#selBTBRZJType").val($("#selTBRZJType").val());
            $("#selBTBRZJType").change();
            $("#txtBTBRZJ").val($("#txtTBRZJ").val());
        }
    });
    //学费险checkbox保持单选
    $("#xfx50").unbind('click').click(function () {
        if ($("#xfx50").prop("checked") && $("#xfx100").prop("checked")) {
            //$("#xfx100").removeAttr("checked");
            $("#xfx100").prop("checked",false);
        }
    });
    $("#xfx100").unbind('click').click(function () {
        if ($("#xfx50").prop("checked") && $("#xfx100").prop("checked")) {
            //$("#xfx50").removeAttr("checked");
            $("#xfx50").prop("checked",false);
        }
    });

    //初始化验证信息 
    $('#txtTBR').xqValidate(validatePrompt.bx_name, validateFunction.xxnameFunc, "");
    $('#txtTBRAddress').xqValidate(validatePrompt.bx_address, validateFunction.defalutnull, "");
    $('#txtTBRHandset').xqValidate(validatePrompt.phone, validateFunction.mobileCode, "");
    $('#txtTBREmail').xqValidate(validatePrompt.email, validateFunction.email, "");
    $('#selTBRZJType').xqValidate(validatePrompt.bx_zjlx, validateFunction.checkSelectGroup, "");
    $("#selTBRZJType").unbind('change').change(function () {
        switch ($(this).val()) {
            case "1"://身份证
                $("#txtTBRZJ").xqValidate(validatePrompt.bx_zj, validateFunction.sfzh, "");
                break;
            case "3"://驾驶证
                $("#txtTBRZJ").xqValidate(validatePrompt.bx_zj, validateFunction.sfzh, "");
                break;
            default:
                $("#txtTBRZJ").xqValidate(validatePrompt.bx_zj, validateFunction.defalutnull, "");
                break;
        }
    });
    $('#txtBTBR').xqValidate(validatePrompt.bx_name, validateFunction.xxnameFunc, "");
    $('#txtBTBRAddress').xqValidate(validatePrompt.bx_address, validateFunction.defalutnull, "");
    $('#txtBTBRHandset').xqValidate(validatePrompt.phone, validateFunction.mobileCode, "");
    $('#txtBTBREmail').xqValidate(validatePrompt.email, validateFunction.email, "");
    $('#selBTBRZJType').xqValidate(validatePrompt.bx_zjlx, validateFunction.checkSelectGroup, "");
    $("#selBTBRZJType").unbind('change').change(function () {
        switch ($(this).val()) {
            case "1"://身份证
                $("#txtBTBRZJ").xqValidate(validatePrompt.bx_zj, validateFunction.sfzh, "");
                break;
            case "3"://驾驶证
                $("#txtBTBRZJ").xqValidate(validatePrompt.bx_zj, validateFunction.sfzh, "");
                break;
            default:
                $("#txtBTBRZJ").xqValidate(validatePrompt.bx_zj, validateFunction.defalutnull, "");
                break;
        }
    });
    $('#selJX').xqValidate(validatePrompt.bx_jx, validateFunction.checkSelectGroup, "");
    $('#txtBMF').xqValidate(validatePrompt.bx_bmf, validateFunction.money, "");
    //初始化验证信息 end

    //btn保存
    $("#btnBXSave").unbind('click').click(function () {
       
        var passed = false;
        $('#txtTBR').xqValidate(validatePrompt.bx_name, validateFunction.xxnameFunc, true);
        $('#txtTBRAddress').xqValidate(validatePrompt.bx_address, validateFunction.defalutnull, true);
        $('#txtTBRHandset').xqValidate(validatePrompt.phone, validateFunction.mobileCode, true);
        $('#txtTBREmail').xqValidate(validatePrompt.email, validateFunction.email, true);
        $('#selTBRZJType').xqValidate(validatePrompt.bx_zjlx, validateFunction.checkSelectGroup, true);
        switch ($("#selTBRZJType").val()) {
            case "1"://身份证
                $("#txtTBRZJ").xqValidate(validatePrompt.bx_zj, validateFunction.sfzh, true);
                break;
            case "3"://驾驶证
                $("#txtTBRZJ").xqValidate(validatePrompt.bx_zj, validateFunction.sfzh, true);
                break;
            default:
                $("#txtTBRZJ").xqValidate(validatePrompt.bx_zj, validateFunction.defalutnull, true);
                break;
        }
        $('#txtBTBR').xqValidate(validatePrompt.bx_name, validateFunction.xxnameFunc, true);
        $('#txtBTBRAddress').xqValidate(validatePrompt.bx_address, validateFunction.defalutnull, true);
        $('#txtBTBRHandset').xqValidate(validatePrompt.phone, validateFunction.mobileCode, true);
        $('#txtBTBREmail').xqValidate(validatePrompt.email, validateFunction.email, true);
        $('#selBTBRZJType').xqValidate(validatePrompt.bx_zjlx, validateFunction.checkSelectGroup, true);
        switch ($("#selBTBRZJType").val()) {
            case "1"://身份证
                $("#txtBTBRZJ").xqValidate(validatePrompt.bx_zj, validateFunction.sfzh, true);
                break;
            case "3"://驾驶证
                $("#txtBTBRZJ").xqValidate(validatePrompt.bx_zj, validateFunction.sfzh, true);
                break;
            default:
                $("#txtBTBRZJ").xqValidate(validatePrompt.bx_zj, validateFunction.defalutnull, true);
                break;
        }
        $('#selJX').xqValidate(validatePrompt.bx_jx, validateFunction.checkSelectGroup, true);
        passed = validateFunction.FORM_submit(["#txtTBR", "#txtTBRAddress", "#txtTBRHandset"
            , "#txtTBREmail", "#selTBRZJType", "#txtTBRZJ"
            , "#txtBTBR", "#txtBTBRAddress", "#txtBTBRHandset", "#txtBTBREmail"
            , "#selBTBRZJType", "#txtBTBRZJ", "#selJX"]);
            
            
             
        if (!passed) {
            return false;
        }
        if ($('input[name="XFX"]:checked').length <= 0 && $('input[name="YWX"]:checked').length <= 0) {
            ShowMessageDialog("至少选择一种类型的保险业务!");
            return false;
        }
        if ($('input[name="XFX"]:checked').length > 0) {
            if (!$("#xfxTk").prop("checked")) {
                ShowMessageDialog("请阅读‘学费险’保险条款并同意!");
                return false;
            }
            if ($("#txtBMF").val() == "") {
                ShowMessageDialog("您选择了‘学费险’，请填写您的报名学费!");
                return false;
            } else {
                $('#txtBMF').xqValidate(validatePrompt.bx_bmf, validateFunction.money, true);
                if (!validateFunction.FORM_submit(["#txtBMF"])) {
                    return false;
                }
            }
            
        }
        if ($('input[name="YWX"]:checked').length > 0 && !$("#ywxTk").prop("checked")) {
            ShowMessageDialog("请阅读‘意外险’保险条款并同意!");
            return false;
        }
        
        //提交订单        
        //g.urlHttp = 'http://testxcbapi.xuechebu.com/';
        var data=$('#form_bx').serialize();
        
        
        core.getJSONPCache(g.urlHttp + 'BXYW/AddTBXX?',{data,JGMC: $("#selJX").val()},function(data){
        	if (data.code == 0) {
                $("#btnBXSave").css('display', 'none');
                $("#btnPay").attr('href', '/baominginfo-pay.html?orderid=' + data.data.orderId + "&money=" + data.data.money).css('display', 'block');
                window.open('/baominginfo-pay.html?orderid=' + data.data.orderId + "&money=" + data.data.money);
            } else {
                ShowMessageDialog(data.message);
            }
        })
        
        
//      $.getJSONPCache(g.urlHttp + 'BXYW/AddTBXX?' + $('#form_bx').serialize(), { JGMC: $("#selJX").find("option:selected").text() }, (new Check()).result(function (data) {
//          if (data.code == 0) {
//              $("#btnBXSave").css('display', 'none');
//              $("#btnPay").attr('href', '/baominginfo-pay.html?orderid=' + data.data.orderId + "&money=" + data.data.money).css('display', 'block');
//              window.open('/baominginfo-pay.html?orderid=' + data.data.orderId + "&money=" + data.data.money);
//          } else {
//              ShowMessageDialog(data.message);
//          }
//      }))


    });


	//content内容  callback回调函数
	var ShowMessageDialog = function(content,callback){
		//.layermmain,.laymshade
		if (callback == null) {
			layer.closeAll();
		}
		layer.open({
		    content: content,
		    style:"position:fixed;left:50%;top:50%;margin: -42px 0 0 -108px;",
		    btn: ['OK'],
		    yes:callback
		});
	}

    //保险条款相关
    
    $(".bxsm_xfx").unbind('click').click(function () {
    	$('.choosesafe').hide();
        var htmlStr = "<div class='protocolBox'><p class='protocolCon'>"
                    + "驾驶培训费用损失保险<br />"
                    + "<b>产品特点：</b>国内首创；解除学员后顾之忧；费用低廉<br />"
                    + "<b>保障人群：</b>年满十八至七十周岁，在驾校进行驾驶技术学习的学员<br />"
                    + "<b>保障范围：</b>学员参加机动车驾驶人考试，且考试不通过次数达到5次而导致已考试合格的其他科目成绩作废的，对于被保险人实际支付，且无法退回的驾驶培训费用<br />"
                    + "<b>责任免除：</b>详见条款<br />"
                    + "<b>保险期间：</b>从正式参保且保单生效日零时起至领取驾照日或准考证失效日二十四时止。<br />"
                    + "<b>责任限额及保险费：</b><br/>"
                    + "1.以实际支付学费为准，最高赔偿限额5000元，保险费50元<br />"
                    + "2.以实际支付学费为准，最高赔偿限额10000元，保险费100元"
                    + "</p><a href='javascript:;' class='closeBtn'>关闭</a></div>";
        var xfxLay = layer.open({
            type: 1,
            //area: ['700px', '500px'],
            //fix: true, //不固定
            //maxmin: false,
            //scrollbar: false,
            //title: '保险说明',
            content: htmlStr
        });
        
        $('.closeBtn').on('click',function(){
        	layer.close(xfxLay);
			$('.choosesafe').show();
        });
    });
    $(".bxsm_ywx").unbind('click').click(function () {
    	$('.choosesafe').hide();
        var htmlStr = "<div class='protocolBox'><p class='protocolCon'>"
            + "驾驶员培训学校意外综合保险<br />"
            + "<b>产品特点：</b>保障全面；保额充足；费用低廉；保期充分<br />"
            + "<b>保障人群：</b>年满十八至六十五周岁，持有中华人民共和国有效驾驶执照并在驾校进行驾驶技术教学的教练员或正规驾驶培训中心的学员。<br />"
            + "<b>保障范围：</b>学员在驾驶培训机构指定的训练场所及驾驶路线进行教学、学习、待训或考试过程中，或驾驶培训机构指定车辆在接、送被保险人途中，因遭受意外伤害事故导致身故、残疾及因遭受意外伤害，在中华人民共和国境内二级以上(含二级)或保险人认可的医疗机构进行治疗所支出的符合保险单签发地政府基本医疗保险管理规定的合理且必要的医疗费用，或在上述时间、地点因突发疾病并因该疾病直接导致被保险人自发病之时起24小时内身故的<br />"
            + "<b>责任免除：</b>详见条款<br />"
            + "<b>保险期间：</b>从正式参保且保单生效日零时起至领取驾照日或准考证失效日二十四时止。<br />"
            + "<b>责任限额：</b>意外伤害保险责任	    50万元<br />"
            + "<b>意外伤害医疗保险责任：</b>	10万元（每次事故每人医疗费用在扣除人民币100元免赔额后，在保险金额范围内，按90%的比例给付医疗保险金）<br />"
            + "<b>突发疾病身故保险责任：</b>	2万元<br />"
            + "<b>保险费：</b>50元/人"
            + "</p><a href='javascript:;' class='closeBtn'>关闭</a></div>";
        var ywxLay = layer.open({
            type: 1,
            //area: ['700px', '500px'],
            //fix: true, //不固定
            //maxmin: false,
            //scrollbar: false,
            //title: '保险说明',
            content: htmlStr
        });
        $('.closeBtn').on('click',function(){
        	layer.close(ywxLay);
			$('.choosesafe').show();
        });

    });
    /*
    $('.protocol_xfx').click(function () {
        var htmlStr = "<div class='protocolBox'><div class='protocolCon'>"
            + '<p style="margin-bottom:8px;text-align:center"><strong><span style=";font-family:宋体">安诚财产保险股份有限公司</span></strong></p><p style="margin-bottom:8px;text-align:center"><strong><span style=";font-family:宋体">驾驶培训费用损失保险条款</span></strong></p><p style="margin-bottom:8px;text-align:center"><strong><span style=";font-family:宋体">总则</span></strong></p><p style="margin-bottom:8px;text-indent:28px"><strong><span style=";font-family:宋体">第一条</span></strong><span style=";font-family:宋体"> 本保险合同由</span><span style=";font-family: 宋体;color:windowtext;text-underline:none">保险条款</span><span style=";font-family:宋体">、投保单、保险单、保险凭证以及批单等组成。凡涉及本保险合同的约定，均应采用书面形式。</span></p><p style="margin-bottom:8px;text-indent:28px;line-height:115%"><strong><span style=";line-height:115%;font-family:宋体">第二条 </span></strong><span style="line-height: 115%;font-family: 宋体">本保险合同的被保险人应为年满十八至七十周岁，</span><span style="line-height: 115%;font-family: 宋体">在驾校进行驾驶技术学习的</span><span style="line-height: 115%;font-family: 宋体">学员。超出此范围的被保险人经保险人认可，可以特约承保。</span></p><p style="margin-bottom:8px;text-align:center"><strong><span style=";font-family:宋体">保险责任</span></strong></p><p style="margin-bottom:8px;text-indent:28px"><strong><span style=";font-family:宋体">第三条</span></strong><span style=";font-family:宋体"> 保险期间内，被保险人参加机动车驾驶人考试，且考试不通过次数达到保险单载明次数而导致已考试合格的其他科目成绩作废的，对于被保险人实际支付，且无法退回的驾驶培训费用，保险人根据本保险合同的约定负责赔偿。</span></p><p style="margin-bottom:8px;text-align:center"><strong><span style=";font-family:宋体">责任免除</span></strong></p><p style="margin-bottom:8px;text-indent:28px"><strong><span style=";font-family:宋体">第四条 下列情形下，保险人不承担赔偿责任：</span></strong></p><p style="margin-bottom:8px"><strong><span style=";font-family:宋体">&nbsp;（一）投保人或被保险人的故意行为；</span></strong></p><p style="margin-bottom:8px"><strong><span style=";font-family:宋体">&nbsp;（二）被保险人的考试不通过次数未达到保险单载明次数的；</span></strong></p><p style="margin-bottom:8px"><strong><span style=";font-family:宋体">&nbsp;（三）因被保险人培训学时未达到国家规定要求而导致超过准考有效期的；</span></strong></p><p style="margin-bottom:8px"><strong><span style=";font-family:宋体">&nbsp;（四）免赔额或根据免赔率计算的免赔金额。</span></strong></p><p style="margin-bottom:8px;text-align:center"><strong><span style=";font-family:宋体">保险金额与免赔额（率）</span></strong></p><p style="margin-bottom:8px;text-indent:28px"><strong><span style=";font-family:宋体">第五条 </span></strong><span style=";font-family:宋体">本保险合同的保险金额由投保人在投保时与保险人协商确定，并在保险单中载明。</span></p><p style="margin-bottom:8px;text-indent:28px"><strong><span style=";font-family:宋体">第六条</span></strong><span style=";font-family:宋体"> 免赔额（率）由投保人与保险人在订立保险合同时协商确定，并在保险合同中载明。</span></p><p style="margin-bottom:8px;text-align:center"><strong><span style=";font-family:宋体">保险期间</span></strong></p><p style="margin-bottom:8px;text-indent:28px"><strong><span style=";font-family:宋体">第七条</span></strong><span style=";font-family:宋体"> 本保险合同保险期间由投保人和保险人协商确定并于保险单中载明。</span></p><p style="margin-bottom:8px;text-align:center"><strong><span style=";font-family:宋体">保险人义务</span></strong></p><p style="margin-bottom:8px;text-indent:28px"><strong><span style=";font-family:宋体">第八条</span></strong><span style=";font-family:宋体"> 本保险合同成立后，保险人应当及时向投保人签发保险单或其他保险凭证。</span></p><p style="margin-bottom:8px;text-indent:28px"><strong><span style=";font-family:宋体">第九条</span></strong><span style=";font-family:宋体"> 保险人按照第十三条的约定，认为被保险人提供的有关索赔的证明和资料不完整的，应当及时一次性通知投保人、被保险人补充提供。</span></p><p style="margin-bottom:8px;text-indent:28px"><strong><span style=";font-family:宋体">第十条</span></strong><span style=";font-family:宋体"> 保险人收到被保险人的给付保险金的请求后，应当及时作出是否属于保险责任的核定；情形复杂的，保险人将在确定是否属于保险责任的基本材料收集齐全后，尽快做出核定。</span></p><p style="margin-bottom:8px;text-indent:28px"><span style=";font-family:宋体">保险人应当将核定结果通知被保险人；对属于保险责任的，在与被保险人达成给付保险金的协议后十日内，履行赔偿保险金义务。保险合同对给付保险金的期限有约定的，保险人应当按照约定履行给付保险金的义务。保险人依照前款约定作出核定后，对不属于保险责任的，应当自作出核定之日起三日内向被保险人发出拒绝给付保险金通知书，并说明理由。</span></p><p style="margin-bottom:8px;text-indent:28px"><strong><span style=";font-family:宋体">第十一条</span></strong><span style=";font-family:宋体"> 保险人自收到给付保险金的请求和有关证明、资料之日起六十日内，对其给付的数额不能确定的，应当根据已有证明和资料可以确定的数额先予支付；保险人最终确定给付的数额后，应当支付相应的差额。</span></p><p style="margin-bottom:8px;text-align:center"><strong><span style=";font-family:宋体">投保人、被保险人义务</span></strong></p><p style="margin-bottom:8px;text-indent:28px"><strong><span style=";font-family:宋体">第十二条</span></strong><span style=";font-family:宋体"> 除另有约定外，投保人应当在保险合同成立时交清保险费。</span></p><p style="margin-bottom:8px;text-indent:28px"><strong><span style=";font-family:宋体">第十三条</span></strong><span style=";font-family:宋体"> 被保险人请求赔偿时，应向保险人提供下列证明和资料：</span></p><p style="margin-bottom:8px;text-indent:21px"><span style=";font-family:宋体">（一）</span><span style=";font-family: 宋体;color:windowtext;text-underline:none">保险单</span><span style=";font-family:宋体">或其他有效保险凭证；</span></p><p style="margin-bottom:8px;text-indent:21px"><span style=";font-family:宋体">（二）被保险人正确完整填写的索赔申请书；</span></p><p style="margin-bottom:8px;text-indent:21px"><span style=";font-family:宋体">（三）被保险人身份证明文件；</span></p><p style="margin-bottom:8px;text-indent:21px"><span style=";font-family:宋体">（四）车辆管理所出具的</span><span style=";font-family: 宋体;color:windowtext;text-underline:none">驾驶</span><span style=";font-family:宋体">人考试不通过的书面证明；</span></p><p style="margin-bottom:8px;text-indent:21px"><span style=";font-family:宋体">（五）</span><span style=";font-family: 宋体;color:windowtext;text-underline:none">驾驶培训</span><span style=";font-family:宋体">机构的培训合同复印件、以及培训费用票据；</span></p><p style="margin-bottom:8px;text-indent:21px"><span style=";font-family:宋体">（六）若被保险人委托他人申请的，还应提供授权委托书原件、委托人和受托人的身份证明等相关证明文件。</span></p><p style="margin-bottom:8px;text-indent:28px"><strong><span style=";font-family:宋体">第十四条</span></strong><span style=";font-family:宋体"> 订立保险合同，保险人就</span><span style=";font-family: 宋体;color:windowtext;text-underline:none">被保险人</span><span style=";font-family:宋体">的有关情况提出询问的，投保人应当如实告知。</span></p><p style="margin-bottom:8px;text-indent:28px"><span style=";font-family: 宋体;color:windowtext;text-underline:none">投保人</span><span style=";font-family:宋体">故意或者因重大过失未履行前款规定的义务，足以影响保险人决定是否同意承保或者提高保险费率的，保险人有权解除本保险合同。</span></p><p style="margin-bottom:8px;text-indent:28px"><span style=";font-family:宋体">前款规定的合同解除权，自保险人知道有解除事由之日起，超过三十日不行使而消灭。自合同成立之日起超过二年的，保险人不得解除合同；发生保险事故的，保险人应当承担给付保险金责任。</span></p><p style="margin-bottom:8px;text-indent:28px"><span style=";font-family:宋体">投保人故意不履行如实告知义务的，保险人对于合同解除前发生的保险事故，不承担给付保险金责任，并不退还保险费。</span></p><p style="margin-bottom:8px;text-indent:28px"><span style=";font-family:宋体">投保人因重大过失未履行如实告知义务，对保险事故的发生有严重影响的，保险人对于合同解除前发生的保险事故，不承担给付保险金责任，但应当退还保险费。</span></p><p style="margin-bottom:8px;text-indent:28px"><span style=";font-family:宋体">保险人在合同订立时已经知道投保人未如实告知的情况的，保险人不得解除合同；发生保险事故的，保险人应当承担给付保险金责任。</span></p><p style="margin-bottom:8px;text-indent:28px"><strong><span style=";font-family:宋体">第十五条 </span></strong><strong><span style=";font-family:宋体;color:windowtext;text-underline:none">投保人</span></strong><strong><span style=";font-family:宋体">、被保险人或者保险金受益人知道保险事故发生后，应当及时通知保险人。故意或者因重大过失未及时通知，致使保险事故的性质、原因、损失程度等难以确定的，保险人对无法确定的部分，不承担给付保险金责任，但保险人通过其他途径已经及时知道或者应当及时知道保险事故发生的除外。</span></strong></p><p style="margin-bottom:8px;text-indent:28px"><span style=";font-family:宋体">上述约定，不包括因不可抗力而导致的迟延。</span></p><p style="margin-bottom:8px;text-align:center"><strong><span style=";font-family:宋体">赔偿处理</span></strong></p><p style="margin-bottom:8px;text-indent:28px"><strong><span style=";font-family:宋体">第十六条</span></strong><span style=";font-family:宋体"> 发生保险事故时，保险人按如下方式计算赔款，但驾驶培训费用不超过保险金额：赔款=</span><span style=";font-family: 宋体;color:windowtext;text-underline:none">驾驶培训</span><span style=";font-family:宋体">费用×（1-免赔率）-免赔额</span></p><p style="margin-bottom:8px;text-indent:21px"><span style=";font-family:宋体">保险人履行赔偿义务后，本保险合同自动终止。</span></p><p style="margin-bottom:8px;text-indent:28px"><strong><span style=";font-family:宋体">第十七条</span></strong> <span style=";font-family: 宋体;color:windowtext;text-underline:none">保险</span><span style=";font-family:宋体">事故发生时，如果存在重复保险，</span><span style=";font-family: 宋体;color:windowtext;text-underline:none">保险人</span><span style=";font-family:宋体">按照本</span><span style=";font-family: 宋体;color:windowtext;text-underline:none">保险合同</span><span style=";font-family:宋体">的相应保险金额与其他保险合同及本保险合同相应保险金额总和的比例承担赔偿责任。</span></p><p style="margin-bottom:8px;text-indent:28px"><span style=";font-family:宋体">其他保险人应承担的赔偿金额，本保险人不负责垫付。若被保险人未如实告知导致保险人多支付赔偿金的，保险人有权向被保险人追回多支付的部分。</span></p><p style="margin-bottom:8px;text-indent:28px"><strong><span style=";font-family:宋体">第十八条</span></strong> <span style=";font-family: 宋体;color:windowtext;text-underline:none">被保险人</span><span style=";font-family:宋体">向保险人请求赔偿保险金的诉讼时效期间为二年，自其知道或者应当知道保险事故发生之日起计算。</span></p><p style="margin-bottom:8px;text-align:center"><strong><span style=";font-family:宋体">争议处理和法律适用</span></strong></p><p style="margin-bottom:8px;text-indent:28px"><strong><span style=";font-family:宋体">第十九条</span></strong><span style=";font-family:宋体"> 因履行本保险合同发生的争议，由当事人协商解决。协商不成的，提交保险单载明的仲裁机构仲裁；保险单未载明仲裁机构或者争议发生后未达成仲裁协议的，依法向人民法院起诉。</span></p><p style="margin-bottom:8px;text-indent:28px"><strong><span style=";font-family:宋体">第二十条 </span></strong><span style=";font-family:宋体">与本保险合同有关的以及履行本保险合同产生的一切争议处理适用中华人民共和国法律（不包括港澳台地区法律）。</span></p><p style="margin-bottom:8px;text-align:center"><strong><span style=";font-family:宋体">其他事项</span></strong></p><p style="margin-bottom:8px;text-indent:28px"><strong><span style=";font-family:宋体">第二十一条</span></strong><span style=";font-family:宋体"> 投保人和保险人可以协商变更合同内容。</span></p><p style="margin-bottom:8px;text-indent:28px"><span style=";font-family:宋体">变更保险合同的，应当由保险人在保险单或者其他保险凭证上批注或附贴批单，或者投保人和保险人订立变更的书面协议。</span></p><p style="margin-bottom:8px;text-indent:28px"><strong><span style=";font-family:宋体">第二十二条</span></strong><span style=";font-family:宋体"> 在本保险合同成立后，投保人可以书面形式通知</span><span style=";font-family: 宋体;color:windowtext;text-underline:none">保险人</span><span style=";font-family:宋体">解除合同，但保险人已根据本保险合同约定给付保险金的除外。</span></p><p style="margin-bottom:8px;text-indent:28px"><span style=";font-family:宋体">投保人解除本保险合同时，应提供下列证明文件和资料：</span></p><p style="margin-bottom:8px;text-indent:21px"><span style=";font-family:宋体">（一）保险合同解除申请书；</span></p><p style="margin-bottom:8px;text-indent:21px"><span style=";font-family:宋体">（二）保险单原件；</span></p><p style="margin-bottom:8px;text-indent:21px"><span style=";font-family:宋体">（三）</span><span style=";font-family: 宋体;color:windowtext;text-underline:none">保险</span><span style=";font-family:宋体">费交付凭证；</span></p><p style="margin-bottom:8px;text-indent:21px"><span style=";font-family:宋体">（四）投保人身份证明。</span></p><p style="margin-bottom:8px;text-indent:28px"><span style=";font-family: 宋体;color:windowtext;text-underline:none">投保人</span><span style=";font-family:宋体">要求解除本</span><span style=";font-family: 宋体;color:windowtext;text-underline:none">保险合同</span><span style=";font-family:宋体">，自保险人接到保险合同解除申请书之时起，本保险合同的效力终止。保险人收到上述证明文件和资料之日起30日内退还</span><span style=";font-family: 宋体;color:windowtext;text-underline:none">保险单</span><span style=";font-family:宋体">的未满期净保费。</span></p><p style="margin-bottom:8px;text-align:center"><strong><span style=";font-family:宋体">释义</span></strong></p><p style="margin-bottom:8px"><strong><span style=";font-family:宋体">&nbsp;第二十三条</span></strong></p><p style="margin-bottom:8px"><span style=";font-family:宋体">&nbsp;【驾驶培训费用】指机动车驾驶培训机构依照规定取得经营许可和营业资格后，按照经批准的经营项目、范围从事机动车驾驶员培训服务所收取的培训费用，不包括额外的补考费、住宿费、班车费、场地训练费等服务性费用。</span></p><p><br/></p>'
            + '<a id="btnXFXTK" href="javascript:;" class="protocolBtn" style="color:#FFF;">同意并继续</a>'
            + "</div></div>";
        var index1 = layer.open({
            type: 1,
            area: ['700px', '500px'],
            scrollbar: false,
            title: '驾驶培训费用损失保险条款',
            content: htmlStr,
            success: function () {
                $('#btnXFXTK').click(function () {
                    $("#xfxTk").prop("checked", "checked");
                    $("#xfxTkSm").html("已阅读");
                    layer.close(index1);
                });
            }
        });
    });
    $('.protocol_ywx').click(function () {
        var htmlStr = "<div class='protocolBox'><div class='protocolCon'>"
                    + '<p style="text-align:center;line-height:115%"><strong><span style="line-height: 115%;font-family: 宋体">安诚财产保险股份有限公司</span></strong></p><p style="line-height: 115%; text-align: center;"><strong><span style="font-family:宋体">驾驶员培训学校意外综合保险条款</span>&nbsp; <span style="font-family:宋体">意外</span>[2014]<span style="font-family:宋体">主</span>35<span style="font-family:宋体">号</span></strong></p><p style="margin-bottom:10px;text-align:center;text-indent:28px;line-height:115%"><strong><span style="line-height: 115%;font-family: 宋体">总则</span></strong></p><p style="margin-bottom:10px;text-indent:28px;line-height:115%"><strong><span style="line-height: 115%;font-family: 宋体">第一条 </span></strong><span style="line-height: 115%;font-family: 宋体">本保险合同由保险条款、投保单、保险单、保险凭证以及批单组成。凡涉及本保险合同的约定，均应采用书面形式。</span></p><p style="margin-bottom:10px;text-indent:28px;line-height:115%"><strong><span style="line-height: 115%;font-family: 宋体">第二条 </span></strong><span style="line-height: 115%;font-family: 宋体">本保险合同的被保险人应为年满十八至六十五周岁，持有中华人民共和国有效驾驶执照并</span><span style="line-height: 115%;font-family: 宋体">在驾校进行驾驶技术教学的教练员</span><span style="line-height: 115%;font-family: 宋体">或正规驾驶培训中心的学员。超出此范围的被保险人经保险人认可，可以特约承保。</span></p><p style="line-height:115%"><strong><span style="line-height: 115%;font-family: 宋体">第三条 </span></strong><span style="line-height: 115%;font-family: 宋体">本保险合同的投保人应为</span><span style="line-height: 115%;font-family: 宋体">依法设立的机动车驾驶员培训学校（不包括体育竞赛类机动车驾驶员培训）、</span><span style="line-height: 115%;font-family: 宋体">具有完全民事行为能力的被保险人本人、对被保险人有保险利益的其他人。</span></p><p style="margin-bottom:10px;text-indent:28px;line-height:115%"><strong><span style="line-height: 115%;font-family: 宋体">第四条 </span></strong><span style="line-height: 115%;font-family: 宋体">本保险合同的受益人包括：</span></p><p style="margin-bottom:10px;line-height:115%"><span style="line-height: 115%;font-family: 宋体">（一）身故保险金受益人</span></p><p style="margin-top:0;margin-right:0;margin-bottom:10px;margin-left:0;text-indent:28px;line-height:115%"><span style="line-height: 115%;font-family: 宋体">订立本保险合同时，被保险人或投保人可指定一人或数人为身故保险金受益人。身故保险金受益人为数人时，应确定其受益顺序和受益份额；未确定受益份额的，各身故保险金受益人按照相等份额享有受益权。投保人指定受益人时须经被保险人同意。</span></p><p style="margin-top:0;margin-right:0;margin-bottom:10px;margin-left:0;text-indent:28px;line-height:115%"><span style="line-height: 115%;font-family: 宋体">被保险人死亡后，有下列情形之一的，保险金作为被保险人的遗产，由保险人依照《中华人民共和国继承法》的规定履行给付保险金的义务：</span></p><p style="margin-top:0;margin-right:0;margin-bottom:10px;margin-left:0;text-indent:28px;line-height:115%"><span style="line-height: 115%;font-family: 宋体">（1）没有指定受益人，或者受益人指定不明无法确定的；</span></p><p style="margin-top:0;margin-right:0;margin-bottom:10px;margin-left:0;text-indent:28px;line-height:115%"><span style="line-height: 115%;font-family: 宋体">（2）受益人先于被保险人死亡，没有其他受益人的；</span></p><p style="margin-top:0;margin-right:0;margin-bottom:10px;margin-left:0;text-indent:28px;line-height:115%"><span style="line-height: 115%;font-family: 宋体">（3）受益人依法丧失受益权或者放弃受益权，没有其他受益人的。</span></p><p style="margin-top:0;margin-right:0;margin-bottom:10px;margin-left:0;text-indent:28px;line-height:115%"><span style="line-height: 115%;font-family: 宋体">受益人与被保险人在同一事件中死亡，且不能确定死亡先后顺序的，推定受益人死亡在先。</span></p><p style="margin-top:0;margin-right:0;margin-bottom:10px;margin-left:0;text-indent:28px;line-height:115%"><span style="line-height: 115%;font-family: 宋体">被保险人或投保人可以变更身故保险金受益人，但需书面通知保险人，由保险人在本保险合同上批注。对因身故保险金受益人变更发生的法律纠纷，保险人不承担任何责任。</span></p><p style="margin-top:0;margin-right:0;margin-bottom:10px;margin-left:0;text-indent:28px;line-height:115%"><span style="line-height: 115%;font-family: 宋体">投保人指定或变更身故保险金受益人的，应经被保险人书面同意。被保险人为无民事行为能力人或限制民事行为能力人的，应由其监护人指定或变更身故保险金受益人。</span></p><p style="margin-bottom:10px;text-indent:28px;line-height:115%"><span style="line-height: 115%;font-family: 宋体">（二）残疾、医疗费用保险金受益人</span></p><p style="margin-bottom:10px;text-indent:28px;line-height:115%"><span style="line-height: 115%;font-family: 宋体">除另有约定外，本保险合同的残疾、医疗费用保险金的受益人为被保险人本人。</span></p><p style="margin-bottom:10px;text-align:center;line-height:115%"><strong><span style="line-height: 115%;font-family: 宋体">保险责任</span></strong></p><p style="margin-top:0;margin-bottom: 10px;margin-left:0;text-indent:28px;line-height:115%"><strong><span style="line-height: 115%;font-family: 宋体">第五条</span></strong><span style="line-height: 115%;font-family: 宋体"> 在保险期间内，被保险人在驾驶培训机构指定的训练场所及驾驶路线进行教学、学习、待训或考试过程中，或驾驶培训机构指定车辆在接、送被保险人途中，因遭受意外伤害事故导致身故、残疾的，保险人依照下列约定给付保险金，且给付各项保险金之和不超过保险金额。</span></p><p class="MsoListParagraph" style="margin-top:0;margin-right:0;margin-bottom: 10px;margin-left:0;text-indent:0;line-height:115%"><span style="line-height: 115%;font-family: 宋体">（一）<span style="font-stretch: normal;font-size: 9px;line-height: normal;font-family: &#39;Times New Roman&#39;">&nbsp;&nbsp; </span></span><span style="line-height: 115%;font-family: 宋体">身故保险责任</span></p><p style="margin-top:0;margin-right:0;margin-bottom:10px;margin-left:0;line-height:115%"><span style="line-height: 115%;font-family: 宋体">在保险期间内，被保险人因遭受意外伤害，并自意外伤害发生之日起180日内因意外伤害直接导致被保险人身故的，保险人按保险金额给付身故保险金，对被保险人的保险责任终止。</span></p><p style="margin-top:0;margin-right:0;margin-bottom:10px;margin-left:0;line-height:115%"><span style="line-height: 115%;font-family: 宋体">被保险人因遭受意外伤害且因该意外伤害直接导致被保险人自该事故发生日起下落不明，经人民法院宣告在保险有效期内死亡的，保险人按保险金额给付身故保险金。但若被保险人被宣告死亡后生还的，保险金受领人应于知道或应当知道被保险人生还后30日内退还保险人给付的身故保险金。</span></p><p style="margin-top:0;margin-right:0;margin-bottom:10px;margin-left:0;line-height:115%"><span style="line-height: 115%;font-family: 宋体">被保险人身故前保险人已给付第五条约定的残疾保险金的，身故保险金应扣除已给付的保险金。</span></p><p style="margin-bottom:10px;text-indent:28px;line-height:115%"><span style="line-height: 115%;font-family: 宋体">（二）残疾保险责任</span></p><p style="margin-top:10px;margin-right:0;margin-bottom:10px;margin-left:0;text-indent:27px;line-height:115%"><span style="line-height: 115%;font-family: 宋体">在保险期间内，被保险人因遭受意外伤害，并自该事故发生之日起180日内因该事故直接原因造成《道路交通事故受伤人员伤残评定》（GB 18667-2002）所列残疾之一的，保险人按以下给付比例乘以保险金额给付残疾保险金。如第180日治疗仍未结束的，按当日的身体情况进行残疾鉴定，并据此给付残疾保险金。</span></p><table cellspacing="0" cellpadding="0"><tbody><tr style=";height:32px" class="firstRow"><td style="border-color: windowtext; border-width: 1px; padding: 0px 7px; word-break: break-all;" height="32" width="80"><p style="margin-top:10px;margin-right:0;margin-bottom:10px;margin-left:0;text-align:center;line-height:115%"><span style="line-height: 115%;font-family: 宋体">伤残等级</span></p></td><td width="40" style="border-top-color: windowtext; border-right-color: windowtext; border-bottom-color: windowtext; border-top-width: 1px; border-right-width: 1px; border-bottom-width: 1px; border-left-style: none; padding: 0px 7px;" height="32"><p style="margin-top:10px;margin-right:0;margin-bottom:10px;margin-left:0;text-align:center;line-height:115%"><span style="line-height: 115%;font-family: 宋体">一级</span></p></td><td width="40" style="border-top-color: windowtext; border-right-color: windowtext; border-bottom-color: windowtext; border-top-width: 1px; border-right-width: 1px; border-bottom-width: 1px; border-left-style: none; padding: 0px 7px;" height="32"><p style="margin-top:10px;margin-right:0;margin-bottom:10px;margin-left:0;text-align:center;line-height:115%"><span style="line-height: 115%;font-family: 宋体">二级</span></p></td><td width="40" style="border-top-color: windowtext; border-right-color: windowtext; border-bottom-color: windowtext; border-top-width: 1px; border-right-width: 1px; border-bottom-width: 1px; border-left-style: none; padding: 0px 7px;" height="32"><p style="margin-top:10px;margin-right:0;margin-bottom:10px;margin-left:0;text-align:center;line-height:115%"><span style="line-height: 115%;font-family: 宋体">三级</span></p></td><td width="40" style="border-top-color: windowtext; border-right-color: windowtext; border-bottom-color: windowtext; border-top-width: 1px; border-right-width: 1px; border-bottom-width: 1px; border-left-style: none; padding: 0px 7px;" height="32"><p style="margin-top:10px;margin-right:0;margin-bottom:10px;margin-left:0;text-align:center;line-height:115%"><span style="line-height: 115%;font-family: 宋体">四级</span></p></td><td width="40" style="border-top-color: windowtext; border-right-color: windowtext; border-bottom-color: windowtext; border-top-width: 1px; border-right-width: 1px; border-bottom-width: 1px; border-left-style: none; padding: 0px 7px;" height="32"><p style="margin-top:10px;margin-right:0;margin-bottom:10px;margin-left:0;text-align:center;line-height:115%"><span style="line-height: 115%;font-family: 宋体">五级</span></p></td><td width="40" style="border-top-color: windowtext; border-right-color: windowtext; border-bottom-color: windowtext; border-top-width: 1px; border-right-width: 1px; border-bottom-width: 1px; border-left-style: none; padding: 0px 7px;" height="32"><p style="margin-top:10px;margin-right:0;margin-bottom:10px;margin-left:0;text-align:center;line-height:115%"><span style="line-height: 115%;font-family: 宋体">六级</span></p></td><td width="40" style="border-top-color: windowtext; border-right-color: windowtext; border-bottom-color: windowtext; border-top-width: 1px; border-right-width: 1px; border-bottom-width: 1px; border-left-style: none; padding: 0px 7px;" height="32"><p style="margin-top:10px;margin-right:0;margin-bottom:10px;margin-left:0;text-align:center;line-height:115%"><span style="line-height: 115%;font-family: 宋体">七级</span></p></td><td width="40" style="border-top-color: windowtext; border-right-color: windowtext; border-bottom-color: windowtext; border-top-width: 1px; border-right-width: 1px; border-bottom-width: 1px; border-left-style: none; padding: 0px 7px;" height="32"><p style="margin-top:10px;margin-right:0;margin-bottom:10px;margin-left:0;text-align:center;line-height:115%"><span style="line-height: 115%;font-family: 宋体">八级</span></p></td><td width="40" style="border-top-color: windowtext; border-right-color: windowtext; border-bottom-color: windowtext; border-top-width: 1px; border-right-width: 1px; border-bottom-width: 1px; border-left-style: none; padding: 0px 7px;" height="32"><p style="margin-top:10px;margin-right:0;margin-bottom:10px;margin-left:0;text-align:center;line-height:115%"><span style="line-height: 115%;font-family: 宋体">九级</span></p></td><td width="40" style="border-top-color: windowtext; border-right-color: windowtext; border-bottom-color: windowtext; border-top-width: 1px; border-right-width: 1px; border-bottom-width: 1px; border-left-style: none; padding: 0px 7px;" height="32"><p style="margin-top:10px;margin-right:0;margin-bottom:10px;margin-left:0;text-align:center;line-height:115%"><span style="line-height: 115%;font-family: 宋体">十级</span></p></td></tr><tr style=";height:38px"><td style="border-right-color: windowtext; border-bottom-color: windowtext; border-left-color: windowtext; border-right-width: 1px; border-bottom-width: 1px; border-left-width: 1px; border-top-style: none; padding: 0px 7px;" height="38" width="68"><p style="margin-top:10px;margin-right:0;margin-bottom:10px;margin-left:0;text-align:center;line-height:115%"><span style="line-height: 115%;font-family: 宋体">给付比例</span></p></td><td width="26" style="border-top-style: none; border-left-style: none; border-bottom-color: windowtext; border-bottom-width: 1px; border-right-color: windowtext; border-right-width: 1px; padding: 0px 7px;" height="38"><p style="margin-top:10px;margin-right:0;margin-bottom:10px;margin-left:0;text-align:center;line-height:115%"><span style="line-height: 115%;font-family: 宋体">100%</span></p></td><td width="40" style="border-top-style: none; border-left-style: none; border-bottom-color: windowtext; border-bottom-width: 1px; border-right-color: windowtext; border-right-width: 1px; padding: 0px 7px;" height="38"><p style="margin-top:10px;margin-right:0;margin-bottom:10px;margin-left:0;text-align:center;line-height:115%"><span style="line-height: 115%;font-family: 宋体">90%</span></p></td><td width="40" style="border-top-style: none; border-left-style: none; border-bottom-color: windowtext; border-bottom-width: 1px; border-right-color: windowtext; border-right-width: 1px; padding: 0px 7px;" height="38"><p style="margin-top:10px;margin-right:0;margin-bottom:10px;margin-left:0;text-align:center;line-height:115%"><span style="line-height: 115%;font-family: 宋体">80%</span></p></td><td width="40" style="border-top-style: none; border-left-style: none; border-bottom-color: windowtext; border-bottom-width: 1px; border-right-color: windowtext; border-right-width: 1px; padding: 0px 7px;" height="38"><p style="margin-top:10px;margin-right:0;margin-bottom:10px;margin-left:0;text-align:center;line-height:115%"><span style="line-height: 115%;font-family: 宋体">70%</span></p></td><td width="40" style="border-top-style: none; border-left-style: none; border-bottom-color: windowtext; border-bottom-width: 1px; border-right-color: windowtext; border-right-width: 1px; padding: 0px 7px;" height="38"><p style="margin-top:10px;margin-right:0;margin-bottom:10px;margin-left:0;text-align:center;line-height:115%"><span style="line-height: 115%;font-family: 宋体">60%</span></p></td><td width="40" style="border-top-style: none; border-left-style: none; border-bottom-color: windowtext; border-bottom-width: 1px; border-right-color: windowtext; border-right-width: 1px; padding: 0px 7px;" height="38"><p style="margin-top:10px;margin-right:0;margin-bottom:10px;margin-left:0;text-align:center;line-height:115%"><span style="line-height: 115%;font-family: 宋体">50%</span></p></td><td width="40" style="border-top-style: none; border-left-style: none; border-bottom-color: windowtext; border-bottom-width: 1px; border-right-color: windowtext; border-right-width: 1px; padding: 0px 7px;" height="38"><p style="margin-top:10px;margin-right:0;margin-bottom:10px;margin-left:0;text-align:center;line-height:115%"><span style="line-height: 115%;font-family: 宋体">40%</span></p></td><td width="40" style="border-top-style: none; border-left-style: none; border-bottom-color: windowtext; border-bottom-width: 1px; border-right-color: windowtext; border-right-width: 1px; padding: 0px 7px;" height="38"><p style="margin-top:10px;margin-right:0;margin-bottom:10px;margin-left:0;text-align:center;line-height:115%"><span style="line-height: 115%;font-family: 宋体">30%</span></p></td><td width="40" style="border-top-style: none; border-left-style: none; border-bottom-color: windowtext; border-bottom-width: 1px; border-right-color: windowtext; border-right-width: 1px; padding: 0px 7px;" height="38"><p style="margin-top:10px;margin-right:0;margin-bottom:10px;margin-left:0;text-align:center;line-height:115%"><span style="line-height: 115%;font-family: 宋体">20%</span></p></td><td width="40" style="border-top-style: none; border-left-style: none; border-bottom-color: windowtext; border-bottom-width: 1px; border-right-color: windowtext; border-right-width: 1px; padding: 0px 7px;" height="38"><p style="margin-top:10px;margin-right:0;margin-bottom:10px;margin-left:0;text-align:center;line-height:115%"><span style="line-height: 115%;font-family: 宋体">10%</span></p></td></tr></tbody></table><p style="margin-top:10px;margin-right:0;margin-bottom:10px;margin-left:0;text-indent:27px;line-height:115%"><span style="line-height: 115%;font-family: 宋体">多等级伤残的，按《道路交通事故受伤人员伤残评定》（GB 18667-2002）规定的标准增加赔付比例。</span></p><p style="margin-top:0;margin-right:0;margin-bottom:10px;margin-left:0;text-indent:28px;line-height:115%"><strong><span style="line-height: 115%;font-family: 宋体">第六条</span></strong><span style="line-height: 115%;font-family: 宋体"> 在保险期间内，被保险人在参加国家认可的正规培训学校组织的场地及驾驶路线进行教学、学习、待训或考试过程中，因遭受意外伤害，在中华人民共和国境内二级以上(含二级)或保险人认可的医疗机构进行治疗所支出的符合保险单签发地政府基本医疗保险管理规定的合理且必要的医疗费用，保险人在扣除双方约定的免赔额后，在意外伤害医疗费用保险金额的范围内按照双方约定比例给付意外伤害医疗费用保险金。</span></p><p style="margin-top:0;margin-right:0;margin-bottom:10px;margin-left:0;line-height:115%"><span style="line-height: 115%;font-family: 宋体">（一）保险期间届满被保险人治疗仍未结束的，保险人继续承担意外伤害导致的医疗费用保险责任，但住院医疗最长至意外伤害发生之日起第九十日止，门诊医疗最长至意外伤害发生之日起第十五日止。</span></p><p style="margin-top:0;margin-right:0;margin-bottom:10px;margin-left:0;line-height:115%"><span style="line-height: 115%;font-family: 宋体">（二）在保险期间内，无论被保险人一次或多次发生意外伤害，保险人均按约定给付意外伤害医疗保险金，但累计给付金额达到保险单所载意外伤害医疗保险金额时，保险人对被保险人的本款保险责任终止。</span></p><p style="margin-bottom:10px;text-indent:28px;line-height:115%"><span style="line-height: 115%;font-family: 宋体">（三）本保险合同中的医疗费用保障适用补偿原则，即被保险人通过任何途径（包括本保险）所获得的医疗费用补偿金额总和以被保险人实际支出的符合本保单签发地政府基本医疗保险管理规定的医疗费用金额为限。</span></p><p style="margin-bottom:10px;text-indent:28px;line-height:115%"><strong><span style="line-height: 115%;font-family: 宋体">第七条</span></strong><span style="line-height: 115%;font-family: 宋体"> 保险事故发生后，被保险人因保险事故而被提起仲裁或者诉讼的，对应由被保险人支付的仲裁或诉讼费用以及事先经保险人书面同意支付的其他必要的、合理的费用（以下简称“法律费用”），保险人按照本保险合同约定也负责赔偿。</span></p><p style="margin-bottom:10px;text-indent:28px;line-height:115%;text-autospace:none"><span style="line-height: 115%;font-family: 宋体">（一）保险人对每次事故的法律费用的赔偿金额不超过每次事故赔偿限额的10%；</span></p><p style="margin-bottom:10px;text-indent:28px;line-height:115%"><span style="line-height: 115%;font-family: 宋体">（二）在保险期间内，保险人对多次事故的法律费用的累计赔偿金额不超过累计赔偿限额的30%。</span></p><p style="margin-bottom:10px;text-indent:28px;line-height:115%"><strong><span style="line-height: 115%;font-family: 宋体">第八条</span></strong><span style="line-height: 115%;font-family: 宋体">突发疾病身故保险责任(可选责任)</span></p><p style="margin-top:0;margin-right:0;margin-bottom:10px;margin-left:0;line-height:115%"><span style="line-height: 115%;font-family: 宋体">在保险期间内，被保险人</span><span style="line-height: 115%;font-family: 宋体">在参加国家认可的正规培训学校组织的场地、道路驾驶学习</span><span style="line-height: 115%;font-family: 宋体">过程中因突发疾病并因该疾病直接导致被保险人自发病之时起24小时（或保单书面载明的时间）内身故的，保险人按保险单上载明的该被保险人的突发疾病身故保险的保额给付身故保险金。</span></p><p style="margin-bottom:10px;text-align:center;line-height:115%;text-autospace: none"><strong><span style="line-height: 115%;font-family: 宋体">责任免除</span></strong></p><p style="margin-bottom:10px;text-indent:28px;line-height:115%"><strong><span style="line-height: 115%;font-family: 宋体">第九条 因下列原因造成被保险人身故、残疾或产生任何费用的，保险人不承担给付保险金责任：</span></strong></p><p style="margin-top:0;margin-right:0;margin-bottom:10px;margin-left:0;text-indent:28px;line-height:115%"><strong><span style="line-height: 115%;font-family: 宋体">（一）投保人或被保险人的故意行为；</span></strong></p><p style="margin-top:0;margin-right:0;margin-bottom:10px;margin-left:0;text-indent:28px;line-height:115%"><strong><span style="line-height: 115%;font-family: 宋体">（二）被保险人自致伤害或自杀，但被保险人自杀时为无民事行为能力人的除外；</span></strong></p><p style="margin-top:0;margin-right:0;margin-bottom:10px;margin-left:0;text-indent:28px;line-height:115%"><strong><span style="line-height: 115%;font-family: 宋体">（三）因被保险人挑衅或故意行为而导致的打斗、被袭击或被谋杀；</span></strong></p><p style="margin-top:0;margin-right:0;margin-bottom:10px;margin-left:0;text-indent:28px;line-height:115%"><strong><span style="line-height: 115%;font-family: 宋体">（四）被保险人妊娠、流产、分娩，猝死、疾病、药物过敏；</span></strong></p><p style="margin-top:0;margin-right:0;margin-bottom:10px;margin-left:0;text-indent:28px;line-height:115%"><strong><span style="line-height: 115%;font-family: 宋体">（五）被保险人接受整容手术及其他内、外科手术；</span></strong></p><p style="margin-top:0;margin-right:0;margin-bottom:10px;margin-left:0;text-indent:28px;line-height:115%"><strong><span style="line-height: 115%;font-family: 宋体">（六）被保险人未遵医嘱，私自服用、涂用、注射药物；</span></strong></p><p style="margin-top:0;margin-right:0;margin-bottom:10px;margin-left:0;text-indent:28px;line-height:115%"><strong><span style="line-height: 115%;font-family: 宋体">（七）任何生物、化学、原子能武器，原子能或核能装置所造成的爆炸、灼伤、污染或辐射；</span></strong></p><p style="margin-top:0;margin-right:0;margin-bottom:10px;margin-left:0;text-indent:28px;line-height:115%"><strong><span style="line-height: 115%;font-family: 宋体">（八）恐怖袭击；</span></strong></p><p style="margin-bottom:10px;text-indent:28px;line-height:115%"><strong><span style="line-height: 115%;font-family: 宋体">（九）被保险人故意犯罪或者抗拒依法采取的刑事强制措施；</span></strong></p><p style="margin-bottom:10px;text-indent:28px;line-height:115%;text-autospace:none"><strong><span style="line-height: 115%;font-family: 宋体">（十）被保险人从事潜水、滑水、滑翔、跳伞、攀岩、狩猎、探险、武术、摔跤、特技、赛马、赛车、蹦极等高风险运动和活动；</span></strong></p><p style="margin-bottom:10px;text-indent:28px;line-height:115%;text-autospace:none"><strong><span style="line-height: 115%;font-family: 宋体">（十一）被保险人驾驶未经年检或年检未通过的教练车。</span></strong></p><p style="margin-top:0;margin-right:0;margin-bottom:10px;margin-left:0;text-indent:28px;line-height:115%"><strong><span style="line-height: 115%;font-family: 宋体">第十条 被保险人在下列期间遭受伤害导致身故、残疾或产生任何费用的，保险人也不承担给付保险金责任：</span></strong></p><p style="margin-top:0;margin-right:0;margin-bottom:10px;margin-left:0;text-indent:28px;line-height:115%"><strong><span style="line-height: 115%;font-family: 宋体">（一）战争、军事行动、暴动或武装叛乱期间；</span></strong></p><p style="margin-top:0;margin-right:0;margin-bottom:10px;margin-left:0;text-indent:28px;line-height:115%"><strong><span style="line-height: 115%;font-family: 宋体">（二）被保险人醉酒或毒品、管制药物的影响期间；</span></strong></p><p style="margin-bottom:10px;text-indent:28px;line-height:115%"><strong><span style="line-height: 115%;font-family: 宋体">（三）被保险人精神错乱或精神失常期间。</span></strong></p><p style="margin-top:0;margin-right:0;margin-bottom:10px;margin-left:0;text-indent:28px;line-height:115%"><strong><span style="line-height: 115%;font-family: 宋体">若由于本保险合同中责任免除的情形导致的被保险人死亡，保险人将退还未满期净保费。</span></strong></p><p style="margin-bottom:10px;text-indent:28px;line-height:115%"><strong><span style="font-family: 宋体">第十一条</span> </strong><strong><span style="font-family: 宋体">下列费用，保险人也不负责赔偿：</span></strong></p><p style="margin-bottom:10px;text-indent:28px;line-height:115%"><strong><span style="line-height: 115%;font-family: 宋体">（一）用于矫形、美容、心理咨询、器官移植或修复、安装及购买残疾用具（如轮椅、假肢、助听器、假眼、配镜等）的费用；</span></strong></p><p style="margin-bottom:10px;text-indent:28px;line-height:115%"><strong><span style="line-height: 115%;font-family: 宋体">（二）被保险人体检、疗养或康复治疗的费用；</span></strong></p><p style="margin-bottom:10px;text-indent:28px;line-height:115%;text-autospace:none"><strong><span style="line-height: 115%;font-family: 宋体">（三）被保险人在二级以下或非保险人认可医院的治疗费用；</span></strong></p><p style="margin-bottom:10px;text-indent:28px;line-height:115%;text-autospace:none"><strong><span style="line-height: 115%;font-family: 宋体">（四）被保险人因他人责任造成伤害而引起的医疗费用中依法应由他人承担的部分。</span></strong></p><p style="margin-bottom:10px;text-align:center;line-height:115%"><strong><span style="line-height: 115%;font-family: 宋体">保险金额和保险费</span></strong></p><p style="margin-bottom:10px;text-indent:28px;line-height:115%"><strong><span style="line-height: 115%;font-family: 宋体">第十二条 </span></strong><span style="line-height: 115%;font-family: 宋体">保险金额是保险人承担给付保险金责任的最高限额。</span></p><p style="margin-bottom:10px;text-indent:28px;line-height:115%"><span style="line-height: 115%;font-family: 宋体">保险金额由投保人、保险人双方约定，并在保险单中载明。</span></p><p style="margin-bottom:10px;text-indent:28px;line-height:115%;text-autospace:none"><span style="line-height: 115%;font-family: 宋体">投保人应该按照合同约定向保险人交纳保险费。</span></p><p style="margin-bottom:10px;text-align:center;line-height:115%"><strong><span style="line-height: 115%;font-family: 宋体">保险期间</span></strong></p><p style="margin-bottom:10px;text-indent:28px;line-height:115%;text-autospace:none"><strong><span style="line-height: 115%;font-family: 宋体">第十三条 </span></strong><span style="line-height: 115%;font-family: 宋体">除另有约定外，保险责任从正式参保且保单生效日零时起至领取驾照日或准考证失效日二十四时止。</span></p><p style="margin-bottom:10px;text-align:center;text-indent:28px;line-height:115%"><strong><span style="line-height: 115%;font-family: 宋体">保险人义务</span></strong></p><p style="margin-top:0;margin-right:0;margin-bottom:10px;margin-left:0;text-indent:28px;line-height:115%"><strong><span style="line-height: 115%;font-family: 宋体">第十四条 </span></strong><span style="line-height: 115%;font-family: 宋体">订立保险合同时，采用保险人提供的格式条款的，保险人向投保人提供的投保单应当附格式条款，保险人应当向投保人说明保险合同的内容。对保险合同中免除保险人责任的条款，保险人在订立合同时应当在投保单、保险单或者其他保险凭证上作出足以引起投保人注意的提示，并对该条款的内容以书面或者口头形式向投保人作出明确说明；未作提示或者明确说明的，该条款不产生效力。</span></p><p style="margin-top:0;margin-right:0;margin-bottom:10px;margin-left:0;text-indent:28px;line-height:115%"><strong><span style="line-height: 115%;font-family: 宋体">第十五条 </span></strong><span style="line-height: 115%;font-family: 宋体">本保险合同成立后，保险人应当及时向投保人签发保险单或其他保险凭证。</span></p><p style="margin-bottom:10px;text-indent:28px;line-height:115%"><strong><span style="line-height: 115%;font-family: 宋体">第十六条 </span></strong><span style="line-height: 115%;font-family: 宋体">保险人依据第二十一条所取得的保险合同解除权，自保险人知道有解除事由之日起，超过三十日不行使而消灭。自保险合同成立之日起超过二年的，保险人不得解除合同；发生保险事故的，保险人承担给付保险金责任。</span></p><p style="margin-bottom:10px;text-indent:28px;line-height:115%"><span style="line-height: 115%;font-family: 宋体">保险人在合同订立时已经知道投保人未如实告知的情况的，保险人不得解除合同；发生保险事故的，保险人应当承担给付保险金责任。</span></p><p style="margin-bottom:10px;text-indent:28px;line-height:115%"><strong><span style="line-height: 115%;font-family: 宋体">第十七条 </span></strong><span style="line-height: 115%;font-family: 宋体">保险人认为被保险人提供的有关索赔的证明和资料不完整的，应当及时一次性通知投保人、被保险人补充提供。</span></p><p style="margin-bottom:10px;text-indent:28px;line-height:115%"><strong><span style="line-height: 115%;font-family: 宋体">第十八条</span></strong><span style="line-height: 115%;font-family: 宋体"> 保险人收到被保险人的给付保险金的请求后，应当及时作出是否属于保险责任的核定；情形复杂的，应当在三十日内作出核定，但保险合同另有约定的除外。</span></p><p style="margin-bottom:10px;text-indent:28px;line-height:115%"><span style="line-height: 115%;font-family: 宋体">保险人应当将核定结果通知被保险人；对属于保险责任的，在与被保险人达成给付保险金的协议后十日内，履行赔偿保险金义务。保险合同对给付保险金的期限有约定的，保险人应当按照约定履行给付保险金的义务。保险人依照前款约定作出核定后，对不属于保险责任的，应当自作出核定之日起三日内向被保险人发出拒绝给付保险金通知书，并说明理由。</span></p><p style="margin-top:0;margin-right:0;margin-bottom:10px;margin-left:0;text-indent:28px;line-height:115%"><span style="font-family: 宋体">保险人自收到给付保险金的请求和有关证明、资料之日起六十日内，对其给付的数额不能确定的，应当根据已有证明和资料可以确定的数额先予支付；保险人最终确定给付的数额后，应当支付相应的差额。</span></p><p style="margin-top:0;margin-right:0;margin-bottom:10px;margin-left:0;text-indent:28px;line-height:115%"><strong><span style="font-family: 宋体">第十九条</span> </strong>&nbsp;<span style="font-family: 宋体">若被保险人遭受难以界定的保险事故，保险人有权要求司法鉴定或相关机构（包括公安、安监局、消防等）对</span>/<span style="font-family: 宋体">向投保人、被保险人、保险金申请人等进行调查和检查、鉴定（包括提请做必要、合理的解剖检验）。</span></p><p style="margin-bottom:10px;text-align:center;text-indent:28px;line-height:115%"><strong><span style="line-height: 115%;font-family: 宋体">投保人、被保险人义务</span></strong></p><p style="margin-bottom:10px;text-indent:28px;line-height:115%"><strong><span style="line-height: 115%;font-family: 宋体">第二十条</span></strong><span style="line-height: 115%;font-family: 宋体"> 除另有约定外，投保人应当在保险合同成立时交清保险费。<strong>投保人未按约定交付保险费的，保险人不承担赔偿保险金的责任</strong>。 </span></p><p style="margin-bottom:10px;text-indent:28px;line-height:115%"><strong><span style="line-height: 115%;font-family: 宋体">第二十一条 订立保险合同，保险人就保险标的或者被保险人的有关情况提出询问的，投保人应当如实告知。</span></strong></p><p style="margin-top:0;margin-right:0;margin-bottom:10px;margin-left:0;text-indent:28px;line-height:115%"><strong><span style="line-height: 115%;font-family: 宋体">投保人故意或者因重大过失未履行前款规定的义务，足以影响保险人决定是否同意承保或者提高保险费率的，保险人有权解除本保险合同。</span></strong></p><p style="margin-top:0;margin-right:0;margin-bottom:10px;margin-left:0;text-indent:28px;line-height:115%"><strong><span style="line-height: 115%;font-family: 宋体">投保人故意不履行如实告知义务的，保险人对于合同解除前发生的保险事故，不承担给付保险金责任，并不退还保险费。</span></strong></p><p style="margin-top:0;margin-right:0;margin-bottom:10px;margin-left:0;text-indent:28px;line-height:115%"><strong><span style="line-height: 115%;font-family: 宋体">投保人因重大过失未履行如实告知义务，对保险事故的发生有严重影响的，保险人对于合同解除前发生的保险事故，不承担给付保险金责任，但应当退还保险费。</span></strong></p><p style="margin-bottom:10px;text-indent:28px;line-height:115%"><strong><span style="line-height: 115%;font-family: 宋体">第二十二条</span></strong><span style="line-height: 115%;font-family: 宋体"> 投保人住所或通讯地址变更时，应及时以书面形式通知保险人。投保人未通知的，保险人按本保险合同所载的最后住所或通讯地址发送的有关通知，均视为已发送给投保人。</span></p><p style="margin-bottom:10px;text-indent:28px;line-height:115%"><strong><span style="line-height: 115%;font-family: 宋体">第二十三条 </span></strong><span style="line-height: 115%;font-family: 宋体">投保人、被保险人或者保险金受益人知道保险事故发生后，应当在2日内通知保险人。<strong>故意或者因重大过失未及时通知，致使保险事故的性质、原因、损失程度等难以确定的，保险人对无法确定的部分，不承担给付保险金责任，</strong>但保险人通过其他途径已经及时知道或者应当及时知道保险事故发生的除外。</span></p><p style="margin-top:0;margin-right:0;margin-bottom:10px;margin-left:0;text-indent:28px;line-height:115%"><span style="line-height: 115%;font-family: 宋体">上述约定，不包括因不可抗力而导致的迟延。</span></p><p style="margin-bottom:10px;text-align:center;text-indent:36px;line-height:115%;text-autospace: none"><strong><span style="line-height: 115%;font-family: 宋体">保险金的申请与给付</span></strong></p><p style="margin-top:0;margin-right:0;margin-bottom:10px;margin-left:0;text-indent:28px;line-height:115%"><strong><span style="line-height: 115%;font-family: 宋体">第二十四条 </span></strong><span style="line-height: 115%;font-family: 宋体">保险金申请人向保险人申请给付保险金时，应提交以下材料。保险金申请人因特殊原因不能提供以下材料的，应提供其他合法有效的材料。<strong>保险金申请人未能提供有关材料，导致保险人无法核实该申请的真实性的，保险人对无法核实部分不承担给付保险金的责任。</strong></span></p><p style="margin-bottom:10px;text-indent:28px;line-height:115%"><span style="line-height: 115%;font-family: 宋体">1</span><span style="line-height: 115%;font-family: 宋体">、保险金给付申请书；</span></p><p style="margin-bottom:10px;text-indent:28px;line-height:115%"><span style="line-height: 115%;font-family: 宋体">2</span><span style="line-height: 115%;font-family: 宋体">、保险单原件；</span></p><p style="margin-bottom:10px;text-indent:28px;line-height:115%"><span style="line-height: 115%;font-family: 宋体">3</span><span style="line-height: 115%;font-family: 宋体">、保险金申请人的身份证明、户籍证明、申请人的银行账户（复印件）；若保险金申请人委托他人申请，还须提供受托人身份证明、授权委托书；</span></p><p style="margin-bottom:10px;text-indent:28px;line-height:115%"><span style="line-height: 115%;font-family: 宋体">4</span><span style="line-height: 115%;font-family: 宋体">、相关机构（公安、消防、车管所等）出具的意外事故证明；</span></p><p style="margin-bottom:10px;text-indent:28px;line-height:115%"><span style="line-height: 115%;font-family: 宋体">保险金申请人所能提供的与确认保险事故的性质、原因、结果等有关材料；</span></p><p style="margin-bottom:10px;text-indent:28px;line-height:115%"><span style="line-height: 115%;font-family: 宋体">5</span><span style="line-height: 115%;font-family: 宋体">、申请意外身故保险金的，除第1至4项约定的材料外，还须提供保险人认可的机构（包含公安部门、二级及以上或保险人认可的医疗机构）出具的被保险人身故证明（若被保险人为宣告死亡，保险金申请人应提供人民法院出具的宣告死亡证明文件）、户籍注销证明、火化或殡葬证明；</span></p><p style="margin-bottom:10px;text-indent:28px;line-height:115%"><span style="line-height: 115%;font-family: 宋体">6</span><span style="line-height: 115%;font-family: 宋体">、申请意外残疾保险金的，除第1至4项约定的材料外，还须提供省市级司法鉴定机构或保险人认可的专业鉴定机构出具的残疾鉴定报告；</span></p><p style="margin-bottom:10px;line-height:115%"><strong><span style="line-height: 115%;font-family: 宋体">&nbsp;&nbsp;&nbsp; </span></strong><span style="line-height: 115%;font-family: 宋体">7</span><span style="line-height: 115%;font-family: 宋体">、申请意外医疗保险金的，除第1至4项约定的材料外，还需提供二级以上(含二级)或保险人认可的医疗机构出具的病历、住院证明、出院小结、医疗费用原始发票、住院医疗费用结帐明细清单、附有病理检查、血液生化检查及其它诊断报告的疾病诊断证明书等；</span></p><p style="margin-bottom:10px;line-height:115%"><span style="line-height: 115%;font-family: 宋体">&nbsp;&nbsp;&nbsp; 8</span><span style="line-height: 115%;font-family: 宋体">、申请</span><span style="line-height: 115%;font-family: 宋体">关于</span><span style="line-height: 115%;font-family: 宋体">第三者责任险及法律费用</span><span style="line-height: 115%;font-family: 宋体">赔偿时，</span><span style="line-height: 115%;font-family: 宋体">除第1至4项约定的材料外，还需第三方损害的相关资料及</span><span style="line-height: 115%;font-family: 宋体">相关费用单据；保</span><span style="line-height: 115%;font-family: 宋体">险金申请人所能提供的其他与本项申请相关的材料；</span></p><p style="margin-top:0;margin-right:0;margin-bottom:10px;margin-left:0;text-indent:28px;line-height:115%"><strong><span style="line-height: 115%;font-family: 宋体">第二十五条</span></strong><span style="line-height: 115%;font-family: 宋体"> 保险金申请人向保险人请求给付保险金的诉讼时效期间为二年，自其知道或者应当知道保险事故发生之日起计算。</span></p><p style="margin-bottom:10px;text-align:center;text-indent:28px;line-height:115%"><strong><span style="line-height: 115%;font-family: 宋体">争议处理和法律适用</span></strong></p><p style="margin-top:0;margin-right:0;margin-bottom:10px;margin-left:0;text-indent:28px;line-height:115%"><strong><span style="line-height: 115%;font-family: 宋体">第二十六条</span></strong><span style="line-height: 115%;font-family: 宋体"> 因履行本保险合同发生的争议，由当事人协商解决。协商不成的，提交保险单载明的仲裁机构仲裁；保险单未载明仲裁机构或者争议发生后未达成仲裁协议的，依法向人民法院起诉。</span></p><p style="margin-top:0;margin-right:0;margin-bottom:10px;margin-left:0;text-indent:28px;line-height:115%"><strong><span style="font-family: 宋体">第二十七条</span></strong> <span style="font-family: 宋体">与本保险合同有关的以及履行本保险合同产生的一切争议处理适用中华人民共和国法律（不包括港澳台地区法律）。</span></p><p style="margin-bottom:10px;text-align:center;line-height:115%"><strong><span style="line-height: 115%;font-family: 宋体">其他事项</span></strong></p><p style="margin-bottom:10px;text-indent:28px;line-height:115%"><strong><span style="line-height: 115%;font-family: 宋体">第二十八条</span></strong><span style="line-height: 115%;font-family: 宋体"> 在本保险合同成立后，投保人可以书面形式通知保险人解除合同，但保险人已根据本保险合同约定给付保险金的除外。</span></p><p style="margin-top:0;margin-right:0;margin-bottom:10px;margin-left:0;text-indent:28px;line-height:115%"><span style="line-height: 115%;font-family: 宋体">投保人解除本保险合同时，应提供下列证明文件和资料：</span></p><p style="margin-top:0;margin-right:0;margin-bottom:10px;margin-left:0;text-indent:28px;line-height:115%"><span style="line-height: 115%;font-family: 宋体">（1）保险合同解除申请书；</span></p><p style="margin-top:0;margin-right:0;margin-bottom:10px;margin-left:0;text-indent:28px;line-height:115%"><span style="line-height: 115%;font-family: 宋体">（2）保险单原件；</span></p><p style="margin-top:0;margin-right:0;margin-bottom:10px;margin-left:0;text-indent:28px;line-height:115%"><span style="line-height: 115%;font-family: 宋体">（3）保险费交付凭证；</span></p><p style="margin-top:0;margin-right:0;margin-bottom:10px;margin-left:0;text-indent:28px;line-height:115%"><span style="line-height: 115%;font-family: 宋体">（4）投保人身份证明。</span></p><p style="margin-top:0;margin-right:0;margin-bottom:10px;margin-left:0;text-indent:28px;line-height:115%"><span style="line-height: 115%;font-family: 宋体">投保人要求解除本保险合同，自保险人接到保险合同解除申请书之时起，本保险合同的效力终止。保险人收到上述证明文件和资料之日起30日内退还保险单的未满期净保费。</span></p><p style="margin-bottom:10px;text-indent:28px;line-height:115%"><strong><span style="font-family: 宋体">第二十九条</span></strong> <span style="font-family: 宋体">在本保险合同有效期内，经投保人和保险人协商，可以变更本保险合同的有关内容。变更本保险合同的，应当由保险人在原保险单或者其他保险凭证上批注或者附贴批单，或者由投保人和保险人订立变更的书面协议。</span></p><p>&nbsp;</p><p><br/></p>'
                    + '<a id="btnYWXTK" href="javascript:;" class="protocolBtn" style="color:#FFF;">同意并继续</a>'
                    + "</div></div>";
        var index2 = layer.open({
            type: 1,
            area: ['700px', '500px'],
            scrollbar: false,
            title: '驾驶员培训学校意外综合保险条款',
            content: htmlStr,
            success: function () {
                $('#btnYWXTK').unbind('click').click(function () {
                    $("#ywxTk").prop("checked", "checked");
                    $("#ywxTkSm").html("已阅读");
                    layer.close(index2);
                });
            }
        });
    });
	*/
});