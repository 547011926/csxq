function appsign(username,password,schooleid){
    if(igetCookieByUrlDecode("Webapi_LoginOn")!=null)//判断是否登录
        return false;
	//var url = "http://api.xuechebu.com/User/Login?callback=?";
  	//var urljxlogin = "http://api.xuechebu.com/user/stulogin?callback=?";
    
    var url = "http://jptest2.xuechebu.com/User/Login?callback=?";
    var urljxlogin = "http://jptest2.xuechebu.com/user/stulogin?callback=?";
    var log = "username="+username+"mmpassword="+password+"mmcode="+schooleid;
    		$.ajaxJSONP({
    			url : "http://jptest3.xuechebu.com/api/log/WriteLog?callback=?",
    			data: {
	            txt:log,
	            ISJSONP:"true",
	            os:"appweb"
	        },
	        success: function(data){
	        		console.log(data);
	        },
	        error:function(xhr,type){
	            alert("亲～赶紧使用手机号登录来报名吧或拨打400-969-8088客服咨询报名");
	        }
    });
   if(username==undefined || username=="" ||username ==null||password==undefined || password=="" ||password ==null){
   		return;
   }
    if(schooleid==undefined||schooleid == "" ||schooleid == null){
    		$.ajaxJSONP({
	        url: url,
	        data: {
	            username:username,
	            password:password,
	            usertype:"0",
	            ISJSONP:"true",
	            os:"appweb"
	        },
	        success: function(data){
	        		data = eval("(" + data + ")");
	        		if(data.code == 1) {
	        			alert(data.message);
	        		}
	        		//alert("登录成功,发布删掉");
	            window.location.reload();
	        },
	        error:function(xhr,type){
	            alert("程序员哥哥正在努力改BUG，请拨打400-969-8088客服咨询报名");
	        }
	    });
    } else {
    		if(username==null||username==""){
    			alert("亲～赶紧使用手机号登录来报名吧或拨打400-969-8088客服咨询报名，程序员妹妹正在抓紧改善~");
    		};
	    $.ajaxJSONP({
	        url: urljxlogin,
	        data: {
	            username:username,
	            password:password,
	            code:schooleid,
	            ISJSONP:"true",
	            os:"appweb"
	        },
	        success: function(data){
	        		data = eval("(" + data + ")");
	        		if(data.code == 1) {
	        			alert(data.message);
	        		}
	        		//alert("登录成功,发布删掉");
	            //window.location.reload();
	        },
	        error:function(xhr,type){
	            alert("亲～赶紧使用手机号登录来报名吧或拨打400-969-8088客服咨询报名");
	        }
	    });
    }
    return true;
};
function igetCookieByUrlDecode(Name) {
    var search = Name + "=";
    if (document.cookie.length > 0) { // if there are any cookies
        offset = document.cookie.indexOf(search);
        if (offset != -1) { // if cookie exists
            offset += search.length;
            end = document.cookie.indexOf(";", offset);
            if (end == -1)
                end = document.cookie.length;

            return decodeURIComponent(document.cookie.substring(offset, end)); //对应encodeURIComponent或asp.net HttpUtility.UrlEncode加密的解密            
        }
    }
    return null;
};
