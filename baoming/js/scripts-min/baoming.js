function selectPapers(){var e=$("#selPapers").val();e==1?$("#textSfzh").xqValidate(validatePrompt.xx_sfzh,validateFunction.xxSfzhFunc,""):e==2&&$("#textSfzh").xqValidate(validatePrompt.xx_jgz,validateFunction.xxJgzFunc,"")}define("global",[],function(){var e="http://jptest3.xuechebu.com/",t="http://tm.xuechebu.com/web/",n="V1.0.0";return{urlHttp:e,urlHttp_file:t,m_version:n}}),define("core",[],function(){function Check(){this.result=function(data,callback,failedcallback){if(!data)return;data.code==undefined&&(data=eval("("+data+")"));if(data.code==0)return callback(data);if(data.code!=101&&data.code!=102&&data.code!=103){var msg=data.message&&data.message.length?data.message:"发生未知错误！";return alert(msg),failedcallback&&failedcallback(data),!1}}}function GetUrlRequest(){var e=location.search,t=new Object;if(e.indexOf("?")==-1)return null;var n=e.substr(1);strs=n.split("&");for(var r=0;r<strs.length;r++)t[strs[r].split("=")[0]]=strs[r].split("=")[1];return t}function createClose(e,t,n){var r=document.createElement("div"),i=document.getElementById("body"),s=document.createElement("div");r.className="mask",r.innerHTML=e,r.style.width=t,r.style.height=n,r.style.top=document.body.scrollTop+"px",s.className="close",s.innerHTML="x",r.appendChild(s),i.appendChild(r),$(".close").on("touchstart",function(){this.parentNode.style.display="none"})}function goBack(e){navigator.userAgent.indexOf("MSIE")>=0&&navigator.userAgent.indexOf("Opera")<0?history.length>0?window.history.go(-1):window.location=e:navigator.userAgent.indexOf("Firefox")>=0||navigator.userAgent.indexOf("Opera")>=0||navigator.userAgent.indexOf("Safari")>=0||navigator.userAgent.indexOf("Chrome")>=0||navigator.userAgent.indexOf("WebKit")>=0?window.history.length>1?window.history.go(-1):window.location=e:window.history.go(-1)}var ClientType="",identifyingStr=navigator.userAgent.toLowerCase();identifyingStr.indexOf("iphone")!=-1?ClientType="iphone":identifyingStr.indexOf("android")!=-1?ClientType="Android":identifyingStr.indexOf("windows")!=-1&&identifyingStr.indexOf("phone")!=-1?ClientType="windowsphone":ClientType="";var getJSONPCache=function(e,t,n){t=$.extend({ISJSONP:"true",os:ClientType},t),e+="?callback=?",$.ajaxJSONP({url:e,data:t,success:n,error:function(e,t){}})},getJSONCache=function(e,t,n){$.ajax({url:e,dataType:"json",type:"get",data:t,success:n})};return String.prototype.format=function(e){var t=this;if(arguments.length>0)if(arguments.length==1&&typeof e=="object"){for(var n in e)if(e[n]!=undefined){var r=new RegExp("({"+n+"})","g");t=t.replace(r,e[n])}}else for(var i=0;i<arguments.length;i++)if(arguments[i]!=undefined){var r=new RegExp("({)"+i+"(})","g");t=t.replace(r,arguments[i])}return t},String.prototype.convert=function(e,t){return e==null||e==undefined||e=="1901-01-01"||e=="0001-01-01"?t==undefined?"":t:e},{getJSONPCache:function(e,t,n){getJSONPCache(e,t,n)},getJSONCache:function(e,t,n){getJSONCache(e,t,n)},result:function(e,t,n){(new Check).result(e,t,n)},getUrlRequest:function(){return GetUrlRequest()},createClose:function(e,t,n){createClose(e,t,n)},goBack:goBack}}),define("user",["core"],function(core){function getCookie(e){var t=e+"=";if(document.cookie.length>0){offset=document.cookie.indexOf(t);if(offset!=-1)return offset+=t.length,end=document.cookie.indexOf(";",offset),end==-1&&(end=document.cookie.length),unescape(document.cookie.substring(offset,end))}return null}function getCookieByUrlDecode(e){var t=e+"=";if(document.cookie.length>0){offset=document.cookie.indexOf(t);if(offset!=-1)return offset+=t.length,end=document.cookie.indexOf(";",offset),end==-1&&(end=document.cookie.length),decodeURIComponent(document.cookie.substring(offset,end))}return null}var checklogin=function(){return getCookie("Webapi_LoginOn")==null||getCookie("Webapi_LoginOn_client")==null?!1:!0},getuserinfo=function(){var qs=core.getUrlRequest(),list="";if(!checklogin())return alert("没有登录"),!1;var data=getCookieByUrlDecode("Webapi_LoginOn_client");return data==null||data==undefined?(alert("没有登录"),!1):(list=eval("("+data+")"),list)},sign=function(e,t){alert("用户名："+e+",密码："+t),alert("已成功调用sign方法");var n="http://jptest2.xuechebu.com/User/Login?callback=?";return core.getJSONCache(n,{username:e,password:t},function(e){alert(getCookie("Webapi_LoginOn_client"))}),!0},signout=function(){};return{getCookie:function(e){return getCookie(e)},getCookieByUrlDecode:function(e){return getCookieByUrlDecode(e)},checklogin:function(){return checklogin()},getuserinfo:function(){return getuserinfo()}}});var createTip=function(e){var t=document.createElement("div");return clearTip(e),e.parent().append(t),t},clearTip=function(e){var t=e.parent().find(".error");for(var n=0;n<t.length;n++)t[n].parentNode.removeChild(t[n])},validateSettings={onFocus:{state:null,container:"_error",style:"focus",run:function(e){clearTip(e.element)}},isNull:{state:0,container:"_error",style:"error",run:function(e,t){if(t!=undefined&&t!=null){e.element.attr("sta",0);var n=createTip(e.element);n.className=validateSettings.isNull.style,n.innerHTML=t}else e.element.attr("sta",2)}},error:{state:1,container:"_error",style:"error",run:function(e,t){e.element.attr("sta",1);var n=createTip(e.element);n.className=validateSettings.error.style,n.innerHTML=t}},succeed:{state:2,container:"_succeed",style:"succeed",run:function(e){e.element.attr("sta",2)}}},validateRules={isNull:function(e){return e==""||typeof e!="string"},isSfzh:function(e){var t=!1;!e&&15!=e.length&&18!=e.length&&(t=!1);if(15==e.length){var n=e.substring(6,8),r=e.substring(8,10),i=e.substring(10,12),s=e.substring(14,15),o=new Date(n,parseFloat(r)-1,parseFloat(i));o.getYear()!=parseFloat(n)||o.getMonth()!=parseFloat(r)-1||o.getDate()!=parseFloat(i)?t=!1:t=!0}if(18==e.length){var n=e.substring(6,10),r=e.substring(10,12),i=e.substring(12,14),s=e.substring(14,17),o=new Date(n,parseFloat(r)-1,parseFloat(i));if(o.getFullYear()!=parseFloat(n)||o.getMonth()!=parseFloat(r)-1||o.getDate()!=parseFloat(i))t=!1;var u=[7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2,1],a=[1,0,10,9,8,7,6,5,4,3,2],f=0,l=e.split("");l[17].toLowerCase()=="x"&&(l[17]=10);for(var c=0;c<17;c++)f+=u[c]*l[c];var c=f%11;l[17]!=a[c]?t=!1:t=!0}return t},isMoney:function(e){return(new RegExp(/^0?(13|15|18|14|17)[0-9]{9}$/)).test(e)}},validatePrompt={xx_name:{onFocus:"请输入姓名",succeed:"",isNull:"姓名不能为空!",error:"姓名过长",error2:"姓名不能包含特殊符号",class1:"grdd"},xx_sfzh:{onFocus:"请输入身份证号",succeed:"",isNull:"身份证号不能为空!",error:"身份证号不正确",class1:"grdd"},xx_tel:{onFocus:"请输入手机号码",succeed:"",isNull:"手机号码不能为空!",error:"手机号码不正确",class1:"grdd"},xx_telphone:{onFocus:"请输入联系电话",succeed:"",error:"联系电话不正确",error2:"联系电话过长",class1:"grdd"},xx_referralCode:{onFocus:"请输入推荐人手机号",succeed:"",error:"推荐人手机号不正确",error2:"手机号不能和报名人手机号一致",class1:"grdd"},xx_remarks:{onFocus:"请输入备注",succeed:"",error:"备注内容过长",class1:"grdd"},xx_jgz:{onFocus:"请输入军官证",succeed:"",isNull:"军官证不能为空",error:"军官证过长",class1:"grdd"}},validateFunction={xxnameFunc:function(e){var t=validateRules.isNull(e.value);if(t){validateSettings.error.run(e,e.prompts.isNull);return}var n=e.value.length>10;if(n){validateSettings.error.run(e,e.prompts.error);return}var r=RegExp(/[(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\-)(\_)(\+)(\=)(\[)(\])(\{)(\})(\|)(\\)(\;)(\:)(\')(\")(\,)(\.)(\/)(\<)(\>)(\?)(\)]+/);if(r.test(e.value)){validateSettings.error.run(e,e.prompts.error2);return}validateSettings.succeed.run(e)},xxSfzhFunc:function(e){var t=validateRules.isNull(e.value);if(t){validateSettings.error.run(e,e.prompts.isNull);return}var n=validateRules.isSfzh(e.value);if(!n){validateSettings.error.run(e,e.prompts.error);return}validateSettings.succeed.run(e)},xxTelphoneFunc:function(e){if(e.value.length>20){validateSettings.error.run(e,e.prompts.error2);return}validateSettings.succeed.run(e)},xxTelFunc:function(e){var t=validateRules.isNull(e.value);if(t){validateSettings.error.run(e,e.prompts.isNull);return}var n=validateRules.isMoney(e.value);if(!n){validateSettings.error.run(e,e.prompts.error);return}validateSettings.succeed.run(e)},xxReferralCodeFunc:function(e){var t=validateRules.isNull(e.value);if(t)validateSettings.succeed.run(e);else{var n=validateRules.isMoney(e.value);if(!n){validateSettings.error.run(e,e.prompts.error);return}$("#textTel").val().trim()==e.value.trim()?validateSettings.error.run(e,e.prompts.error2):validateSettings.succeed.run(e)}},xxRemarksFunc:function(e){if(e.value.length>80){validateSettings.error.run(e,e.prompts.error);return}validateSettings.succeed.run(e)},xxJgzFunc:function(e){var t=validateRules.isNull(e.value);if(t){validateSettings.error.run(e,e.prompts.isNull);return}if(e.value.length>30){validateSettings.error.run(e,e.prompts.error);return}validateSettings.succeed.run(e)},FORM_submit:function(e){var t=!0;for(var n=0;n<e.length;n++){if($(e[n]).attr("sta")!=2){t=!1;break}t=!0}return t}};(function(e){e.fn.xqValidate=function(t,n,r,i){var s=e(this),o=s.attr("type");if(r==1){var u=s.val(),a=s.attr("sta");if(i)n({prompts:t,element:s,value:u,errorEle:_error,succeedEle:_succeed});else if(u==""||u=="-1")validateSettings.isNull.run({prompts:t,element:s},t.isNull);else{if(a==1||a==2)return;n({prompts:t,element:s,value:u})}}else{typeof r=="string"&&s.val(r),(o=="checkbox"||o=="radio")&&s.attr("checked")==1&&s.attr("sta",validateSettings.succeed.state);switch(o){case"number":case"text":case"password":s.unbind("focus").bind("focus",function(){var e=s.val();validateSettings.onFocus.run({prompts:t,element:s,value:e})}).unbind("blur").bind("blur",function(){var e=s.val();n({prompts:t,element:s,value:e})})}}}})(Zepto),define("xqvalidate",function(){}),require.config({paths:{global:"../../global",core:"../common.core",xqvalidate:"../lib/xqvalidate",user:"user"},shim:{}}),require(["global","core","user","xqvalidate"],function(e,t,n,r){var i="",s=t.getUrlRequest();if(s==null){t.goBack("index.html");return}if(s.id==null){t.goBack("index.html");return}var o=null;if(!n.checklogin()){alert("对不起，您未登录"),t.goBack("index.html");return}o=n.getuserinfo(),$("#CJRID").val(o.Id),$("#BXID").val(s.id);if(s.isPass!=null||s.isPass!=undefined)s.isPass==1?s.zflx==1?window.location="zhifufangshi.html?gonext=no&id="+s.orderid:s.zflx==2?window.location="success.html?gonext=no&id="+s.orderid:window.location="success.html?gonext=no&id="+s.orderid:s.isPass==0?alert(decodeURI(s.msg)):alert(decodeURI(s.msg));var u=function(){var n=e.urlHttp+"JXBMX/GetBXJGListById";t.getJSONPCache(n,{Id:s.id},function(e){t.result(e,function(e){i=e.data.Result.JGID;var t=$("#baoming"),n="<p>{JXNAME}<span>{BXMC}</span></p><p>￥{YHJG}</p><p>优惠活动<span>{YHHD}</span></p>",r=$("#baomingBox");e.data.Result.YHHD=e.data.Result.YHHD==null?"":e.data.Result.YHHD,t.html(n.format(e.data.Result)),e.data.Result.TSFWID.indexOf("1")==-1?($("#ZFLX").remove(),$("#zhifu").remove()):($("#zhifu").css("display","block"),$(".xieyi").css("display","block")),e.data.Result.YHHD!=""&&e.data.Result.YHHD!=null&&e.data.Result.YHHD!=undefined&&$("#tuijianren").css("display","block"),$("#orderMoney").text(e.data.Result.YHJG)})});var r=function(e){$(e).parent().find("em").removeClass("cur"),$(e).addClass("cur")},o={bmcl:"<h1>一、个人资料</h1><h2>1、身份证</h2><h3>（1）身份证原件（包括有效期内临时身份证）</h3><h3>（2）身份证复印件（签名）电子版</h3><img src='images/01.jpg'><span>注意事项：</span><p>需在右下角签名</p><p>正反面在一张A4纸上</p><p>复印件应1:1比例,有清楚的边框与底纹</p><h2>2、照片：一寸白底免冠彩色证件6张（如下图）</h2> <p>驾驶证申请人本人6个月内的正面免冠彩色单人半身小一寸照片</p><p>驾驶证照片尺寸：照片大小为3.2cm×2.2cm，头部长度1.9cm～2.2cm，头部宽度1.4cm～1.6cm，白色背景</p><p>不能穿着制式服装照相，并且相片清晰可见，神态自然</p><p><strong>拍摄地点及注意事项：</strong>车管所或者外面持有正规营业执照的照相管。如在外照相管拍照，在拍时只需要跟照相馆说明“你要拍考驾照的的相片”，照相馆自会按规格执行。只需要按照相馆指示拍摄完毕即可。</p><img src='images/02.jpg'><h2>3、非京户籍暂住证（或工作证）原件</h2><p>暂住证示意图</p><img src='images/03.jpg'><span>或工作居住证示意图</span><img src='images/04.jpg'><h1>体验证明原件</h1><h2>二、《机动车驾驶人身体体检证明》示意图</h2><img src='images/05.jpg'>",bmtj:"<h1>年龄规定：</h1><p>申请小型汽车、小型自动挡汽车、残疾人专用小型自动挡载客汽车、轻便摩托车准驾车型的，在18周岁以上，70周岁；</p><h1>身体条件：</h1><p>身高：申请小型客车准驾车型的，身高为 145CM 以上，申请大型客车准驾车型的，身高为 155CM 以上；</p><p>视力：两眼裸视或矫正视力达到对数表 5.0以上；申请小客车，两眼裸视或矫正视力达到对数表 4.9 以上;</p><p>辨色力：无红绿色盲；</p><p>听力：两耳分别距音叉50厘米能辨别声源方向。有听力障碍但佩戴助听设备能够达到以上条件的，可以申请小型汽车、小型自动挡汽车准驾车型的机动车驾驶证；</p><p>上肢：双手拇指健全，每只手其他手指必须有三指健全，肢体和手指运动功能正常。但手指末节残缺或者右手拇指缺失的，可以申请小型汽车、小型自动挡汽车准驾车型的机动车驾驶证；</p><p>下肢：双下肢健全且运动功能正常，不等长度不得大于5厘米。但左下肢缺失或者丧失运动功能的，可以申请小型自动挡汽车准驾车型的机动车驾驶证。右下肢、双下肢缺失或者丧失运动功能但能够自主坐立的，可以申请残疾人专用小型自动挡载客汽车准驾车型的机动车驾驶证；</p><p>躯干、颈部：无运动功能障碍；</p><h1>证件要求：</h1><p>提交白色背景真面免冠一寸彩色照片？ 张。本人戴眼镜照片也应戴眼镜；</p><p>提交身份证件（居民身份证），外省市人员还应提交暂住证或居住证（有效期限一年以上）；</p><h1>老年人报名学车：</h1><p>按国家规定60周岁至69周岁零10个月年龄段的老年人可以报名学车，但按我校规定，必须报考老年班。老年人体检需到指定的 119 家医疗机构，报名时将体检表一并带到驾校。</p><h1>肢障人报名：</h1><p>按国家规定 肢障人员可以申领驾驶证，体检需到指定的 122 家医疗机构。</p>"};(function(){$("#hukou em").on("touchstart",function(){r(this),$("#HKLX").val($(this).attr("data-val"))}),$("#zhifu em").on("touchstart",function(){r(this),$("#ZFLX").val($(this).attr("data-val"))}),$(".baomingxuanxiang em").on("touchstart",function(){this.innerHTML=="报名条件"?t.createClose(o.bmtj,"100%","100%"):this.innerHTML=="报名材料"&&t.createClose(o.bmcl,"100%","100%")});var s=!1,u="";$("#xieyiCentent").click(function(){if(!s&&u==""){if(i==null||i==""){alert("对不起，程序未响应，请稍后再试");return}n=e.urlHttp+"Agreement/GetAgreementByJgidAndCode",t.getJSONPCache(n,{jgid:i,code:"xcbbmxy"},function(e){t.result(e,function(e){if(e.data.Result==null)return;u=e.data.Result.CONTENT,s=!0,t.createClose(e.data.Result.CONTENT,"100%","100%")})})}else t.createClose(u,"100%","100%")})})(Zepto)},a=function(){u();var e=window.location.href,t=e.indexOf("login=1")};a();var f=function(){$("#hukou em").each(function(){$(this).hasClass("cur")&&$("#HKLX").val($(this).attr("data-val"))}),$("#zhifu em").each(function(){$(this).hasClass("cur")&&$("#ZFLX").val($(this).attr("data-val"))}),selectPapers(),$("#textName").xqValidate(validatePrompt.xx_name,validateFunction.xxnameFunc,""),$("#textTel").xqValidate(validatePrompt.xx_tel,validateFunction.xxTelFunc,""),$("#textTelephone").xqValidate(validatePrompt.xx_telphone,validateFunction.xxTelphoneFunc,""),$("#textReferralCode").xqValidate(validatePrompt.xx_referralCode,validateFunction.xxReferralCodeFunc,""),$("#textTel").val(o.phoneNum)};f(),$("#selPapers").on("change",function(){selectPapers()}),$("#btn_commit").on("click",function(){if($("#ClientCode").val()!=1){alert("出现错误，请刷新重试");return}if($("#BXID").val()==null||$("#BXID").val()==undefined){alert("对不起，班型出现错误，请稍后重试");return}if($("#HKLX").val()==null||$("#HKLX").val()==undefined){alert("对不起，户口类型出现错误，请稍后重试");return}if($("#CJRID").val()==null||$("#CJRID").val()==undefined){alert("对不起，您未登录"),history.go(-1);return}$("#textName").xqValidate(validatePrompt.xx_name,validateFunction.xxnameFunc,!0),$("#textTel").xqValidate(validatePrompt.xx_tel,validateFunction.xxTelFunc,!0);var t=$("#selPapers").val();t==1?$("#textSfzh").xqValidate(validatePrompt.xx_sfzh,validateFunction.xxSfzhFunc,!0):$("#textSfzh").xqValidate(validatePrompt.xx_jgz,validateFunction.xxJgzFunc,!0),$("#textTelephone").xqValidate(validatePrompt.xx_telphone,validateFunction.xxTelphoneFunc,!0),$("#textReferralCode").xqValidate(validatePrompt.xx_referralCode,validateFunction.xxReferralCodeFunc,!0);var n=!1;n=validateFunction.FORM_submit(["#textName","#textSfzh","#textTel","#textTelephone","#textReferralCode"]);if(n){if(!$("#xieyi").is(":checked")){alert("请阅读并同意《三方代收代付协议》");return}$("#fm").attr("action",e.urlHttp+"JXBMX/AddBmxx"),confirm("是否确认提交？")&&$("#fm").submit()}}),$(document).scroll(function(){$(".mask").css("top",document.body.scrollTop+"px")})}),define("baoming",function(){});