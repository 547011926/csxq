require.config({
    paths: {
        "global": "../../global",
        "core": "../common.core",
        "user": "user",
        "comm":"communal"
    },
    shim: {

    }
});
require(['global','core','user','comm'],function (g, core,u,comm) {
	//上传成绩
	var UploadUserExam = function(){ 
		g.urlHttp = 'http://testxcbapi.xuechebu.com/';
	    var url= g.urlHttp+"Question_Record/UploadGrade",
	        kscjs = localStorage.getItem("kscj"),
	        submit=document.getElementById("submit");
	        if(kscjs == null){
				//alert('暂无成绩可以上传');
				return;
			}
	        kscjs = kscjs.split("##");
	    if(navigator&&navigator.onLine){//如果在线
	        submit.addEventListener("click",function(){
	        	if (!u.checklogin()){
	            		//alert('对不起，只能登陆才能上传成绩');
	            		return;
	            	}
	        	//再测检测是否有考试数据;
	        	var kscj_t = localStorage.getItem("kscj");
	        	if(kscj_t == null){
	        		//alert('暂无成绩可以上传');
	        		var oAlert=core.createAlert({
						content:"暂无成绩可以上传"
					});
	        		oAlert.queding.onclick= function () {
						this.parentNode.parentNode.parentNode.style.display="none";
					}
	        		return;
	        	}
//	        	
//	            if(confirm("确定上传成绩吗？")){
//	            	UploadUser();
//	            };
//	            
	            var oAlert=core.createAlert({
					content:"确定上传成绩吗？",
					oReturn:"取消"
				});
	            oAlert.queding.onclick= function () {
					UploadUser();
					this.parentNode.parentNode.parentNode.style.display="none";
				}
				oAlert.oReturn.onclick= function () {
					this.parentNode.parentNode.parentNode.style.display="none";
				}
	            
	            
	            var UploadUser = function() {
	                var sccount = 0;
	                for(var i=0;i<kscjs.length;i++){
	                    var kscj = JSON.parse(kscjs[i]);
	                    if (u.checklogin()) {//如果登陆的情况下
	                    	var userInFo=u.getuserinfo();
	                    	if(kscj.user_id == null||kscj.user_id == undefined||kscj.user_id == ''){
	                    		
	                    		kscj.user_id = userInFo.Id;
	                    	}
	                    	if(kscj.SFZH == null||kscj.SFZH == undefined||kscj.SFZH == ''){
	                    		kscj.SFZH = userInFo.sfzh;
	                    	}
	                    	if(kscj.JGID == null||kscj.JGID == undefined||kscj.JGID == ''){
	                    		kscj.JGID = userInFo.jgid;
	                    	}
	                    	
	                        core.getJSONPCache(url, kscj, function(data) {
	                            core.result(data, function(data) {
	                                if(data.code=="0"){
	                                    sccount++;
//	                                    kscjs.length===sccount?alert("恭喜！上传成功"):void (0);
	                                    kscjs.length===sccount?SuccessMsg():void (0);
	                                    
	                                    
	                                    
	                                    localStorage.removeItem("kscj");
	                                    //window.close();
	                                }
	                            })
	                        })
	                        /*var a=u.getuserinfo();
	                        console.log(a.Id);*/
	
	
	                    }else{//没登陆的情况下
	                        //alert("登录后才能上传成绩");
	                        $('.option').append('登录后才能上传成绩');
	                        return;
	                        //window.close();
	                    }
	                }
	            }
	        })
	    }else{
	        submit.style.display="none";
	    }
	}
	
	var SuccessMsg = function(){
    	var oAlert=core.createAlert({
			content:"恭喜！上传成功"
		});
		oAlert.queding.onclick= function () {
			this.parentNode.parentNode.parentNode.style.display="none";
		}	  
    }
	
	//初始化用户信息和考试信息
	var InitUserInfo = function(){
		
		
		$('#anewexam').on('click',function(){
	    	window.location = 'index.html';
	    });
		var kscjs = localStorage.getItem("kscj");
		if(kscjs == null){
			var oAlert=core.createAlert({
				content:"暂无成绩可以上传"
			});
			oAlert.queding.onclick= function () {
				window.location = 'index.html';
			}
			return;
		}
        kscjs = kscjs.split("##");
        
		var userStr = kscjs[kscjs.length-1];
		var userObj = JSON.parse(userStr);
		$('#score').text(userObj.score);
		
		
		
//		if (u.checklogin()) {
////			var userInFo=u.getuserinfo();
////          $('#username').text(userInFo.nickName);
//          //alert(navigator&&navigator.onLine);
//          if(navigator&&navigator.onLine){//如果在线
//          	//alert(navigator&&navigator.onLine);
//				$("#submit").removeAttr('style');
//				var user=u.getuserinfo();
//				var url = g.urlHttp_user+'user/GetUserInfoByUserId';
//				core.getJSONPCache(url, {username:user.userName}, function(data) {
//					core.result(data, function(data) {
//						
//						$('#username').text(data.data.nickName);
//					})
//				})	
//          }
//          else{
//          	var userInFo=u.getuserinfo();
//	            $('#username').text(userInFo.nickName);
//          }
//          
//          
//
//			var userInFo=u.getuserinfo();
//          $('#username').text(userInFo.nickName);
//          $("#submit").removeAttr('style');
//			
////			var userInFo=u.getuserinfo();
////          $('#username').text(userInFo.nickName);
//          
//          
//          
//          if(navigator&&navigator.onLine){//如果在线
//          	//判断是否为安卓
//          	if(comm.JudgeClient() == '2'){
//					//判断是否为安卓在线
//					alert(window.android.getNetworkType());
//					if(window.android.getNetworkType() == 'offline'){
//						$("#submit").removeAttr('style');
//						var user=u.getuserinfo();
//						var url = g.urlHttp_user+'user/GetUserInfoByUserId';
//						core.getJSONPCache(url, {username:user.userName}, function(data) {
//							core.result(data, function(data) {
//								$('#username').text(data.data.nickName);
//							})
//						})
//					}
//					else{
//						
//					}
//				}
//				else{
//					//苹果
//					
//				}
//          }
//          else{
//          	$("#submit").hide();
//          	var userInFo=u.getuserinfo();
//	            $('#username').text(userInFo.nickName);
//          }
//
//		}
//		else{
//			$('#username').text('匿名用户');
//          $("#submit").css("display","none");
//          $("#anewexam").addClass("currsor");
//          $("#anewexam").removeAttr("id");
//		}
//		

//		alert(window.android.getNetworkType());
//		alert(u.checklogin());
		//判断是否有cookie
		if(u.checklogin()){
			//判断是否在线
			//document.write(comm.JudgeClient())
			//alert(comm.JudgeClient());
			if(navigator&&navigator.onLine){
				//如果在线
				//判断是否为安卓
				
				if(comm.JudgeClientByResult() == '2'){
					//安卓
					
					if(window.android.getNetworkType() == 'offline'){
						//如果为离线 
						ShowOffLineUserInfo();
					}
					else{
						//安卓在线	
						ShowOnLineUserInfo();
					}
				}
				else{
					//苹果--在线
					ShowOnLineUserInfo();
				}
			}
			else{
				//离线
				ShowOffLineUserInfo();
			}
		}
		else{
			//离线
			ShowOffLineUserInfo();
		}
		
		
		
		var timeStr = core.formatSeconds(userObj.use_time);
		$('#timeStr').text(timeStr);
	    var oImg=document.getElementsByClassName("testResults")[0].querySelector("img"),
	        fraction=document.getElementsByClassName("resultsInfo")[0].getElementsByTagName("p")[1].getElementsByTagName("span")[0];
	    if(fraction.innerHTML>=90&&fraction.innerHTML<=100){
	        oImg.src="images/03.png";
	    }else{
	        oImg.src="images/04.png";
	    }
	}
	
	var ShowOnLineUserInfo = function(){
		$("#submit").removeAttr('style');
		var user=u.getuserinfo();
		var url = g.urlHttp_user+'user/GetUserInfoByUserId';
		//alert(user.userName);
		core.getJSONPCache(url, {username:user.userName}, function(data) {
			core.result(data, function(data) {

				$('#username').text(data.data.nickName);
			})
		})	
	}
	var ShowOffLineUserInfo = function(){
		
		$('#username').text('匿名用户');
        $("#submit").css("display","none");
        $("#anewexam").addClass("currsor");
        $("#anewexam").removeAttr("id");
	}
	
	InitUserInfo();
	UploadUserExam();
})