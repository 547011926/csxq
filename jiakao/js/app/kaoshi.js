require.config({
	paths: {
		"global": "../../global",
		"core": "../common.core",
		"user": "user",
		"swiper": "../lib/swiper.min",
		"comm": "communal",
		'db': '../application/database'
	},
	shim: {

	}
});
require(['global', 'core', 'swiper', 'user', "comm", "db"], function(global, core, swiper, u, comm, db) {

	//第一层 横幅
	var bannergo = function() {
		//判断是否联网，如果联网，去服务器请求广告接口
		var str = '<div class="swiper-slide" style="background-image:url({img})"></div>';
		if (navigator && navigator.onLine) { //防止navigator浏览器不支持，加上这个 防止报错
			var url = global.urlHttp_user + "ad/GetPageAdview_jucheyou";
			core.getJSONPCache(url, {}, function(data) {
				core.result(data, function(data) {
					var html = [],
						item = "",
						ls_ad = [];
					//定义一个数组变量 ls_ad 存储广告图片
					for (var i = 0; i < data.data.length; i++) {
						item = data.data[i];
						html.push(str.format(item));
						ls_ad.push(item.img);
						//ls_ad放入img图片，后边改成流
					}
					localStorage.ls_ad = ls_ad.join();
					//key为ls_ad 所有key统一为ls_开头   把数组合并成;;分隔的字符串
					//存入localStorage 值
					$(".swiper-wrapper").html(html.join(''));
					var swiper = new Swiper('.swiper-container', {
						pagination: '.swiper-pagination',
						effect: 'cube',
						grabCursor: true,
						cube: {
							shadow: false,
							slideShadows: false,
							shadowOffset: 20,
							shadowScale: 0.94
						}
					});
				})
			});
		} else { //没有联网
			//取出localstorage值
			//;;分隔成数组
			//生成html展现
			var a = localStorage.ls_ad.split(","),
				html = [];
			for (var i = 0; i < a.length; i++) {
				html.push(str.format(a[i]));
			}

			$(".swiper-wrapper").html(html.join(''));
			var swiper = new Swiper('.swiper-container', {
				pagination: '.swiper-pagination',
				effect: 'cube',
				grabCursor: true,
				cube: {
					shadow: false,
					slideShadows: false,
					shadowOffset: 20,
					shadowScale: 0.94
				}
			});

		}
	};
	var kaoshi = {
		setIntervalID: null,
		score: 0, //总分数默认0分
		errScore: 0,
		data: [], //模拟考试 试卷ID集合
		item: null, //当前考试题目详情
		STIndex: 0, //当前考题索引
		CTCount: 0,
		LastQuestion: null, //表示下一题，存储下一题数据的容器	
		kemu: '',
		jiazhaoLeiXing: '',
		IsErrMsgitExam: false, //表示是否因错题太多而提示用户交卷
		nowtime: 45 * 60, //考试剩余时间，单位：秒，默认是总时间
		showtime: function() {
			function showType() {
				//组合页面显示日期
				var min = Math.floor(kaoshi.nowtime / 60); //取整数，小数舍掉
				var sec = kaoshi.nowtime % 60;
				min = min < 10 ? "0" + min : min;
				sec = sec < 10 ? "0" + sec : sec;
				kaoshi.nowtime--;
				return min + "分" + sec + "秒";
			};
			document.getElementById("one-time").getElementsByTagName("span")[0].innerHTML = showType();
			if (kaoshi.nowtime < 0) {
				clearInterval(kaoshi.setIntervalID);
				kaoshi.itExam();
			}
			if (!kaoshi.setIntervalID) //放在初始化方法中会造成第一秒为没有加载数据
				kaoshi.setIntervalID = setInterval(kaoshi.showtime, 1000);

		},
		itExam: function(isHintTime) {
			var itServer = function() {
				var userInFo = false;
				//判断用户登录
				if (u.checklogin()) {
					userInFo = u.getuserinfo();
				}
				//判断总时间
				var allTime = 0;
				if (kaoshi.jiazhaoLeiXing == 'D/E/F') {
					allTime = 30
				} else {
					if (kaoshi.kemu == 1) {
						allTime = 45
					} else if (kaoshi.kemu == 4) {
						allTime = 30
					}
				}

				//alert(kaoshi.nowtime);
				//判断用户做个多少道题
//				var DoMakeQuestion = 0;
//				if(kaoshi.STIndex == (kaoshi.data.length -1)){
//					DoMakeQuestion = kaoshi.data.length;
//				}
//				else{
//					DoMakeQuestion = kaoshi.STIndex;
//				}
				
				var d = new Date();
				var kscj = {
					use_time: (allTime) * 60 - (kaoshi.nowtime+1),
					//use_time: 45*60 - kaoshi.nowtime,
					score: kaoshi.score, //100-kaoshi.CTCount,
					kemu_type: kaoshi.kemu, //1,
					car_type: kaoshi.jiazhaoLeiXing, //"C1",
					question_count: kaoshi.data.length, //"100",
					right_count: kaoshi.STIndex - kaoshi.CTCount, //100- kaoshi.CTCount,
					user_id: userInFo.Id,
					SFZH:userInFo.sfzh,
					JGID:userInFo.jgid,
					DoTopicDate: (d.toLocaleDateString() + " " + d.toTimeString().substring(0, 8))
				};
				var kscjs = localStorage.kscj == null ? [] : localStorage.kscj.split("##");
				kscjs.push(JSON.stringify(kscj));
				localStorage.kscj = kscjs.join('##');
			};


			if (kaoshi.nowtime >= 0) { //等于0实际还有1秒
				if (kaoshi.STIndex == kaoshi.data.length) {
					itServer();
					window.location = 'examresults.html';
				} else {

					if (isHintTime == null) {
						var oAlert = core.createAlert({
							content: "考试时间未结束，是否确认提交?",
							oReturn: "取消"
						});
						oAlert.queding.onclick = function() {
							itServer();
							window.location = 'examresults.html';
						}
						oAlert.oReturn.onclick = function() {
							this.parentNode.parentNode.parentNode.style.display = "none";
						}
					} else {
						itServer();
						window.location = 'examresults.html';
					}


				}
			} else {
				var oAlert = core.createAlert({
					content: "时间到了，必须要交卷子啦！"
				});
				oAlert.queding.addEventListener("touchstart", function() {
					itServer();
					window.location = 'examresults.html';
				})
			}
		},
		touch: function() {
			var two_p = document.getElementsByClassName("two")[0].getElementsByTagName("p"),
				dj = false;
				
			//清除每个选项中的click事件	
			var removeOptionListening = function(){
				for (var i = 0; i < two_p.length; i++) {
					two_p[i].removeEventListener("click", ListenerByType,false);
				}
			}
				
			//多选以外的监听方法
			var ListenerByMultiSelect = function(t) {
				//选中之后 立刻移除所有选项的点击事件，不可再选
				removeOptionListening();
				
				if ($(t).attr('index') == $(t).attr('right')) {
					//答对的情况下
					//计算成绩
					if (kaoshi.data.length == 100) {
						kaoshi.score = kaoshi.score + 1;
					} else if (kaoshi.data.length == 50) {
						kaoshi.score = kaoshi.score + 2;
					}
				} else {
					//答错的情况下
					var oneError = document.getElementById("one-error").getElementsByTagName("span")[0];
					kaoshi.CTCount++;
					oneError.innerHTML = "已错" + kaoshi.CTCount + "题";
					var fraction = 100 - kaoshi.CTCount;
					localStorage.setItem("fraction", fraction);

					UserIsPss();
				}
				$(".two p").removeClass('item');
				$(t).addClass("item");
				//判断对错
				if ($(t).find("span").html() !== kaoshi.item.answertrue) {
					//                      var oneError=document.getElementById("one-error").getElementsByTagName("span")[0];
					//                      kaoshi.CTCount++;
					//                      oneError.innerHTML="已错"+ kaoshi.CTCount +"题";
					//                      var fraction=100-kaoshi.CTCount;
					//                      localStorage.setItem("fraction",fraction);
				}
				kaoshi.STIndex++;

				//判断是否做完
				if (kaoshi.STIndex >= kaoshi.data.length) {
					if (kaoshi.STIndex >= kaoshi.data.length) {
						var oAlert = core.createAlert({
							content: "亲，做完咯~，请交卷子吧"
								//oReturn:"取消"
						});
						oAlert.queding.onclick = function() {
							kaoshi.itExam(1);
							return false;
						}
					}
					return;
				}

//				var oneNumber = document.getElementById("one-number").getElementsByTagName("span")[0];
//				//oneNumber.innerHTML=(kaoshi.STIndex+1)+"/100";
//
//				oneNumber.innerHTML = (kaoshi.STIndex + 1) + "/" + kaoshi.data.length;

				//判断是否做完
				dj = true;
				dj === true ? kaoshi.binDingData() : void(0);
			}

			//多选的监听事件
			var ListenerByOther = function(t) {
					if ($(t).children('span').css('background-color') != 'rgb(211, 211, 211)') {
						$(t).children('span').css('background-color', 'rgb(211, 211, 211)');
					} else {
						$(t).children('span').removeAttr("style");
					}
				}
			//多选的监听btn事件
			var ListenerByOtherBtn = function(t) {
				var btn = document.getElementById("btnSub");
				if (btn != null) {
					//选中之后 立刻移除所有选项的点击事件，不可再选
					removeOptionListening();
					
					btn.addEventListener('click', function() {
						//获取正确答案
						var rightAnswer = $(two_p[0]).attr('right').split('');
						var userAnswer = [];
						//获取用户答案
						for (var i = 0; i < two_p.length; i++) {
							if ($(two_p[i]).children('span').css('background-color') == 'rgb(211, 211, 211)') {
								userAnswer.push($(two_p[i]).attr('index'));

							}
						}

						if (userAnswer.length < 2) {
							//alert('至少要选择两个答案哦！');
							var oAlert = core.createAlert({
								content: "至少要选择两个答案哦！"
							});
							oAlert.queding.onclick = function() {
								this.parentNode.parentNode.parentNode.style.display = "none";
							}
							return;
						}
						//对比两个答案
						//答错的情况下
						var b = true;
						if (rightAnswer.length != userAnswer.length) {
							b = false;
						} else {
							for (var i = 0; i < userAnswer.length; i++) {
								if (rightAnswer.indexOf(userAnswer[i]) == -1) {
									b = false;
								}
							}
						}
						if (b) {
							//正确情况下
							//计算成绩  科目三(多选)的情况下
							kaoshi.score = kaoshi.score + 2;
						} else {
							//答错的情况下
							errAns();
						}


						$(".two p").removeClass('item');
						$(t).addClass("item");
						//判断对错
						if ($(t).find("span").html() !== kaoshi.item.answertrue) {

						}
						kaoshi.STIndex++;

						//判断是否做完
						if (kaoshi.STIndex >= kaoshi.data.length) {
							if (kaoshi.STIndex >= kaoshi.data.length) {
								var oAlert = core.createAlert({
									content: "亲，做完咯~，请交卷子吧",
									//oReturn:"取消"
								});
								oAlert.queding.onclick = function() {
									kaoshi.itExam(1);
									return false;
								}

							}
							return;
						}
//						var oneNumber = document.getElementById("one-number").getElementsByTagName("span")[0];
//						oneNumber.innerHTML = (kaoshi.STIndex + 1) + "/" + kaoshi.data.length;
						dj = true;
						dj === true ? kaoshi.binDingData() : void(0);
					});

				}

			}

			//错误的情况下  多选的情况下
			var errAns = function() {
				var oneError = document.getElementById("one-error").getElementsByTagName("span")[0];
				kaoshi.CTCount++;
				oneError.innerHTML = "已错" + kaoshi.CTCount + "题";
				var fraction = 100 - kaoshi.CTCount;
				localStorage.setItem("fraction", fraction);

				//              if(kaoshi.CTCount == 10){
				//              	alert('错了十道题了');
				//              }
				UserIsPss();

			}

			//判断用户是否不及格 如果是就提示用户交卷
			var UserIsPss = function() {
				if (!kaoshi.IsErrMsgitExam) {

					if (kaoshi.jiazhaoLeiXing == 'D/E/F') {
						kaoshi.errScore += 2;
					} else {
						if (kaoshi.kemu == 1) {
							kaoshi.errScore += 1;
						} else if (kaoshi.kemu == 4) {
							kaoshi.errScore += 2;
						}
					}
					if (kaoshi.errScore > 10) {
						//		                	if(confirm('答错了'+kaoshi.CTCount+'道题，成绩为不及格，是否交卷')){
						//		                		kaoshi.itExam();
						//		                	}


						var oAlert = core.createAlert({
							content: '答错了' + kaoshi.CTCount + '道题，成绩为不及格，是否交卷',
							oReturn: "继续答题"
						});
						oAlert.queding.onclick = function() {
							kaoshi.itExam(1);
						}
						oAlert.oReturn.onclick = function() {
							this.parentNode.parentNode.parentNode.style.display = "none";
						}
						kaoshi.IsErrMsgitExam = true;
					}
				}
			}

			ListenerByOtherBtn();

			//很据试题类型的不同来注册不同的事件
			var ListenerByType = function(){
				if ($(this).attr('type') == '3') {
					//多选	
					ListenerByOther(this);
				} else {
					//单选、判断
					ListenerByMultiSelect(this);
				}
			}

			for (var i = 0; i < two_p.length; i++) {
				two_p[i].addEventListener("click", ListenerByType);
			}

		},
		binDingData: function() {
			var id = kaoshi.data[kaoshi.STIndex].id; //data[i];
			
			//安卓得到试题数据时候的渲染工作
			var GetQuestionAfter = function(data) {
				var two = document.getElementsByClassName("two")[0],
					str = '',
					ary = [],
					number = ["A", "B", "C", "D"];
				//kaoshi.data = data;
				for (var i = 0; i < data.length; i++) {
					if (kaoshi.STIndex >= kaoshi.data.length)
						return false;
					var item = kaoshi.item = data[i]; //data[i];
					if (item.type === 1) {
						str += "<h1><span>判断</span>" + item.question + "</h1>";
					} else if (item.type === 2) {
						str += "<h1><span>单选</span>" + item.question + "</h1>";
					} else {
						str += "<h1><span>多选</span>" + item.question + "</h1>";
					}

					var GetImageType = function() {
						if (item.sinaimg.indexOf('png') != -1) {
							return 'png';
						} else if (item.sinaimg.indexOf('jpg') != -1) {
							return 'jpg';
						} else if (item.VIDEO_URL.indexOf('mp4') != -1) {
							return 'gif';
						} else {
							return '';
						}
					}
					item.Image ? str += "<img src='data:image/" + (GetImageType()) + ";base64," + item.Image + "'>" : void(0);
					ary.push(item.answer_a, item.answer_b, item.answer_c, item.answer_d);

					var judgeArr = ['正确', '错误'];
					var XuanXiang = ['A', 'B', 'C', 'D'];

					if (data[i].type == '1') {
						//判断
						for (var a = 0; a < judgeArr.length; a++) {
							str += "<p type='" + data[i].type + "' right='" + (Math.floor(data[0].answertrue)) + "' index='" + (a + 1) + "'>";
							str += "" + judgeArr[a] + "";
							str += "</p>";
						}
					} else if (data[i].type === 2) {
						xunhuan();
					} else if (data[i].type === 3) {
						xunhuan();
						str += "<div class='submit' id='btnSub'>提交</div>";
					}

					function xunhuan() {
						for (var a = 0; a < ary.length; a++) {
							str += "<p type='" + data[i].type + "'  right='" + (Math.floor(data[0].answertrue)) + "' index='" + (a + 1) + "'>";
							var current = ary[a] /*,cur=item.th[a]*/ ;
							str += "<span>" + number[a] + "</span>" + current + "";
							//str += "<span>" + cur + "</span>";
							str += "</p>";
						}
					}

					two.innerHTML = str;
					item.img ? document.getElementsByClassName("two")[0].getElementsByTagName("p")[0].style.borderTop = "none" : void(0);
					kaoshi.touch();
				}
				
				var oneNumber = document.getElementById("one-number").getElementsByTagName("span")[0];
				oneNumber.innerHTML = (kaoshi.STIndex + 1) + "/" + kaoshi.data.length;
				//}
				/*
				 question  问题
				 Image  图片
				 answer_a  选项a
				 answer_b  选项b
				 answertrue  正确答案  1是a  2是b
				 type  类型
				 explain  题目分析
				 kemu   科目几（1或者4）
				 */
			}

			//android func
			var GetQuestionByIdAndroid = function() {
				comm.GetQuestionById(id, function(data) {
					GetQuestionAfter(data);
				})
			}

			// ios func
			var GetQuestionByIdIos = function() {
				if (kaoshi.STIndex == 0) {
					var isFirst = true; //表示第一道题加载 请求之后便渲染html
					GetQuestionByidAtInterface(id, isFirst);
				} else {
					if(kaoshi.LastQuestion == null){
						//说明下一道题还没有请求到 ，用当前索引再去接口请求数据，渲染html  
						//alert(kaoshi.STIndex);
						GetQuestionByidAtInterface((kaoshi.data[kaoshi.STIndex].id),true);
						return;
					}
					else{
						RenderingHtml(kaoshi.LastQuestion);	
						kaoshi.LastQuestion = null; //渲染完成之后要删除存储下一题数据的容器	
					}
				}
				//GetQuestionByidAtInterface(id);
			}

			//在接口取数据  Qid 试题id,isFirst 表示第一道题加载
			var GetQuestionByidAtInterface = function(Qid, isFirst) {
				var url = global.urlHttp + 'Question_Record/GetTopicByid';
				core.getJSONPCache(url, {
					id: Qid
				}, function(data) {
					core.result(data, function(data2) {
						if (isFirst) {
							RenderingHtml(data2);
						} else {
							
							kaoshi.LastQuestion = data2;
						}
					})
				})
			}

			//渲染html数据 并且在渲染之后 自动加载下一道题存到kaoshi.LastQuestion
			var RenderingHtml = function(data2) {
				var data = [];
				data.push(data2.data.Result);
				var two = document.getElementsByClassName("two")[0],
					str = '',
					ary = [],
					number = ["A", "B", "C", "D"];
				//kaoshi.data = data;
				for (var i = 0; i < data.length; i++) {
					if (kaoshi.STIndex >= kaoshi.data.length)
						return false;
					var item = kaoshi.item = data[i]; //data[i];
					if (item.TYPE === 1) {
						str += "<h1><span>判断</span>" + item.QUESTION + "</h1>";
					} else if (item.TYPE === 2) {
						str += "<h1><span>单选</span>" + item.QUESTION + "</h1>";
					} else {
						str += "<h1><span>多选</span>" + item.QUESTION + "</h1>";
					}

					var GetImageType = function() {
						if(item.SINAIMG == null || item.SINAIMG == undefined || item.SINAIMG == ''){
							return '';
						}
						
						if (item.SINAIMG.indexOf('png') != -1) {
							return 'png';
						} else if (item.SINAIMG.indexOf('jpg') != -1) {
							return 'jpg';
						} else if (item.VIDEO_URL.indexOf('mp4') != -1) {
							return 'gif';
						} else {
							return '';
						}
					}
					item.IMAGE ? str += "<img src='data:image/" + (GetImageType()) + ";base64," + item.IMAGE + "'>" : void(0);
					ary.push(item.ANSWER_A, item.ANSWER_B, item.ANSWER_C, item.ANSWER_D);

					var judgeArr = ['正确', '错误'];
					var XuanXiang = ['A', 'B', 'C', 'D'];

					if (data[i].TYPE == '1') {
						//判断
						for (var a = 0; a < judgeArr.length; a++) {
							str += "<p type='" + data[i].TYPE + "' right='" + (Math.floor(data[0].ANSWERTRUE)) + "' index='" + (a + 1) + "'>";
							str += "<span>" + number[a] + "</span>";
							str += "" + judgeArr[a] + "";
							str += "</p>";
						}
					} else if (data[i].TYPE === 2) {
						xunhuan();
					} else if (data[i].TYPE === 3) {
						xunhuan();
						str += "<div class='submit' id='btnSub'>提交</div>";
					}

					function xunhuan() {
						for (var a = 0; a < ary.length; a++) {
							str += "<p type='" + data[i].TYPE + "'  right='" + (Math.floor(data[0].ANSWERTRUE)) + "' index='" + (a + 1) + "'>";
							var current = ary[a] /*,cur=item.th[a]*/ ;
							str += "<span>" + number[a] + "</span>" + current + "";
							//str += "<span>" + cur + "</span>";
							str += "</p>";
						}
					}

					two.innerHTML = str;
					item.img ? document.getElementsByClassName("two")[0].getElementsByTagName("p")[0].style.borderTop = "none" : void(0);
					kaoshi.touch();
				}

				var oneNumber = document.getElementById("one-number").getElementsByTagName("span")[0];
				oneNumber.innerHTML = (kaoshi.STIndex + 1) + "/" + kaoshi.data.length;
				if (kaoshi.STIndex < kaoshi.data.length) {
					GetQuestionByidAtInterface((kaoshi.data[kaoshi.STIndex + 1].id));
				}
			}

			//区分安卓和苹果1苹果 2安卓 
			if (comm.JudgeClient() == '1') {
				if (!comm.JudgeIsNetworking()) {
					//alert('抱歉，您已经断网啦！');	
					var oAlert = core.createAlert({
						content: "抱歉，您已经断网啦！"
					});
					oAlert.queding.onclick = function() {
						this.parentNode.parentNode.parentNode.style.display = "none";
					}
				}				
				
				//延迟500毫秒加载数据
				setTimeout(function() {
					GetQuestionByIdIos()
				}, 500);
				//GetQuestionByIdIos();
			} else if (comm.JudgeClient() == '2') {
				GetQuestionByIdAndroid();
			}

		},
		sqldata: function() {
			var parms = core.GetUrlRequest();
			if (parms == null) {
				window.location = 'index.html';
			}
			if (parms.kemu == null || parms.kemu == '') {
				window.location = 'index.html';
			}
			if (parms.jiazhao == null || parms.jiazhao == '') {
				window.location = 'index.html';
			}

			kaoshi.kemu = parms.kemu;
			kaoshi.jiazhaoLeiXing = parms.jiazhao;

			//android func
			var GetRandomQuestionAndroid = function() {
					comm.GetRandomQuestion(parms.kemu, parms.jiazhao, function(data) {
						kaoshi.data = data;
						kaoshi.binDingData();

						//kaoshi.nowtime=1 * 10;
						//答题的数量是动态的
						//data.splice(1,44);

						//科目1 45分钟 科目4 30分钟  摩托车都是30分钟
						if (kaoshi.jiazhaoLeiXing == 'D/E/F') {
							kaoshi.nowtime = 30 * 60;
						} else {
							if (kaoshi.kemu == 1) {
								kaoshi.nowtime = 45 * 60;
							} else if (kaoshi.kemu == 4) {
								kaoshi.nowtime = 30 * 60;
							} else {
								kaoshi.nowtime = 45 * 60;
							}
						}


						$('#one-number span').text('1/' + data.length);
					});


				}
				//ios func
			var GetRandomQuestionIos = function() {
				var url = global.urlHttp + 'Question_Record/GetHundredTopic';
				core.getJSONPCache(url, {
					kemu: kaoshi.kemu,
					jiazhao: kaoshi.jiazhaoLeiXing
				}, function(data) {
					core.result(data, function(data) {
						if (data == null) {
							console.log('err:data is null');
							return;
						}
						kaoshi.data = data.data.Result;
						kaoshi.binDingData();

						if (kaoshi.jiazhaoLeiXing == 'D/E/F') {
							kaoshi.nowtime = 30 * 60;
						} else {
							if (kaoshi.kemu == 1) {
								kaoshi.nowtime = 45 * 60;
							} else if (kaoshi.kemu == 4) {
								kaoshi.nowtime = 30 * 60;
							} else {
								kaoshi.nowtime = 45 * 60;
							}
						}
						
						//kaoshi.nowtime=1 * 10;
						$('#one-number span').text('1/' + data.data.Result.length);

					})
				});


			}

			//区分安卓和苹果1苹果 2安卓 
			if (comm.JudgeClient() == '1') {
				GetRandomQuestionIos();
			} else if (comm.JudgeClient() == '2') {
				GetRandomQuestionAndroid();
			}


		},
		init: function() {
			var ot = document.getElementById("one-time"),
				os = document.getElementById("one-submit");
			//          ot.addEventListener("touchstart", function () {
			//              alert("考试时间还没到呢！");
			//          });
			os.addEventListener("click", function() {
				kaoshi.itExam();
			});
			//初始化localstorage数据
			//localStorage.removeItem("fraction",100);
			kaoshi.showtime();
			//kaoshi.data = jsonData;
			//kaoshi.data = sqldata.data;
			//kaoshi.binDingData();
			kaoshi.sqldata();
		}
	};

	var init = function() {

		
		kaoshi.init();
		//bannergo();
		//sqldata.init();
	};
	init();
})