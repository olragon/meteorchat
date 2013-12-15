Template.contacts.helpers({
	users: function () {
		var users = {};
		console.log(Meteor.presences.find().fetch());
		Meteor.presences.find().forEach(function (presence) {
			if (presence.userId)
				users[presence.userId] = Meteor.users.findOne(presence.userId);
		});
		Session.set('usersList', users);
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
		var room = Rooms.findOne({name: roomMems.join('_')});
		if (!room) {
			roomId = Rooms.insert({
				name: roomMems.join('_'),
				description: '',
				created: new Date(),
				changed: new Date(),
				members: roomMems,
				type: '1-on-1',
				creator: Meteor.userId()
			});
		} else {
			roomId = room._id;
		}

		// set room to active
		if (Session.get('activeRoom') != roomId) {
			Session.set('activeRoom', roomId);
		}
	}
});