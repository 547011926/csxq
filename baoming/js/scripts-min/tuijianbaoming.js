function toshare(){$(".am-share").addClass("am-modal-active"),$(".sharebg").length>0?$(".sharebg").addClass("sharebg-active"):($("body").append('<div class="sharebg"></div>'),$(".sharebg").addClass("sharebg-active")),$(".sharebg-active,.share_btn").click(function(){$(".am-share").removeClass("am-modal-active"),setTimeout(function(){$(".sharebg-active").removeClass("sharebg-active"),$(".sharebg").remove()},300)})}function _WXShare(e,t,n,r,i,s,o){function u(){WeixinJSBridge.invoke("sendAppMessage",{appid:o,img_url:e,img_width:t,img_height:n,link:s,desc:i,title:r},function(e){_report("send_msg",e.err_msg)})}function a(){WeixinJSBridge.invoke("shareTimeline",{img_url:e,img_width:t,img_height:n,link:s,desc:i,title:r},function(e){_report("timeline",e.err_msg)})}function f(){WeixinJSBridge.invoke("shareWeibo",{content:i,url:s},function(e){_report("weibo",e.err_msg)})}e=e||"http://a.zhixun.in/plug/img/ico-share.png",t=t||100,n=n||100,r=r||document.title,i=i||document.title,s=s||document.location.href,o=o||"",document.addEventListener("WeixinJSBridgeReady",function(){WeixinJSBridge.on("menu:share:appmessage",function(e){u()}),WeixinJSBridge.on("menu:share:timeline",function(e){a()}),WeixinJSBridge.on("menu:share:weibo",function(e){f()})},!1)}$(document).ready(function(e){var t="";t+='<div id="Share"><ul>',t+='<li title="分享到微信"><a href="javascript:void(0)" class="share1"></a><span></span></li>',t+='<li title="分享到朋友圈"><a href="javascript:void(0)" class="share2"></a><span></span></li>',t+='<li title="分享到QQ空间"><a href="javascript:void(0)" class="share3" ></a><span></span></li>',t+='<li title="分享到QQ"><a href="javascript:void(0)" class="share4"></a><span></span></li>',t+='<li title="分享到新浪微博"><a href="javascript:void(0)" class="share5"></a><span></span></li>',t+='<li title="分享到腾讯"><a href="javascript:void(0)" class="share6"></a><span></span></li>',t+="</ul></div>",$("body").prepend(t),$(".share").SmohanPopLayer({Shade:!0,Event:"click",Content:"Share",Title:"分享到"}),$("#Share li").each(function(){$(this).hover(function(e){$(this).find("a").animate({marginTop:2},"easeInOutExpo"),$(this).find("span").animate({opacity:.2},"easeInOutExpo")},function(){$(this).find("a").animate({marginTop:12},"easeInOutExpo"),$(this).find("span").animate({opacity:1},"easeInOutExpo")})});var n,r,i,s,o,u,a,f,l=600,c=600,h=(screen.height-c)/2,p=(screen.width-l)/2,d="http://traveliceland.lofter.com/post/352b58_579d8e7",s="http://m3.img.srcdd.com/farm4/d/2015/0113/11/6AE3FEBE500857BF82CA97E8F03DD6A8_B500_900_500_411.jpeg";$("#Share li a.share1").click(function(e){}),$("#Share li a.share2").click(function(e){}),$("#kj").click(function(e){var t="http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?";t+="url="+encodeURIComponent(d||document.location),t+="&desc="+encodeURIComponent(u||"分享的描述"),t+="&summary="+encodeURIComponent(a||"分享摘要"),t+="&title="+encodeURIComponent(n||document.title),t+="&site="+encodeURIComponent(f||""),t+="&pics="+encodeURIComponent(s||""),window.open(t,"_blank","width="+l+",height="+c+",top="+h+",left="+p+",toolbar=no,menubar=no,scrollbars=no,resizable=1,location=no,status=0")}),$("#Share li a.share4").click(function(e){window.open("http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?to=pengyou&url="+share_url+"&pics="+share_pic+"&title="+share_title+"&site="+share_from+"","newwindow")}),$("#Share li a.share5").click(function(e){var t="http://v.t.sina.com.cn/share/share.php?&appkey=895033136";t+="&url="+encodeURIComponent(d||document.location),t+="&title="+encodeURIComponent(n||document.title),t+="&source="+encodeURIComponent(r||""),t+="&sourceUrl="+encodeURIComponent(i||""),t+="&content=utf-8",t+="&pic="+encodeURIComponent(s||""),window.open(t,"_blank","width="+l+",height="+c+",top="+h+",left="+p+",toolbar=no,menubar=no,scrollbars=no, resizable=1,location=no,status=0")}),$("#Share li a.share6").click(function(e){var t="http://v.t.qq.com/share/share.php?";t+="title="+encodeURIComponent(n||document.title),t+="&url="+encodeURIComponent(d||location.href),t+="&appkey=5bd32d6f1dff4725ba40338b233ff155",t+="&site="+encodeURIComponent(f||""),t+="&pic="+encodeURIComponent(s||""),window.open(t,"_blank","width="+l+",height="+c+",left="+p+",top="+h+",toolbar=no,menubar=no,scrollbars=no,resizable=1,location=no,status=0")})});