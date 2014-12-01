define([
	'jquery', 'underscore',
	'views/details'
], function(__jquery, __underscore, ViewDetails) {
	var ViewList = function ($el) {
		_(this).extend({
			$el: $el,
			$list: $el.find('ul'),
			$total: $el.find('#results-total'),
			$more: $el.find('#results-more'),

			itemTpl: _.template($('#movie-list-item-tpl').html()),
			page_limit: 10
		});

		this.loadEvents();
	};

	_(ViewList.prototype).extend({
		load: function(method, callback) {
			_(this).extend({
				current_page: 0,
				renderedAll: false,
				rendering: false,
				rtMethod: method,
				callback: callback,
			});
			this.loadData();
		},

		loadData: function() {
			var _this = this;
			this.current_page += 1;

			if (this.rendering == false) {
				this.rendering = true;

				this.rtMethod(this.current_page, function(data) {
					_this.render(data);
					_this.rendering = false;
				});
			}
		},

		render: function(data) {
			if (this.current_page == 1) {
				this.$list.empty();
				this._renderTotal(data.total);
				this.renderedAll = false;
				this.$more.removeClass('hide');
				this.callback();
			}

			_.each(data.movies, this._renderOne, this);

			if (((this.current_page) * this.page_limit) >= data.total) {
				this.renderedAll = true;
				this.$more.addClass('hide');
			}
		},

		_renderOne: function(movie) {
			var $movie = $(this.itemTpl(movie)),
				_this = this;

			$movie.find('button').click(function(e) {
				if ($movie.find('.details').is(':empty')) {
					new ViewDetails($movie.find('.details'), movie, function() {
						$movie.find('button').hide();
					});
				}
				return false;
			});
			this.$list.append($movie);
		},

		_renderTotal: function(total) {
			this.$total.removeClass('hide');
			this.$total.find('span').text(total);
		},

		loadEvents: function() {
			this._loadScrolling();
		},

		_loadScrolling: function() {
			var _this = this;

			$(window).scroll(function() {
				if  ( ($(window).scrollTop() == $(document).height() - $(window).height())
					&& !_this.renderedAll
					&& !_this.rendering
				){
					_this.loadData();
				}
			});
		}
	});

	return ViewList;
});