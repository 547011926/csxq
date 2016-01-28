require.config({
    paths: {
        "global": "../../global",
        "core": "../common.core"
    },
    shim: {

    }
});
require(['global', "core"], function (g, core) {
    var params  = core.getUrlRequest();
    if(params==null)
        top.location.href = "index.html";
    //获取班型价格列表
    var getBXJAList = function () {
        //alert(checklogin());
        var url = g.urlHttp_file + "FileData/"+params.jgid+"/jxbx.json";
        core.getJSONCache(url, {}, function (data) {
	
            var banXingJiaGeList = '<div class="banxingjiage-list"><div class="drivingImg">{BXIMG}</div><div class="driving"><h1>{BXMC}</h1><h2>￥{YHJG}<span>{JG}</span></h2><p>{LCSJ}</p><p>{CXMC}&nbsp;&nbsp;{JZLX}</p><a href = "baominginfo.html?id={ID}">立即报名</a></div></div> ';
            var ary=[];
            for (var i = 0; i < data.length; i++) {
                var cur = data[i];
                cur.BXIMG  = (cur.BXIMG==null || cur.BXIMG=="") ? "" : ("<img src='{0}'>").format(cur.BXIMG);
                ary.push(banXingJiaGeList.format(cur));
            }
            $("#banxingjiage-lists").append(ary.join(""));
        });
    };



    function init() {
    	var back = $('.backOff i');
		back.on('click',function(){
			window.location = 'index.html';
		})
    	
    	//隱藏統計
		$('#tjIcon').hide();
		
        getBXJAList();
        var url = window.location.href;
		//alert(getCookieByUrlDecode("Webapi_LoginOn_client"));
    };
    init();
});