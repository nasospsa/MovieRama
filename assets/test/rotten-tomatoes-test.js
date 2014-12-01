describe('Testing Rotten Tomatoes', function(done){
	var RT;
	
	beforeEach(function(done){
		requirejs(['rotten-tomatoes'], function(_Module){
			RT = _Module;
			done();
		});
	});

	describe('Default Values', function() {
		it('apiKey', function(){
			expect(RT.apiKey).to.equal('xc5v59emq57yean7v2n4wb9p');
		});

		it('rtURL', function(){
			expect(RT.rtURL).to.equal('http://api.rottentomatoes.com/api/public/v1.0/');
		});

		it('recentURL', function() {
			expect(RT.recentURL).to.equal('lists/movies/in_theaters.json');
		});
		it('searchURL', function() {
			expect(RT.searchURL).to.equal('movies.json');
		});
		it('page_limit', function() {
			expect(RT.page_limit).to.equal(10);
		});
		it('detailsURL', function() {
			expect(RT.detailsURL).to.equal('movies/:id.json');
		});
		it('reviewsURL', function() {
			expect(RT.reviewsURL).to.equal('movies/:id/reviews.json');
		});
		it('similarURL', function() {
			expect(RT.similarURL).to.equal('movies/:id/similar.json');
		});
		it('functions', function() {
			expect(RT.in_theaters).to.be.a('function');
			expect(RT.search).to.be.a('function');
			expect(RT.details).to.be.a('function');
			expect(RT.reviews).to.be.a('function');
			expect(RT.similar).to.be.a('function');
		});
	});

	describe('ajax', function() {
		it('_request fires ajax request', function() {
			spy_ajax = sinon.spy($, 'ajax');
			RT._request({a: 5}, 'boo', function() {});
			expect(spy_ajax.calledOnce).to.be.true;
			expect(spy_ajax.firstCall.args[0]).to.be.a('object');
			expect(spy_ajax.firstCall.args[0].url).to.equal(RT.rtURL + 'boo');
			assert.deepEqual(spy_ajax.firstCall.args[0].data, {
				a: 5,
				apikey: RT.apiKey
			});
			expect(spy_ajax.firstCall.args[0].dataType).to.equal('jsonp');
			expect(spy_ajax.firstCall.args[0].success).to.be.a('function');
			spy_ajax.restore();
		});

		it('in_theaters', function() {
			spy_request = sinon.spy(RT, '_request');
			var callback = function() {};
			RT.in_theaters(1, callback);
			expect(spy_request.calledOnce).to.be.true;
			assert.deepEqual(spy_request.firstCall.args[0], {
				page_limit: RT.page_limit,
				page: 1
			});
			expect(spy_request.firstCall.args[1]).to.equal(RT.recentURL);
			expect(spy_request.firstCall.args[2]).to.equal(callback);
			spy_request.restore();
		});

		it('search', function() {
			spy_request = sinon.spy(RT, '_request');
			var callback = function() {};
			RT.search('foo', 18, callback);
			expect(spy_request.calledOnce).to.be.true;
			assert.deepEqual(spy_request.firstCall.args[0], {
				q: 'foo',
				page_limit: RT.page_limit,
				page: 18
			});
			expect(spy_request.firstCall.args[1]).to.equal(RT.searchURL);
			expect(spy_request.firstCall.args[2]).to.equal(callback);
			spy_request.restore();
		});

		it('details', function() {
			spy_request = sinon.spy(RT, '_request');
			var callback = function() {};
			RT.details(12345, callback);
			expect(spy_request.calledOnce).to.be.true;
			assert.deepEqual(spy_request.firstCall.args[0], {});
			expect(spy_request.firstCall.args[1]).to.equal(RT.detailsURL.replace(':id', 12345));
			expect(spy_request.firstCall.args[2]).to.equal(callback);
			spy_request.restore();
		});

		it('reviews', function() {
			spy_request = sinon.spy(RT, '_request');
			var callback = function() {};
			RT.reviews(12345, callback);
			expect(spy_request.calledOnce).to.be.true;
			assert.deepEqual(spy_request.firstCall.args[0], {});
			expect(spy_request.firstCall.args[1]).to.equal(RT.reviewsURL.replace(':id', 12345));
			expect(spy_request.firstCall.args[2]).to.equal(callback);
			spy_request.restore();
		});

		it('similar', function() {
			spy_request = sinon.spy(RT, '_request');
			var callback = function() {};
			RT.similar(12345, callback);
			expect(spy_request.calledOnce).to.be.true;
			assert.deepEqual(spy_request.firstCall.args[0], {});
			expect(spy_request.firstCall.args[1]).to.equal(RT.similarURL.replace(':id', 12345));
			expect(spy_request.firstCall.args[2]).to.equal(callback);
			spy_request.restore();
		});

	});
});