define(['jquery', 'underscore', 'rotten-tomatoes'], function(__jquery, __underscore, RT) {
	var ViewDetails = function ($el, movie, callback) {
		this.itemTpl = _.template($('#movie-details-tpl').html());
		this.reviewTPL = _.template($('#movie-details-review-tpl').html());
		this.similarTPL = _.template($('#movie-details-similar-tpl').html());

		this.$el = $el;
		this.movie = movie;
		this.callback = callback;
		this.loadData();
	};

	_(ViewDetails.prototype).extend({
		render: function() {
			var $details = $(this.itemTpl(this.details)),
				reviews = _(this.details.reviews.reviews).first(2),
				similar = _(this.details.similar.movies).first(2);

			_(reviews).each(function(review) {
				var $reviewEl = $(this.reviewTPL(review));
				$details.find('.reviews').append($reviewEl);
			}, this);

			_(similar).each(function(movie) {
				var $movieEl = $(this.similarTPL(movie));
				$details.find('.similar').append($movieEl);
			}, this);

			this.$el.html($details).removeClass('hide');

			this.callback();

			return this.$el;
		},

		loadData: function() {
			var _this = this,
				dataSynced = {},
				renderAll = _.after(3,  function() {
					_this.details = dataSynced;
					_this.render();
				});

			RT.details(this.movie.id, function(data) {
				dataSynced.details = data;
				renderAll();
			});
			RT.reviews(this.movie.id, function(data) {
				dataSynced.reviews = data;
				renderAll();
			});
			RT.similar(this.movie.id, function(data) {
				dataSynced.similar = data;
				renderAll();
			});
		},

	});

	return ViewDetails;
});