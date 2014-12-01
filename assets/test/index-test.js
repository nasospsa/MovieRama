describe('Testing Index', function(done){
	var Index,
		spy_in_theaters;

	before(function(done) {
		requirejs(['index'], function(_Module) {
			Index = _Module;
			spy_in_theaters = sinon.spy(Index, 'in_theaters');
			Index.initialize();
			done();
		});
	});

	describe('Default Values', function() {
		it('latency', function() {
			assert.equal(300, Index.latency);
		});
	});

	describe('Initialize', function() {
		it('$main', function() {
			var element = window.$('#input-main');
			expect(Index.$main).to.not.equal(undefined);
			expect(Index.$main.html()).to.equal(element.html());
		});
		it('ListView', function() {
			expect(Index.listView).to.exist;
		});
		it('in_theaters', function() {
			expect(spy_in_theaters.calledOnce).to.be.true;
		});
	});

	describe('Enable & Disable Search Input', function() {
		it('enable', function() {
			expect(Index.$main.prop('disabled')).to.be.false;
			Index.disableInput();
			expect(Index.$main.prop('disabled')).to.be.true;
		});

		it('disable', function() {
			expect(Index.$main.prop('disabled')).to.be.true;
			Index.enableInput();
			expect(Index.$main.prop('disabled')).to.be.false;
		});
	});

	describe('search', function() {
		it('listView.load', function() {
			spy_load = sinon.spy(Index.listView, 'load');
			Index.search('boo');
			expect(spy_load.calledOnce).to.be.true;
			expect(spy_load.firstCall.args[0]).to.be.a('function');
			expect(spy_load.firstCall.args[0].length).to.equal(2);
			expect(spy_load.firstCall.args[1]).to.be.a('function');
			expect(spy_load.firstCall.args[1].length).to.equal(0);
			spy_load.restore();
		});
	});

	describe('in_theaters', function() {
		it('listView.load', function() {
			spy_load = sinon.spy(Index.listView, 'load');
			Index.in_theaters();
			expect(spy_load.calledOnce).to.be.true;
			expect(spy_load.firstCall.args[0]).to.be.a('function');
			expect(spy_load.firstCall.args[0].length).to.equal(2);
			expect(spy_load.firstCall.args[1]).to.be.a('function');
			expect(spy_load.firstCall.args[1].length).to.equal(0);
			spy_load.restore();
		});
	});

});