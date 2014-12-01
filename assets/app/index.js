define([
	'jquery', 'underscore', 'rotten-tomatoes',
	'views/list'
], function(__jquery__, __underscore__, RT,ViewList) {
	var App = {
		latency: 300,

		initialize: function() {
			this.$main = $('#input-main');
			this.$main.keyup(_.debounce(this.input_changed.bind(this), this.latency));

			this.listView = new ViewList($('#main-results'));

			this.in_theaters();
		},

		input_changed: function() {
			var text = this.$main.val();
			if (this.lastSearchedTerm != text) {
				this.disableInput();
				this.lastSearchedTerm = text;
				if (text.length > 0) {
					this.search(text);
				} else {
					this.in_theaters();
				}
			}
		},

		disableInput: function() {
			this.$main.prop('disabled', true);
		},

		enableInput: function() {
			this.$main.prop('disabled', false);
			this.$main.focus();
		},

		search: function(text) {
			var _this = this;
			this.listView.load(function(page, callback) {
				RT.search(text, page, callback);
			}, function() {
				_this.enableInput();
			});
		},

		in_theaters: function() {
			var _this = this;
			this.listView.load(function(page, callback) {
				RT.in_theaters(page, callback);
			}, function() {
				_this.enableInput();
			});
		},
	}

	return App;
});