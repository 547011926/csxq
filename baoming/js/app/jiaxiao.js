require.config({
	paths: {
		"global": "../../global",
		"core": "../common.core",
		"echarts": "../lib/echarts-all"
	}
});
require(['global', "core", "echarts"], function(g, core, echarts) {
	var params = core.getUrlRequest();
	if (params == null)
		top.location.href = "index.html";
	var getJXJJ = function() {
		var url = g.urlHttp_file + "FileData/" + params.jgid + "/jxjj.json";
		//驾校简介
		core.getJSONCache(url, {}, function(data) {
				$('#a_jxmc').html(data[0].JXNAME);
				$('#div_jxpic').html(data[0].M_JXFMPIC == "" ? "" : ('<img src="{0}" alt="驾校图片" />').format(data[0].M_JXFMPIC));
				$('#div_jxdz').html(data[0].JXDZ);
				$('#a_jxdz').attr("href", "ditu.html?BDJD=" + data[0].BDJD + "&BDWD=" + data[0].BDWD);
				var yhjg = params.yhjg == "{jg}" ? "暂无" : (params.yhjg == undefined ? "暂无" : "￥" + params.yhjg + "元 ↑");
				$('#li_yhjg').text(yhjg);
				$('#a_jxjj').html(data[0].JJ.length > 30 ? data[0].JJ.substring(0, 30).replace(/zs_kg;/g, "&nbsp;") + "......" : data[0].JJ.replace(/zs_kg;/g, "&nbsp;") + "......");
				$('#a_jxjj').attr("href", "jiaxiaoInfo.html?jgid=" + params.jgid);
				$('#a_jxdz').html(data[0].JXDZ);
				$('#a_bcxl').attr("href", "banchexianlu.html?jgid=" + params.jgid);
				$('#p_xlts').html(data[0].BCXLSL + "线路");
				$("#ul_top").html("<li>成立时间:" + data[0].CLSJ + "</li><li>班次种类:" + data[0].BCZL + "</li><li>考试场地:" + data[0].KSCD + "</li>");
				$("#ul_down").html("<li>办学宗旨:" + data[0].BXZZ);
				$("span[name='span_jxmc']").html(data[0].JXNAME);
				$("#a_jxbx").attr("href", "banxingjiage.html?jgid=" + params.jgid);
			})
			//特色服务
		core.getJSONCache(g.urlHttp_file + "FileData/bm/bmtsfw.json", {}, function(data) {
			core.getJSONCache(g.urlHttp_file + "FileData/" + params.jgid + "/jxbx.json", {}, function(bxdata) {
				var mtsfws = [];
				var tsfws = [];
				for (var i = 0; i < data.length; i++) {
					var tsfw = data[i];
					var mimg = '<img src="{0}">';
					var img = '<div class="swiper-slide"><img src="{0}" alt="" /></div>'
					if (bxdata != null && bxdata[0].TSFWID != null && bxdata[0].TSFWID.indexOf(tsfw.ID) > -1) {
						mtsfws.push(mimg.format(tsfw.M_KTIMG));
						tsfws.push(img.format(tsfw.KTIMG));
					} else {
						mtsfws.push(mimg.format(tsfw.M_WKTIMG));
						tsfws.push(img.format(tsfw.WKTIMG));
					}
				}
				$("#div_mtsfw").html(mtsfws.join(''));
				$("#div_tsfw").html(tsfws.join(''));
				func();
			});
		});
		//人气最高班型
		core.getJSONPCache(g.urlHttp + 'BXJG/GetRQBXJG', {
			jgid: params.jgid
		}, function(data) {
			core.result(data, function(data) {
				if (data.data != null) {
					var html = [];
					html.push("<div class='typePic'><img src='" + data.data.BXIMG + "' alt='班型图片' /></div>");
					var xlcx = data.data.XLCX == null ? '' : data.data.XLCX;
					var jzlx = data.data.JZLX == null ? '' : data.data.JZLX;
					html.push("<p><span>" + data.data.BXMC + "</span><br /><span class=redCol>￥" + data.data.YHJG + "</span>  <span class=redCol>" + data.data.JG + "</span><br /><span>" + data.data.LCSJ + "</span><br /><span>" + xlcx + " </span><span> " + jzlx + "</span><br /></p>");
					$("#a_jxbx").html(html.join(""));
				}
			})
		});
		//报名人数
		core.getJSONPCache(g.urlHttp + 'JXBMX/GetBMRS', {
			jgid: params.jgid
		}, function(data) {
			core.result(data, function(data) {
				if (data.data != null) {
					$("#li_bmrs").html(data.data + '人报过');
				}
			})
		});
		//画驾校规模指数
		core.getJSONPCache(g.urlHttp + 'JXZS/GetJiaXiaoZhiShu', {
			jgid: params.jgid
		}, function(data) {
			core.result(data, function(data) {
				if (data.data.Total != 3) {
					return;
				}
				var jly = [];
				jly.push(data.data.Result[0].ZuiGao);
				jly.push(data.data.Result[0].ZiJi);
				jly.push(data.data.Result[0].ZuiDi);
				DawGuiMoZhiShu(jly, 'jiaolian', '教练员');

				var jlc = [];
				jlc.push(data.data.Result[1].ZuiGao);
				jlc.push(data.data.Result[1].ZiJi);
				jlc.push(data.data.Result[1].ZuiDi);
				DawGuiMoZhiShu(jlc, 'xunlianche', '教练车');

				var mj = [];
				mj.push(data.data.Result[2].ZuiGao);
				mj.push(data.data.Result[2].ZiJi);
				mj.push(data.data.Result[2].ZuiDi);
				DawGuiMoZhiShu(mj, 'mianji', '驾校面积');
			})
		});
		//画价格指数
		core.getJSONPCache(g.urlHttp + 'JXZS/GetJiaXiaoXiaoBuZhiShu', {
			jgid: params.jgid,
			code: 'jgzs',
			codeHangYe: 'jgzshy'
		}, function(data) {
			core.result(data, function(data) {
				var jgzs = [];
				var jgzshy = [];
				var dateStr = [];
				for (var i = data.data.Result.length - 1; i >= 0; i--) {

					if (data.data.Result[i].Code == 'jgzs') {
						jgzs.push(data.data.Result[i].ShowVal);
						continue;
					}
					if (data.data.Result[i].Code == 'jgzshy') {
						jgzshy.push(data.data.Result[i].ShowVal);
					}
					dateStr.push(data.data.Result[i].Sjrq.substring(5, 7));
				}
				DawXiaoBuZhiShu(jgzs, jgzshy, dateStr, 'jgzs');
			})
		});
		//画学员指数
		core.getJSONPCache(g.urlHttp + 'JXZS/GetJiaXiaoXiaoBuZhiShu', {
			jgid: params.jgid,
			code: 'zszs',
			codeHangYe: 'zszshy'
		}, function(data) {
			core.result(data, function(data) {
				var tglzs = [];
				var tglhy = [];
				var dateStr = [];
				for (var i = data.data.Result.length - 1; i >= 0; i--) {

					if (data.data.Result[i].Code == 'zszs') {
						tglzs.push(data.data.Result[i].ShowVal);
						continue;
					}
					if (data.data.Result[i].Code == 'zszshy') {
						tglhy.push(data.data.Result[i].ShowVal);
					}

					dateStr.push(data.data.Result[i].Sjrq.substring(5, 7));
				}
				DawXiaoBuZhiShu(tglzs, tglhy, dateStr, 'zszszs');
			})
		});
		//画拿本周期
		core.getJSONPCache(g.urlHttp + 'JXZS/GetJiaXiaoXiaoBuZhiShu', {
			jgid: params.jgid,
			code: 'bys',
			codeHangYe: 'byshy'
		}, function(data) {
			core.result(data, function(data) {
				var byszs = [];
				var byshy = [];
				var dateStr = [];
				for (var i = data.data.Result.length - 1; i >= 0; i--) {

					if (data.data.Result[i].Code == 'bys') {
						byszs.push(data.data.Result[i].ShowVal);
						continue;
					}
					if (data.data.Result[i].Code == 'byshy') {
						byshy.push(data.data.Result[i].ShowVal);
					}
					dateStr.push(data.data.Result[i].Sjrq.substring(5, 7));
				}
				DawXiaoBuZhiShu(byszs, byshy, dateStr, 'byszs');
			})
		});
		//画驾校约车指数
		core.getJSONPCache(g.urlHttp + 'JXZS/GetJiaXiaoXiaoBuZhiShu', {
			jgid: params.jgid,
			code: 'yczs',
			codeHangYe: 'yczshy'
		}, function(data) {
			core.result(data, function(data) {
				var yczs = [];
				var yczshy = [];
				var dateStr = [];
				for (var i = data.data.Result.length - 1; i >= 0; i--) {

					if (data.data.Result[i].Code == 'yczs') {
						yczs.push(data.data.Result[i].ShowVal);
						continue;
					}
					if (data.data.Result[i].Code == 'yczshy') {
						yczshy.push(data.data.Result[i].ShowVal);
					}
					dateStr.push(data.data.Result[i].Sjrq.substring(5, 7));
				}
				DawXiaoBuZhiShu(yczs, yczshy, dateStr, 'yczs');
			})
		});
		//授权书
		core.getJSONCache(g.urlHttp_file + "FileData/" + params.jgid + "/jxsqs.json", {}, function(data) {
			if (data != null)
				$("#img_jxsqs").attr("src", data[0].SQSPIC);
			else
				$("#div_jxsqs").hide();
		});
	}

	var func = function() {

		var swiper = new Swiper('.swiper-container', {
			slidesPerView: 'auto',
			nextButton: '.swiper-button-next',
			prevButton: '.swiper-button-prev'
		});
		$('.images')[0].addEventListener('touchstart', function(ev) {
			ev.stopPropagation();
			$('.swiperBox').css({
				height: 'auto',
				display: 'block',
				margin: '9px 0 0 0',
				padding: '10px 0',
				border: 'solid 1px #61a1df',
				overflow: 'visible'
			})
			$('.mask').show();

		});
		$('.mask')[0].addEventListener('touchstart', function() {
			$('.swiperBox').hide();
			$('.mask').hide();
		});
		$('.look').each(function(index) {
			$('.look').live('touchstart', function() {
				if ($(this).siblings('div.iText')[0].style.display == 'block') {
					$(this).siblings('div.iMap').eq(index).show();
					$(this).siblings('div.iText').eq(index).hide();
				} else {
					$(this).siblings('div.iMap').eq(index).hide();
					$(this).siblings('div.iText').eq(index).show();
				}
			})
		});

	}



	//初始化方法
	var init = function() {
		getJXJJ();
	};
	init();

});

//画规模指数
function DawGuiMoZhiShu(data, id, zsTitle) {
	var myChart = echarts.init(document.getElementById(id));
	var dataStyle = {
		normal: {
			label: {
				show: true,
				//position: 'insideLeft',
				position: 'inside',
				formatter: '{c}',
				color: '#ccc'
			},
			color: function(params) {
				var colorList = [
					'#6AB950', '#F2B648', '#E74157'
				];
				return colorList[params.dataIndex]
			}

		}
	};
	var option = {
		backgroundColor: '#F9F9F9',
		grid: {
			width: '70%',
			height: '70%',
			//x:60,
			y: 35,
			borderWidth: 1,
			borderColor: '#ddd'
		},
		title: {
			text: zsTitle, //'教练员',
			itemGap: 0,
			//				subtext: '数据来自网络'
			textStyle: {
				color: '#E7445A'
			}
		},
		tooltip: {
			//trigger: 'axis'
		},
		legend: {
			//				data:['2011年', '2012年']
			data: []
		},
		toolbox: {
			//show : true,
			feature: {
				//mark : {show: true},
				//dataView : {show: true, readOnly: false},
				//magicType: {show: true, type: ['line', 'bar']},
				//restore : {show: true},
				//saveAsImage : {show: true}
			}
		},
		//calculable : true,
		xAxis: [{
			show: false,
			type: 'value',
			splitLine: {
				show: false
			},
			axisLabel: {
				show: false
			}
		}],
		yAxis: [{
			//lineStyle: { color: '#fff',width:0 },
			type: 'category',
			data: ['行业最高值', '驾　校　值', '行业最低值'],
			axisLine: {
				show: false,
			},
			axisTick: {
				show: false
			},
			splitArea: {
				show: true
			},
			splitLine: {
				show: false
			},
			textStyle: {
				color: '#808080'
			},
			axisLabel: {
				show: true,
				textStyle: {
					color: '#808080',
					fontFamily: '微软雅黑',
					fontSize: 14,
					fontStyle: 'normal',
					fontWeight: 'bold'
				}
			}
		}],
		series: [{
				//name:'2012年',
				type: 'bar',
				barWidth: 15,
				//data:[19325, 23438, 31000, 121594, 134141, 61807]
				//itemStyle : { normal: {label : {show: true, position: 'inside'}}},
				itemStyle: dataStyle,
				//itemStyle: { normal: { label: { show: true, position: 'insideRight' } } },

				data: data
			}

		]
	};
	// 为echarts对象加载数据
	myChart.setOption(option);
}

//画小不指数
function DawXiaoBuZhiShu(date, date2, date3, id, yMax, yMin) {
	var option = {
		grid: {
			width: '93%',
			height: '70%',
			x: 10,
			y: 5
		},
		xAxis: [{
			//			axisLabel: {
			//				show: true,
			//				textStyle: {
			//					color: '#808080',
			//					fontFamily: '微软雅黑',
			//					fontSize: 1,
			//					fontStyle: 'normal'
			//				}
			//			},
			type: 'category',
			boundaryGap: false,
			data: date3
		}],
		yAxis: [{
			axisLabel: {
				show: false,
				textStyle: {
					color: '#808080',
					fontFamily: '微软雅黑',
					fontSize: 1,
					fontStyle: 'normal'
				}
			},
			min: yMin, //5,
			max: yMax, //20,
			type: 'value',
			splitNumber: 3
		}],
		series: [{
			itemStyle: {
				normal: {
					color: '#3333FF'
				}
			},
			name: '',
			type: 'line',
			data: date
		}, {
			itemStyle: {
				normal: {
					color: '#990033'
				}
			},
			name: '',
			type: 'line',
			data: date2
		}]
	};

	var myChart = echarts.init(document.getElementById(id));
	myChart.setOption(option);
}