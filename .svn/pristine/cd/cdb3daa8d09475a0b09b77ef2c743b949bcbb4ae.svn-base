function appsign(username,password,schooleid){
    if(igetCookieByUrlDecode("Webapi_LoginOn")!=null)//判断是否登录
        return false;
    	//alert(getCookieByUrlDecode("Webapi_LoginOn"));
	    var url = "http://jptest2.xuechebu.com/User/Login?callback=?";
  		var urljxlogin = "http://jptest2.xuechebu.com/user/stulogin?callback=?";
    
    //var url = "http://jptest2.xuechebu.com/User/Login?callback=?";
    //var urljxlogin = "http://jptest2.xuechebu.com/user/stulogin?callback=?";
    
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
	            alert("服务器异常，请反馈问题");
	        }
	    });
    } else {
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
	            window.location.reload();
	        },
	        error:function(xhr,type){
	            alert("服务器异常，请反馈问题");
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
