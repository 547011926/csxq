requirejs.config({
    baseUrl: "Scripts",
    paths: {
        "global": "../../global",
		"core": "../common.core",
		"user": "user",
		"xqvalidate": "../lib/xqvalidate"
    }, shim: {
        
    },
    waitSeconds: 0,
    urlArgs: "v=v1.0.0.13"
});