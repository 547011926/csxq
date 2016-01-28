require.config({
	paths: {
		"app": "../application/application",
		"db": "../application/database"
	},
	shim: {

	}
});
require(['app', 'db'], function(app, db) {
	if (navigator && navigator.onLine) {
		var appCache = window.applicationCache; //本地缓存对象
		//appCache.update();
	}

	//判断是否在线
	if (navigator && navigator.onLine) {

		//app.webdb.initTK();
	}

	var btnsearch = document.getElementById("btnsearch");
	btnsearch.onclick = function() {
		if (navigator && !navigator.onLine) {
			alert(!navigator.onLine + "1");
			//db.open();
			db.runQuery("select * from stu", [], function(data) {
				console.log("无线:" + data);
				$("body").append("无线:" + data);
				alert("无线:" + data);
			});
		}
		if (navigator && navigator.onLine) {
			//db.open();
			db.runQuery("select * from stu", [], function(data) {
				console.log("在线:" + data);
				$("body").append("在线:" + data);
				alert("在线:" + data);
			});
		}
	}
	window.applicationCache.addEventListener('updateready', function(e) {
		if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
			window.applicationCache.swapCache();

			if (confirm("有新的内容 是否更新？")) {
				window.location.reload()
			}
		}
	}, false)

})