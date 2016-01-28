require.config({
	paths: {
		"global": "../../global",
		"core": "../common.core",
		"map": "../lib/map"
	}
});
require(['global', "core", "map"], function(g, core, map) {
	var params = core.getUrlRequest();
	var jxmap = function() {
		//地图
		var map;
		_setmap();
		map.mapclear();
		var point = map.create_point(params.BDJD, params.BDWD);
		map.setmarker(point, null, function() {});
		//		map.drawline(BDPoints, {
		//			color: "red",
		//			weight: 4,
		//			opacity: 0.5
		//		});
		if (isNaN(point.lat) == false && isNaN(point.lng) == false)
			map.panto(point);

		function _setmap() {
			map = new _initmap(mapType.baidu, "map");
		}
	}


	//初始化方法
	var init = function() {
		jxmap();
	};
	init();

});