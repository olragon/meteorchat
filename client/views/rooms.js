Template.rooms.helpers({
	rooms: function () {
		return Rooms.find().fetch();
	},
	activeRoom: function () {
		return Session.get('activeRoom');
	}
});

Template.rooms.events({
	'click a[data-op="join"]': function (e) {
		var $a = $(e.target);
		Session.set('activeRoom', $a.data('room'));
		return false;
	}
});