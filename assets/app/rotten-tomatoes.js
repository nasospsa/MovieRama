define(['jquery'], function(__jquery) {
	return {
		apiKey: 'xc5v59emq57yean7v2n4wb9p',
		rtURL: 'http://api.rottentomatoes.com/api/public/v1.0/',
		recentURL: 'lists/movies/in_theaters.json',
		searchURL: 'movies.json',
		page_limit: 10,

		detailsURL: 'movies/:id.json',
		reviewsURL: 'movies/:id/reviews.json',
		similarURL: 'movies/:id/similar.json',

		in_theaters: function(page, callback) {
			this._request({
				page_limit: this.page_limit,
				page: page
			}, this.recentURL, callback);
		},

		search: function(term, page, callback) {
			this._request({
				q: term,
				page_limit: this.page_limit,
				page: page
			}, this.searchURL, callback);
		},

		details: function(id, callback) {
			this._request({}, this.detailsURL.replace(':id', id), callback);
		},

		reviews: function(id, callback) {
			this._request({}, this.reviewsURL.replace(':id', id), callback);
		},
		similar: function(id, callback) {
			this._request({}, this.similarURL.replace(':id', id), callback);
		},

		_request: function(data, url, callback) {
			var key = this.apiKey,
				url = this.rtURL + url,
				data = _(data).clone();

			$.ajax({
				url: url,
				data: _.extend(data, {
					apikey: key
				}),
				dataType: "jsonp",
				success: callback
			});
		}
	}
});