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
	},
	'click a[data-op="remove"]': function (e) {
		var $a = $(e.target);
		// @todo: validate user has permission to delete this room
		if ($a.data('room') != Session.get('publicRoom')) {
			if (confirm('Do you want to unsubscribe this room?')) {
				Messages.find({room: $a.data('room')}).forEach(function (message) {
					Messages.remove(message._id);
				});
				Rooms.remove($a.data('room'));
				Session.set('activeRoom', Session.get('publicRoom'));
			}
		}
	}
});