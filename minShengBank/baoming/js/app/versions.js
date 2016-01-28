require.config({
	paths: {
		"global": "../../global",
	},
	shim: {

	}
});
require(['global'], function(g) {
//	document.write('版本号： ' + g.m_version);
	
	$('body').append('版本号： ' + g.m_version);
})