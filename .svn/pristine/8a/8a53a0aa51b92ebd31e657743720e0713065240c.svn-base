define([],function(){
	
    var smallDatabase;

    function runQuery(query, data, successCallback) {

    		open();
        var i, l, remaining;

        if (!(data[0] instanceof Array)) {
            data = [data];
        }

        remaining = data.length;
        function innerSuccessCallback(tx, rs) {
            var i, l, output = [];
            remaining = remaining - 1;
            if (!remaining) {

                // HACK Convert row object to an array to make our lives easier
                for (i = 0, l = rs.rows.length; i < l; i = i + 1) {
                    output.push(rs.rows.item(i));
                }
                if (successCallback) {
                    successCallback(output);
                }
            }
        }

        function errorCallback(tx, e) {
            alert("An error has occurred");
            console.log(e.message);
        }
        smallDatabase.transaction(function (tx) {
            for (i = 0, l = data.length; i < l; i = i + 1) {
                tx.executeSql(query, data[i], innerSuccessCallback, errorCallback);
            }
        });
    }

    function open() {
        smallDatabase = openDatabase("JKZS", "1.0", "学车不驾考助手数据库", (100 * 1024 * 1024));
    }
    
    function GetDBSession(){
    	open();
    	return smallDatabase;
    }

    return {
        runQuery: runQuery,
        GetDBSession:GetDBSession
    };
});