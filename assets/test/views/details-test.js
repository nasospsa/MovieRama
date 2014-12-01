describe('Testing Views/Details', function(done){
	var ViewDetails,
		RT,
		createView = function() {
			var el = 'elelele',
				movie = 'transformers',
				callback = function() {},
				details = new ViewDetails(el, movie, callback);
			return details;
		};

	before(function(done) {
		requirejs(['views/details', 'rotten-tomatoes'], function(_Module, Rotten) {
			ViewDetails = _Module;
			RT = Rotten;
			done();
		});
	});


	describe('Methods Exist', function() {
		it('Variables', function() {
			var el = 'elelele',
				movie = 'transformers',
				callback = function() {},
				details = new ViewDetails(el, movie, callback);

			expect(details.itemTpl.source).to.equal(_.template($('#movie-details-tpl').html()).source);
			expect(details.reviewTPL.source).to.equal(_.template($('#movie-details-review-tpl').html()).source);
			expect(details.similarTPL.source).to.equal(_.template($('#movie-details-similar-tpl').html()).source);

			expect(details.$el).to.equal(el);
			expect(details.movie).to.equal(movie);
			expect(details.callback).to.equal(callback);
		});

		it('Methods', function() {
			var spy_loadData = sinon.spy(ViewDetails.prototype, 'loadData'),
				view = createView();

			expect(view.render).to.be.a('function');
			expect(view.loadData).to.be.a('function');
			expect(spy_loadData.calledOnce).to.be.true;
			spy_loadData.restore();
		});
	});

	describe('loadData', function() {
		it('RT methods called', function() {
			var el = $('<div />'),
				movie = {
					id:12345,
					title: 'transformers'
				},
				callback = function() {},
				spy_render = sinon.spy(ViewDetails.prototype, 'render'),
				spy_details = sinon.spy(RT, 'details'),
				spy_reviews = sinon.spy(RT, 'reviews'),
				spy_similar = sinon.spy(RT, 'similar'),
				view = new ViewDetails(el, movie, callback);
			expect(spy_details.calledOnce).to.be.true;
			expect(spy_details.firstCall.args[0]).to.equal(12345);
			expect(spy_details.firstCall.args[1]).to.be.a('function');
			expect(spy_reviews.calledOnce).to.be.true;
			expect(spy_reviews.firstCall.args[0]).to.equal(12345);
			expect(spy_reviews.firstCall.args[1]).to.be.a('function');
			expect(spy_similar.calledOnce).to.be.true;
			expect(spy_similar.firstCall.args[0]).to.equal(12345);
			expect(spy_similar.firstCall.args[1]).to.be.a('function');
			spy_render.restore();
			spy_details.restore();
			spy_reviews.restore();
			spy_similar.restore();
		});
	});

	describe('render', function() {
		it('callback called', function() {
			var el = $('<div />'),
				movie = 'transformers',
				callback = function() {},
				view = new ViewDetails(el, movie, callback),
				spy_callback = sinon.spy(view, 'callback');

			view.details = {
				details: {
					genres: [],
					abridged_directors: [{
						name: 'darren aronofsky'
					}]
				},
				reviews: { reviews: [] },
				similar: { movies:[] }
			};
			view.render();

			var expectedEl = view.item
			// console.log(view.$el.html());
			expect(spy_callback.calledOnce).to.be.true;
		});
	});

});