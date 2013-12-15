Meteor.startup(function () {
	Session.set('enterToSend', true);
	Session.set('autoScroll', true);

	var pubRoom = Rooms.findOne({type: 'public', members: ['__all__']});
	if (pubRoom) {
		Session.set('activeRoom', pubRoom._id);
		Session.set('publicRoom', pubRoom._id);
	}

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