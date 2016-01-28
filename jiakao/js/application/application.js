require.config({
	paths: {
		//      "global": "../kaoshi/global",
		//      "db": "../kaoshi/js/application/database",
		//      "core":"../kaoshi/js/common.core"

		"global": "../../global",
		"db": "database",
		"core": "../common.core",
		
	},
	shim: {

	}
});
define(["global", "db", "core"], function(gloabl, db, core) {
	//Application cache 缓存对象
	var manifest = {
		//application cache 缓存方法
		kaoshi: function() {
			//调用接口判断是否需要更新
			if (navigator && navigator.onLine) {
				//to do
				var appCache = window.applicationCache; //本地缓存对象
				appCache.update();

				window.addEventListener('load', function(e) {
					window.applicationCache.addEventListener('updateready', function(e) {
						if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
							window.applicationCache.swapCache();
							if (confirm('有新版本更新，是否重新加载')) {
								window.location.reload();
							}
						} else {}
					}, false);
				}, false);
			} else {

			}
		}
	};
	//数据库操作对象
	var webdb = {
		//初始化数据库
		initTK: function() {
			var ct222 = "CREATE TABLE IF NOT EXISTS tk_record(id INTEGER PRIMARY KEY ASC,type INTEGER, strtppe TEXT, strtype_l TEXT, licensetype TEXT" + ",question TEXT,answer_a TEXT,answer_b TEXT,answer_c TEXT,answer_d TEXT,answertrue TEXT,explain TEXT,kemu TEXT,VIDEO_URL TEXT" + ",error INTEGER,moretypes text,chapterid INTEGER,sinaimg TEXT,Image TEXT,diff_degree INTEGER,Issy INTEGER" + ")";
			//console.log(ct222);
			db.runQuery(ct222, [], function() {
				//alert("创建数据库成功");
				console.log('创建数据库成功');
			});
		},
		initData: function(func) {
			var pindex = 1;
			var total = 8023;
			var recordNum = 0;
			
			GetList = function(pindex) {
				
				
				var url = 'FileData/kt/'+pindex+'kt.json';
				core.getJSONCache(url, {}, function (data) {
					
					if (data.length == 0) {
												
					} 
					else {
						var sql = "insert into tk_record(id,type,strtppe,strtype_l,licensetype,question,answer_a,answer_b,answer_c,answer_d,answertrue,explain,kemu,error,moretypes,chapterid,sinaimg,Image,diff_degree,Issy,VIDEO_URL) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
						var dd = data;
						//记录总页数
						//total = 8023;
						db.GetDBSession().transaction(function(context) {
							for (var i = 0; i < dd.length; i++) {
								var item = dd[i];
								
								context.executeSql(sql, [item.ID, item.TYPE, decodeURIComponent(item.STRTPPE), decodeURIComponent(item.STRTYPE_L), decodeURIComponent(item.LICENSETYPE), decodeURIComponent(item.QUESTION), decodeURIComponent(item.ANSWER_A), decodeURIComponent(item.ANSWER_B), decodeURIComponent(item.ANSWER_C), decodeURIComponent(item.ANSWER_D), decodeURIComponent(item.ANSWERTRUE), decodeURIComponent(item.EXPLAIN), decodeURIComponent(item.KEMU), decodeURIComponent(item.ERROR), decodeURIComponent(item.MORETYPES), decodeURIComponent(item.CHAPTERID), decodeURIComponent(item.SINAIMG), decodeURIComponent(item.IMAGE), decodeURIComponent(item.DIFF_DEGREE), decodeURIComponent(item.ISSY), decodeURIComponent(item.VIDEO_URL)], function() {
									
								}, function(tx, error) {
									console.log(error.message);
								})
							};
						},function(){console.log('no')},function(){
							recordNum++;
							if(Math.ceil(total/300) == recordNum){
								func();
							}
							var d = new Date();
							//alert('第'+recordNum+'次');
							//console.log('第'+recordNum+'次'+d.toLocaleDateString()+ " " +d.toTimeString().substring(0,8));
							//console.log('写入成功');
						});
						pindex++;
						//if(pindex != 28){
							GetList(pindex);
						//}
					}
					
				});
				
//				$.getJSON('kt.json',{},function(data){
//					var d = data;
//					alert(123);
//				})
				
				///暂时
				//gloabl.urlHttp = 'http://testxcbapi.xuechebu.com/'   
				//var url = gloabl.urlHttp + 'Question_Record/GetQuestionRecordList';
//				var url = 'kt.json';
//				core.getJSONPCache(url, {
//					'pageIndex': pindex
//				}, function(data) {
//					core.result(data, function(data) {
//						if (data.data.Result == null) {
//							
//						} 
//						else {
//							var sql = "insert into tk_record(id,type,strtppe,strtype_l,licensetype,question,answer_a,answer_b,answer_c,answer_d,answertrue,explain,kemu,error,moretypes,chapterid,sinaimg,Image,diff_degree,Issy) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
//							var dd = data.data.Result;
//							
//							//记录总页数
//							total = data.data.Total;
//							
//							db.GetDBSession().transaction(function(context) {
//								for (var i = 0; i < dd.length; i++) {
//									var item = dd[i];
//									
//									context.executeSql(sql, [item.ID, item.TYPE, item.STRTPPE, item.STRTYPE_L, item.LICENSETYPE, item.QUESTION, item.ANSWER_A, item.ANSWER_B, item.ANSWER_C, item.ANSWER_D, item.ANSWERTRUE, item.EXPLAIN, item.KEMU, item.ERROR, item.MORETYPES, item.CHAPTERID, item.SINAIMG, item.IMAGE, item.DIFF_DEGREE, item.ISSY], function() {
//										
//									}, function(tx, error) {
//										console.log(error.message);
//									})
//								};
//							},function(){console.log('no')},function(){
//								recordNum++;
//								if(Math.ceil(total*0.001) == recordNum){
//									func();
//								}
//								//alert('yes');
//								console.log('写入成功');
//							});
//
//							pindex++;
//							//GetList(pindex);
//						}
//					})
//				});
			}

//			db.runQuery('delete from tk_record', [], function() {
			db.runQuery('drop table tk_record ', [], function() {				
				console.log('删除成功');
				webdb.initTK();
				
				var d = new Date();
				console.log('开始调用'+d.toLocaleDateString()+ " " +d.toTimeString().substring(0,8));
				//GetList(pindex);
				
				//GetAllTkList();
				
				GetXiaoChe();
				
//				var sql = "insert into tk_record(id,type,strtppe) values (?,?,?)"
//					db.runQuery(sql, ['123','123','123'], function() {	
//						db.runQuery('select id,type,strtppe from  tk_record', [], function(data) {	
//							alert(data[0].id);alert(data[0].type);alert(data[0].strtppe);
//						});
//					});
				
				
			});
			
			
			var GetAllTkList = function(){
				var url = 'FileData/kt/kt.json';
				core.getJSONCache(url, {}, function (data) {
					if (data.length == 0) {
						console.log('没有数据');
					} 
					else {
						var dd = data;
						var sql = "insert into tk_record(id,type,strtppe,strtype_l,licensetype,question,answer_a,answer_b,answer_c,answer_d,answertrue,explain,kemu,error,moretypes,chapterid,sinaimg,Image,diff_degree,Issy) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
						db.GetDBSession().transaction(function(context) {
							for (var i = 0; i < dd.length; i++) {
								var item = dd[i];
								context.executeSql(sql, [item.ID, item.TYPE, decodeURIComponent(item.STRTPPE), decodeURIComponent(item.STRTYPE_L), decodeURIComponent(item.LICENSETYPE), decodeURIComponent(item.QUESTION), decodeURIComponent(item.ANSWER_A), decodeURIComponent(item.ANSWER_B), decodeURIComponent(item.ANSWER_C), decodeURIComponent(item.ANSWER_D), decodeURIComponent(item.ANSWERTRUE), decodeURIComponent(item.EXPLAIN), decodeURIComponent(item.KEMU), decodeURIComponent(item.ERROR), decodeURIComponent(item.MORETYPES), decodeURIComponent(item.CHAPTERID), decodeURIComponent(item.SINAIMG), decodeURIComponent(item.IMAGE), decodeURIComponent(item.DIFF_DEGREE), decodeURIComponent(item.ISSY)], function() {
								}, function(tx, error) {
									console.log(error.message);
								})
							};
						},function(){console.log('no')},function(){
							var d = new Date();
							console.log('第'+recordNum+'次'+d.toLocaleDateString()+ " " +d.toTimeString().substring(0,8));
							console.log('写入成功');
							func();
						});
					}
					
				});
			}
		
			var GetXiaoChe = function(){
				
				var url = 'FileData/kt/kt_C1C2C3.json';
				
				core.getJSONCache(url, {}, function (data) {
					if (data.length == 0) {
						console.log('没有数据');
					} 
					else {
						var dd = data;
						var sql = "insert into tk_record(id,type,strtppe,strtype_l,licensetype,question,answer_a,answer_b,answer_c,answer_d,answertrue,explain,kemu,error,moretypes,chapterid,sinaimg,Image,diff_degree,Issy,VIDEO_URL) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
						db.GetDBSession().transaction(function(context) {
							

							
							for (var i = 0; i < dd.length; i++) {
								var item = dd[i];
								context.executeSql(sql, [item.ID, item.TYPE, decodeURIComponent(item.STRTPPE), decodeURIComponent(item.STRTYPE_L), decodeURIComponent(item.LICENSETYPE), decodeURIComponent(item.QUESTION), decodeURIComponent(item.ANSWER_A), decodeURIComponent(item.ANSWER_B), decodeURIComponent(item.ANSWER_C), decodeURIComponent(item.ANSWER_D), decodeURIComponent(item.ANSWERTRUE), decodeURIComponent(item.EXPLAIN), decodeURIComponent(item.KEMU), decodeURIComponent(item.ERROR), decodeURIComponent(item.MORETYPES), decodeURIComponent(item.CHAPTERID), decodeURIComponent(item.SINAIMG), decodeURIComponent(item.IMAGE), decodeURIComponent(item.DIFF_DEGREE), decodeURIComponent(item.ISSY),decodeURIComponent(item.VIDEO_URL)], function() {
								}, function(tx, error) {
									console.log(error.message);
								})
							};
						},function(){console.log('no')},function(){
							var d = new Date();
							console.log('第'+recordNum+'次'+d.toLocaleDateString()+ " " +d.toTimeString().substring(0,8));
							console.log('写入成功');
							func();
						});
					}
					
				});
			}
		}

	};


	return {
		manifest: manifest,
		webdb: webdb
	};
});