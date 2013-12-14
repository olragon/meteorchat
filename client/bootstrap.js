Meteor.startup(function () {

});

ModuleLoader.define('filepicker', {
	source: 'http://api.filepicker.io/v1/filepicker.js',
	verify: function () {
		return window.filepicker;
	},
	loaded: function () {
		filepicker.setKey('AC5lgyPESq2zoFPqFtMMnz');
	}
});