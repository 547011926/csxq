require.config({
    paths: {
        "global": "../../global",
        "core": "../common.core"
    },
    shim: {}
});
define(["global", "core"], function (g, core) {

    var check = {
        checkVia: function (textTel) {
            var reg = /^1(3[0-9]|5[012356789]|7[678]|8[0-9]|4[57])\d{8}$/,
                val = textTel.value,
                b = reg.test(val),
                thit = arguments[0];
            if (!b) {
                thit.style.backgroundColor = "yellow";
                /*if (thit.value == null || thit.value == undefined || thit.value == '') {
                    //thit.placeholder = "手机号码不能为空";
                    thit.style.backgroundColor = "yellow";
                } else if (thit.value.length < 11) {
                    //thit.placeholder = "手机号码不能少于11位";
                    thit.style.backgroundColor = "yellow";
                } else if (thit.value.length > 11) {
                    //thit.placeholder = "手机号码不能多于11位";
                    thit.style.backgroundColor = "yellow";
                } else {
                    //thit.placeholder = "请输入正确的手机号码";
                    thit.style.backgroundColor = "yellow";
                }*/
            }
        },
        checkTel: function (textTel) {
            textTel.onfocus = function () {
                //this.value = "";
                this.placeholder = "";
                this.style.backgroundColor = "white";
            };
            textTel.onblur = function () {
                check.checkVia(textTel);
            };
        },
        btnSubmit: function (textTel) {
            document.getElementById("btnSubmit").onclick = function () {
                check.checkVia(textTel);
                var url = g.urlHttp + 'JXBMX/AddyyBmxx';
                core.getJSONPCache(url, {type: 1, handset: textTel.value}, function (data) {
                    core.result(data, function (data) {
                        if (data.code == '0') {
                            alert(data.data);
                            //document.getElementById("textTel").value = '';
                        }
                    })
                })
            };
        },
        goodList: function () {
            var url = g.urlHttp + "JXPM/GetMSYXB";
            core.getJSONPCache(url, {}, function (data) {
                core.result(data, function (data) {
                    var dataBase = data.data.Result, str = '';
                    for (var i = 0; i < dataBase.length; i++) {
                        str += '<div class="jiaxiao"><em></em><strong>优选榜</strong><span>' + dataBase[i].JXNAME + '</span></div>';
                    }
                    $(".main").append(str);
                })
            })
        },
        init: function () {
<<<<<<< .mine
        	var back = $('.backOff i');
        	back.on('click',function(){
        		window.location = 'index.html';
        	})
        	
||||||| .r400
        	var back = $('.backOff i');
        	back.on('click',function(){
        		window.location = 'index.html';
        	})
        	
=======
>>>>>>> .r435
            var textTel = document.getElementById("textTel");
            this.checkTel(textTel);
            this.btnSubmit(textTel);
            this.goodList();
        }
    }
    check.init();
});