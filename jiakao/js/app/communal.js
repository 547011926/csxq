require.config({
    paths: {
        "global": "../../global",
        "core": "../common.core",
        "db":"../application/database",
        "app":"../application/application"
    },
    shim: {
		
    }
});
define(["global", "core","db","app"],
    function (g, core, db,app) {
    	//获取随机100道题
    	var GetRandomQuestion = function(KeMuType,JiaZhaoType,func){
			if(KeMuType == null || KeMuType == '' || KeMuType == undefined){
				console.log('KeMuType参数不能为空');
			}
			if(JiaZhaoType == null || JiaZhaoType == '' || JiaZhaoType == undefined){
				console.log('JiaZhaoType参数不能为空');
			}
			var sql = 'select id,type from tk_record where 1=1 ';
			
			var sqlJiaZhao = '';
			var jiazhao = JiaZhaoType.split('/');
			for (var i = 0;i<jiazhao.length;i++) {
				 sqlJiaZhao+=" and licensetype like '%" + jiazhao[i] + "%'";
//				 if(i!=0||i!=jiazhao.length){
//				 	JiaZhaoType += " and ";
//				 }
			}
			sql+=sqlJiaZhao;
			
			if (KeMuType!=''||KeMuType!=null ||KeMuType != undefined) {
				sql+=" and kemu = "+KeMuType;				
			}
//			if (JiaZhaoType!=''||JiaZhaoType!=null ||JiaZhaoType != undefined) {
//				sql+=" and licensetype like '%" + JiaZhaoType + "%'";
//			}
			console.log(sql);
			db.runQuery(sql,[],function(data){
				if(data.length==0){
					console.log('没有试题数据，请获取最新版本试题');
					var locas = window.localStorage;
					locas.setItem('tk_version','0.0.0');
					return;
				}
				var d = [];
				
				var XuanZe = [];
				var PanDuan = [];
				var DuoXuan = [];
				var XuanZeLen = 0;
				var PanDuanLen = 0;
				var DuoXuanLen =0;
				if(JiaZhaoType.indexOf('D/E/F')==-1){
					if(KeMuType==1){
						XuanZeLen = 60;
						PanDuanLen = 40;
					}
					else if(KeMuType == 4){
						XuanZeLen = 23;
						PanDuanLen = 22;
						DuoXuanLen = 5;
					}
					//类型（1判断题，2选择题,3多选）
					XuanZe = GetTkByKeMu(XuanZeLen,2,data);
					PanDuan = GetTkByKeMu(PanDuanLen,1,data);
					DuoXuan = GetTkByKeMu(DuoXuanLen,3,data);
					d = (XuanZe.concat(PanDuan)).concat(DuoXuan);
					
					//小车
					//var d = XuanZe.concat(PanDuan);
				}
				else{
					XuanZeLen = 25;
					PanDuanLen = 25;
					XuanZe = GetTkByKeMu(XuanZeLen,2,data);
					PanDuan = GetTkByKeMu(PanDuanLen,1,data);
					DuoXuan = GetTkByKeMu(DuoXuanLen,3,data);
					d = (XuanZe.concat(PanDuan)).concat(DuoXuan);
				}
				
				
				func(d);
			});
		}
    	
		var GetTkByKeMu = function(len,type,data){
			var tk = [];
			while (tk.length<len){
				var num = GetRandomNum(1,data.length);
				if (data[num].type == type) {
					if(tk.indexOf(data[num]) == -1){
						tk.push(data[num]);
					}
				}
			}
			return tk;
		}
    	
    	//获取一个指定范围内的随机整数
		var GetRandomNum = function(min,max){
			return Math.floor(min+Math.random()*(max-min));
		}
		
    	//检测版本是否更新
		var CheackUpdate = function(moduleCode,newFunc){
			var s=window.localStorage;
			//s.setItem('version', '1.01.08');
			
			var versionnum = s.getItem('tk_version');
			if(versionnum == null || versionnum ==''||versionnum == undefined){
				versionnum = '0.00.00';
			}
//			if(versionnum == ''||versionnum == null||versionnum == undefined){
//				alert('版本号异常，请稍后重试');
//				return;
//			}

			var url = g.urlHttp+'Question_Record/CheckIsUpdateVersion';
			core.getJSONPCache(url, {'code':moduleCode,'versionNumber':versionnum}, function(data) {
				core.result(data, function(data) {
					newFunc(data.data);
				})
			});
			
		};
    	
    	///检测用户是否有试题数据
		var CheackQuestionsList = function(func){
			var sql = 'select id from tk_record';
			db.runQuery(sql,[],function(data){
				func(data);
			});
		};
    	
    	//根据id获取试题
    	var GetQuestionById=function(id,func){
    		if(id==''||id==null||id==undefined){
    			console.log('参数不能为空');
    			return;
    		}
    		var par = /^\d+$/;
    		if(!par.test(id)){
    			console.log('id必须为正整数');
    			return;
    		}
    		var sql = 'select * from tk_record where id ='+id;
    		db.runQuery(sql,[],function(data){
				func(data);
			});
    	}
    
    	//下载数据
    	var UploadData = function(func){
    		app.webdb.initData(func);
    	};
    	
    	//打开或者创建数据库
    	var OpenOrCreateDB = function(){
    		app.webdb.initTK();
    	}
    	
    	//删除题库
    	var DeleteTk = function(func){
    		var sql = 'delete from tk_record ';
    		db.runQuery(sql,[],function(){
				func(true);
			});
    	}
    	
    	//根据驾照类型 查询总数数据
    	var SelectByJiaZhaoType = function(KeMuType,JiaZhaoType,func){
    		if(KeMuType == null || KeMuType == '' || KeMuType == undefined){
				console.log('KeMuType参数不能为空');
			}
			if(JiaZhaoType == null || JiaZhaoType == '' || JiaZhaoType == undefined){
				console.log('JiaZhaoType参数不能为空');
			}
			var sql = 'select count(*) from tk_record where 1=1 ';
			var sqlJiaZhao = '';
			var jiazhao = JiaZhaoType.split('/');
			for (var i = 0;i<jiazhao.length;i++) {
				 sqlJiaZhao+=" and licensetype like '%" + jiazhao[i] + "%'";
			}
			sql+=sqlJiaZhao;
			
			if (KeMuType!=''||KeMuType!=null ||KeMuType != undefined) {
				sql+=" and kemu = "+KeMuType;				
			}
			console.log(sql);
			db.runQuery(sql,[],function(data){
				func(data);
			});
    	}
    	
//  	var GetNetwork = function(){
//  		return 
//  	}
    	
    	
    	//判断客户端  1苹果 2安卓 
    	var JudgeClient = function(){
    		
    		return '1';
//  		var identifyingStr = navigator.userAgent.toLowerCase();
//		    //alert(identifyingStr)
//		    if (identifyingStr.indexOf('ios_xuechebu') != -1) {
//		        return '1';
//		    }
//		    else if (identifyingStr.indexOf('android_xuechebu') != -1) {
//		        return '2';
//		    }
//		    else {
//		        return '';
//		    }	

//		    var identifyingStr = navigator.userAgent.toLowerCase();
//		    if (identifyingStr.indexOf('iphone') != -1) {
//		        return '1';
//		    }
//		    else if (identifyingStr.indexOf('android') != -1) {
//		        return '2';
//		    }
//		    else {
//		        return '';
//		    }	

    	}
    	
    	
    	var JudgeClientByResult =function(){
      		var identifyingStr = navigator.userAgent.toLowerCase();
		    //alert(identifyingStr)
		    if (identifyingStr.indexOf('ios_xuechebu') != -1) {
		        return '1';
		    }
		    else if (identifyingStr.indexOf('android_xuechebu') != -1) {
		        return '2';
		    }
		    else {
		        return '';
		    }
		    

//		    		    var identifyingStr = navigator.userAgent.toLowerCase();
//		    if (identifyingStr.indexOf('iphone') != -1) {
//		        return '1';
//		    }
//		    else if (identifyingStr.indexOf('android') != -1) {
//		        return '2';
//		    }
//		    else {
//		        return '';
//		    }	
    	}
    	
    	//判断是否联网
    	var JudgeIsNetworking =function(){
    		if(navigator&&navigator.onLine){
    			//判断是否为安卓
    			if(JudgeClientByResult() == '2'){
					//安卓
					if(window.android.getNetworkType() == 'offline'){
						return false;			
					}
					else{
						return true;
					}
				}
				else{
					//苹果--在线
					return true;
				}
    			
    		}
    		else{
    			return false;
    		}
    	}
    return {
    	GetRandomQuestion:GetRandomQuestion,
    	CheackUpdate:CheackUpdate,
    	GetRandomNum:GetRandomNum,
    	CheackQuestionsList:CheackQuestionsList,
    	GetQuestionById:GetQuestionById,
    	UploadData:UploadData,
    	OpenOrCreateDB:OpenOrCreateDB,
    	SelectByJiaZhaoType:SelectByJiaZhaoType,
    	JudgeClient:JudgeClient,
    	JudgeClientByResult:JudgeClientByResult,
    	JudgeIsNetworking:JudgeIsNetworking
    }
})