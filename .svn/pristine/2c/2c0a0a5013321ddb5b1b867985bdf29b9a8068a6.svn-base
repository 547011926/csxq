require.config({
	paths: {
		"global": "../../global",
		"core": "../common.core"
	}
});
require(['global', "core"], function(g, core) {
	var params = core.getUrlRequest();
	var yybm = function() {
		$("#textTel").bind('input propertychange',function(){
			if($("#textTel").val().length>=11){
				$("#textTel").attr('readonly','readonly');
			}
		});
		$("#textTel").bind('focus click',function(){
			$("#textTel").removeAttr('readonly');
		});
		$("#btnSubmit").unbind("click").click(function() {
			var telReg=!!$("#textTel").val().match(/^0?(13|15|18|14|17)[0-9]{9}$/);
			if (telReg) {
				core.getJSONPCache(g.urlHttp + 'JXBMX/AddyyBmxx', {
					handset: $("#textTel").val(),
					type: "1"
				}, function(data) {
					core.result(data, function(data) {
						if (data.code == 0){
							alert(data.data)
						}else{
							alert(data.message);
						}
					})
				});
			} else{
				$('#textTel').css({
					background:'#ce3333',
					color:'#FFF',
					fontWeight:'600'
				});
				$('#textTel').attr('placeholder','请输入正确的手机号').val('');
			}
		});
		$("#textTel").focus(function(){
			$('#textTel').attr('placeholder','输入手机号');
			$('#textTel').css({
				background:'#FFF',
				color:'#333',
				fontWeight:'400'
			});
		});
	}


	//初始化方法
	var init = function() {
		yybm();
	};
	init();

});