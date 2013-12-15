Template.rooms.helpers({
	rooms: function () {
		var usersList = Session.get('usersList');
		var rooms = [];

		// build room query
		var query = {$or: [
			{type: 'public', members: ['__all__']},
			{type: '1-on-1', members: { $in: [Meteor.userId()] }}
		]};

		var userRooms = {};
		if (Meteor.user().chat) {
			userRooms = Meteor.user().chat.rooms;
		}
		console.log(userRooms);

		// 
		Rooms.find(query).forEach(function (room) {
			// dynamic create room name
			if (room.type === '1-on-1') {
				var otherMember = _.reject(room.members, function (member) { return member === Meteor.userId() });

				if (usersList && usersList[otherMember[0]]) {
					room.name = usersList[otherMember[0]].profile.name;
				}
			}

			// count unread message
			if (userRooms[room._id] && room._id != Session.get('activeRoom')) {
				room.unread = Messages.find({room: room._id, created: { $gte: userRooms[room._id].lastSeen }}).count();	
			}

			rooms.push(room);
		});
		return rooms;
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
	'click a[data-op="unsubscribe"]': function (e) {
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
		} else {
			alert('You cannot unsubscribe from public room!');
		}
		return false;
	}
});