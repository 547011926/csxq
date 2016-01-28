require.config({
    paths: {
        'global': '../../global',
        'core': '../common.core',
        'user': 'user',
        'comm': 'communal'
    },
    shim: {}
});
require(['global', 'core', 'user', 'comm'], function (global, core, u, comm) {
    var initOperate = {
        CheackUpdate: function () {
            var doup = function () {
                comm.CheackUpdate('kaoshi', function (data) {
                        if (data == null) {

                        } else {
                            //不是最新 data是需要更新的版本信息
                            var str = '您的试题不是最新的，请先下载考题<br />试题大小：' + data.tksize + 'M';
                            var obj = {
                                content: str,
                                width: '100%',
                                height: '100%',
                                okFunc: okfunc
                            }
                            function okfunc() {
                                core.createClose('正在下载考题，请稍后', '', '100%', '100%');
                                comm.UploadData(function () {
                                    core.createClose('题库下载完毕，小不祝您拿本顺利', '确定', '100%', '100%');
                                    var s = window.localStorage;
                                    s.setItem('tk_version', data.VERSIONSNUM);
                                });
                            }
                            core.createConfirm(obj);
                        }
                    }
                )
            }
            navigator && navigator.onLine?doup():void(0);
        },
        InitDoMake: function () {
            $('#StartKaoShi').on('click', function () {
                var strStart = '按交管部门通知，科目' + ($('#kemu').val() == '1' ? '一' : '四') + '考试系统全面升级，全真模拟考试下不能修改答案，每做一题，系统自动计算错误题数，及格标准为90分';
                var obj = {
                    content: strStart,
                    width: '100%',
                    height: '100%',
                    optional: "返回",
                    okFunc: callBack
                }
                function callBack() {
                    var jiazhao = $('#jiazhao').val();
                    var kemu = $('#kemu').val();
                    if (jiazhao == null || kemu == null) {
                        return;
                    }
                    window.location = 'kaoshi.html?kemu=' + kemu + '&jiazhao=' + jiazhao;
                }
                core.createConfirm(obj);
            })

            $('#kemu').on('change', function () {
                ChangeTknum();
            });
            $('#jiazhao').on('change', function () {
                ChangeTknum();
            });
          
            
            //根据科目驾照类型显示不同
            function ChangeTknum() {
                var jz = $('#jiazhao').val();
                var km = $('#kemu').val();
                if (jz == 'D/E/F') {
                    $('#tk_num').text('50');
                    $('#tk_time').text('30');
                }
                else {
                    if (km == '1') {
                        $('#tk_num').text('100');
                        $('#tk_time').text('45');
                    }
                    else if (km == '4') {
                        $('#tk_num').text('50');
                        $('#tk_time').text('30');
                    }
                }
            }
        }
    }
    if (comm.JudgeClient() == '1') {
        //苹果
    }
    else {
        //安卓
        comm.OpenOrCreateDB();
        initOperate.CheackUpdate();
    }
    initOperate.InitDoMake();
})