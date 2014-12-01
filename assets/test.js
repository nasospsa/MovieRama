global.requirejs = require('requirejs');
global.assert = require('assert');
global.window = global;


requirejs.config({
	baseUrl: 'app',
	paths: {
		underscore: '../bower_components/underscore/underscore-min',
		text: '../bower_components/requirejs-text/text',
	}
});

var jsdom = require('jsdom');
var window = jsdom.jsdom(requirejs('text!../../index.html')).parentWindow;

global.$ = require('jquery')(window);
global._ = require('underscore');

var chai = require('chai');
global.expect = chai.expect;
global.chai = chai;
global.sinon = require('sinon');

var Mocha = require('mocha'),
	mocha = new Mocha({ ui: 'bdd', reporter: 'spec' });

mocha.addFile('test/rotten-tomatoes-test');
mocha.addFile('test/index-test');
mocha.addFile('test/views/details-test');
mocha.addFile('test/views/list-test');
mocha.run();