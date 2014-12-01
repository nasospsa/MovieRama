describe('Testing Views/List', function(done){
	var ViewList;

	before(function(done) {
		requirejs(['views/list'], function(_Module) {
			ViewList = _Module;
			done();
		});
	});

	describe('Object', function() {
		it('Variables', function() {
			var el = $('#main-results'),
				view = new ViewList(el);

			expect(view.$el).to.equal(el);
			expect(view.$list).to.not.be.null;
			expect(view.$total).to.not.be.null;
			expect(view.$more).to.not.be.null;

			expect(view.page_limit).to.equal(10);
			expect(view.itemTpl).to.not.be.undefined;
			expect(view.itemTpl.source).to.equal(_.template($('#movie-list-item-tpl').html()).source);
		});

		it('Methods', function() {
			var el = $('#main-results'),
				view = new ViewList(el);

			expect(view.load).to.exist;
			expect(view.loadData).to.exist;
			expect(view.render).to.exist;
			expect(view._renderOne).to.exist;
			expect(view._renderTotal).to.exist;
			expect(view.loadEvents).to.exist;
			expect(view._loadScrolling).to.exist;
		});

	});

	describe('Methods', function() {
		it('loadEvents  and _loadScrolling called on construct', function() {
			var spy_loadEvents = sinon.spy(ViewList.prototype, 'loadEvents'),
				spy_loadScrolling = sinon.spy(ViewList.prototype, '_loadScrolling'),
				el = $('#main-results'),
				view = new ViewList(el);

			expect(spy_loadEvents.calledOnce).to.be.true;
			expect(spy_loadScrolling.calledOnce).to.be.true;
		});
	})
});