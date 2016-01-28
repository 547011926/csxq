
//分享	
$(document).ready(function (e) {
    var share_html = "";
    //share_html += '<a href="javascript:void(0)" id="smohan_share" title="分享"></a>';
    share_html += '<div id="Share"><ul>';
    share_html += '<li title="分享到微信"><a href="javascript:void(0)" class="share1"></a><span></span></li>';
    share_html += '<li title="分享到朋友圈"><a href="javascript:void(0)" class="share2"></a><span></span></li>';
    share_html += '<li title="分享到QQ空间"><a href="javascript:void(0)" class="share3" ></a><span></span></li>';
    share_html += '<li title="分享到QQ"><a href="javascript:void(0)" class="share4"></a><span></span></li>';
    share_html += '<li title="分享到新浪微博"><a href="javascript:void(0)" class="share5"></a><span></span></li>';
    share_html += '<li title="分享到腾讯"><a href="javascript:void(0)" class="share6"></a><span></span></li>';
    share_html += '</ul></div>';
    $('body').prepend(share_html);
    $('.share').SmohanPopLayer({Shade: true, Event: 'click', Content: 'Share', Title: '分享到'});
    $('#Share li').each(function () {
        $(this).hover(function (e) {
            $(this).find('a').animate({marginTop: 2}, 'easeInOutExpo');
            $(this).find('span').animate({opacity: 0.2}, 'easeInOutExpo');
        }, function () {
            $(this).find('a').animate({marginTop: 12}, 'easeInOutExpo');
            $(this).find('span').animate({opacity: 1}, 'easeInOutExpo');
        });
    });
    var _title,_source,_sourceUrl,_pic,_showcount,_desc,_summary,_site,
        _width = 600,
        _height = 600,
        _top = (screen.height-_height)/2,
        _left = (screen.width-_width)/2,
        _url = 'http://traveliceland.lofter.com/post/352b58_579d8e7',
        _pic = 'http://m3.img.srcdd.com/farm4/d/2015/0113/11/6AE3FEBE500857BF82CA97E8F03DD6A8_B500_900_500_411.jpeg';
//微信
    $('#Share li a.share1').click(function (e) {
    });
//朋友圈
    $('#Share li a.share2').click(function (e) {
        /*var param = {
         url: share_url,
         appkey: '678438995',
         title: share_title,
         pic: share_pic,
         ralateUid: '3061825921',
         rnd: new Date().valueOf()
         }
         var temp = [];
         for (var p in param) {
         temp.push(p + '=' + encodeURIComponent(param[p] || ''))
         }
         window.open('http://v.t.sina.com.cn/share/share.php?' + temp.join('&'));*/
    });
//QQ空间
    $('#kj').click(function (e) {
        var _shareUrl = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?';
        _shareUrl += 'url=' + encodeURIComponent(_url||document.location);   //参数url设置分享的内容链接|默认当前页location
       // _shareUrl += '&showcount=' + _showcount||0;      //参数showcount是否显示分享总数,显示：'1'，不显示：'0'，默认不显示
        _shareUrl += '&desc=' + encodeURIComponent(_desc||'分享的描述');    //参数desc设置分享的描述，可选参数
        _shareUrl += '&summary=' + encodeURIComponent(_summary||'分享摘要');    //参数summary设置分享摘要，可选参数
        _shareUrl += '&title=' + encodeURIComponent(_title||document.title);    //参数title设置分享标题，可选参数
        _shareUrl += '&site=' + encodeURIComponent(_site||'');   //参数site设置分享来源，可选参数
        _shareUrl += '&pics=' + encodeURIComponent(_pic||'');   //参数pics设置分享图片的路径，多张图片以＂|＂隔开，可选参数
        window.open(_shareUrl,'_blank','width='+_width+',height='+_height+',top='+_top+',left='+_left+',toolbar=no,menubar=no,scrollbars=no,resizable=1,location=no,status=0');    });
//QQ
    $('#Share li a.share4').click(function (e) {
        window.open('http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?to=pengyou&url=' + share_url + '&pics=' + share_pic + '&title=' + share_title + '&site=' + share_from + '', 'newwindow');
    });
//新浪微博
    $('#Share li a.share5').click(function (e) {
        var _shareUrl = 'http://v.t.sina.com.cn/share/share.php?&appkey=895033136';     //真实的appkey，必选参数
        _shareUrl += '&url='+ encodeURIComponent(_url||document.location);     //参数url设置分享的内容链接|默认当前页location，可选参数
        _shareUrl += '&title=' + encodeURIComponent(_title||document.title);    //参数title设置分享的标题|默认当前页标题，可选参数
        _shareUrl += '&source=' + encodeURIComponent(_source||'');
        _shareUrl += '&sourceUrl=' + encodeURIComponent(_sourceUrl||'');
        _shareUrl += '&content=' + 'utf-8';   //参数content设置页面编码gb2312|utf-8，可选参数
        _shareUrl += '&pic=' + encodeURIComponent(_pic||'');  //参数pic设置图片链接|默认为空，可选参数
        window.open(_shareUrl,'_blank','width='+_width+',height='+_height+',top='+_top+',left='+_left+',toolbar=no,menubar=no,scrollbars=no, resizable=1,location=no,status=0')    });
//腾讯微博
    $('#Share li a.share6').click(function (e) {
        var _shareUrl = 'http://v.t.qq.com/share/share.php?';
        _shareUrl += 'title=' + encodeURIComponent(_title||document.title);    //分享的标题
        _shareUrl += '&url=' + encodeURIComponent(_url||location.href);    //分享的链接
        _shareUrl += '&appkey=5bd32d6f1dff4725ba40338b233ff155';    //在腾迅微博平台创建应用获取微博AppKey
        _shareUrl += '&site=' + encodeURIComponent(_site||'');   //分享来源
        _shareUrl += '&pic=' + encodeURIComponent(_pic||'');    //分享的图片，如果是多张图片，则定义var _pic='图片url1|图片url2|图片url3....'
        window.open(_shareUrl,'_blank','width='+_width+',height='+_height+',left='+_left+',top='+_top+',toolbar=no,menubar=no,scrollbars=no,resizable=1,location=no,status=0');    });
});






















function toshare() {
    $(".am-share").addClass("am-modal-active");
    if ($(".sharebg").length > 0) {
        $(".sharebg").addClass("sharebg-active");
    } else {
        $("body").append('<div class="sharebg"></div>');
        $(".sharebg").addClass("sharebg-active");
    }
    $(".sharebg-active,.share_btn").click(function () {
        $(".am-share").removeClass("am-modal-active");
        setTimeout(function () {
            $(".sharebg-active").removeClass("sharebg-active");
            $(".sharebg").remove();
        }, 300);
    })
}

















































/*微信分享*/
function _WXShare(img,width,height,title,desc,url,appid){
    //初始化参数
    img=img||'http://a.zhixun.in/plug/img/ico-share.png';
    width=width||100;
    height=height||100;
    title=title||document.title;
    desc=desc||document.title;
    url=url||document.location.href;
    appid=appid||'';
    //微信内置方法
    function _ShareFriend() {
        WeixinJSBridge.invoke('sendAppMessage',{
            'appid': appid,
            'img_url': img,
            'img_width': width,
            'img_height': height,
            'link': url,
            'desc': desc,
            'title': title
        }, function(res){
            _report('send_msg', res.err_msg);
        })
    }
    function _ShareTL() {
        WeixinJSBridge.invoke('shareTimeline',{
            'img_url': img,
            'img_width': width,
            'img_height': height,
            'link': url,
            'desc': desc,
            'title': title
        }, function(res) {
            _report('timeline', res.err_msg);
        });
    }
    function _ShareWB() {
        WeixinJSBridge.invoke('shareWeibo',{
            'content': desc,
            'url': url,
        }, function(res) {
            _report('weibo', res.err_msg);
        });
    }
    // 当微信内置浏览器初始化后会触发WeixinJSBridgeReady事件。
    document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
        // 发送给好友
        WeixinJSBridge.on('menu:share:appmessage', function(argv){
            _ShareFriend();
        });
        // 分享到朋友圈
        WeixinJSBridge.on('menu:share:timeline', function(argv){
            _ShareTL();
        });
        // 分享到微博
        WeixinJSBridge.on('menu:share:weibo', function(argv){
            _ShareWB();
        });
    }, false);
}