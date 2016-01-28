require.config({
    paths: {
        "global": "../../global",
        "core": "../common.core",
        "user": "../app/user"
    },
    shim: {

    }
});
require(['global', "core", "user"], function(g, core, u) {
	g.urlHttp = 'http://testxcbapi.xuechebu.com/';
    var url= g.urlHttp+"Question_Record/UploadGrade",
        kscjs = localStorage.getItem("kscj"),
        submit=document.getElementById("submit");
        kscjs = kscjs.split("##");
    if(navigator&&navigator.onLine){//如果在线
        submit.addEventListener("touchstart",function(){
            if(confirm("确定上传成绩吗？")){
                var sccount = 0;
                for(var i=0;i<kscjs.length;i++){
                    var kscj = JSON.parse(kscjs[i]);
                    if (u.checklogin()) {//如果登陆的情况下
                    	if(kscj.user_id == null||kscj.user_id == undefined||kscj.user_id == ''){
                    		var userInFo=u.getuserinfo();
                    		kscj.user_id = userInFo.Id
                    	}
                    	
                        core.getJSONPCache(url, kscj, function(data) {
                            core.result(data, function(data) {
                                if(data.code=="0"){
                                    sccount++;
                                    kscjs.length===sccount?alert("恭喜！上传成功"):void (0);
                                    localStorage.removeItem("kscj");
                                    window.close();
                                }
                            })
                        })
                        /*var a=u.getuserinfo();
                        console.log(a.Id);*/


                    }else{//没登陆的情况下
                        alert("登录后才能上传成绩");
                        window.close();
                    }
                }
            }else{
                alert("上传失败");
            }
        })
    }else{
        submit.style.display="none";
    }
})