Template.contacts.helpers({
	users: function () {
		var users = {};
		Meteor.presences.find().forEach(function (presence) {
			if (presence.userId)
				users[presence.userId] = Meteor.users.findOne(presence.userId);
		});
		return _.toArray(users);
	}
});

Template.contacts.events({
	'click a[data-op="chat"]': function (e) {
		var $a = $(e.target);

		// prevent user chat with himself
		if (Meteor.userId() === $a.data('with')) return;

		// find rooms for 2 users
		var roomId = '';
		var roomMems = [Meteor.userId(), $a.data('with')];
		var query = Rooms.find({members: roomMems});
		if (query.count() === 0) {
			roomId = Rooms.insert({
				name: $a.text(),
				description: '',
				created: new Date(),
				changed: new Date(),
				members: roomMems,
				type: '1-on-1',
			});
		} else {
			roomId = query.fetch()[0];
		}

		// set room to active
		Session.set('activeRoom', roomId);
	}
});