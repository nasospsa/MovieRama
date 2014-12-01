require.config({
	paths: {
		jquery: "../bower_components/jquery/dist/jquery.min",
		underscore: "../bower_components/underscore/underscore-min",
	}
});
require(["index"], function(Index) {
	Index.initialize();
});
