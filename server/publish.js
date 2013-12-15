Meteor.publish('userData', function () {
	return Meteor.users.find({}, {fields: { profile: 1 }});
});

Meteor.publish('userPresence', function () {
	// Setup some filter to find the users your logged in user
	// cares about. It's unlikely that you want to publish the 
	// presences of _all_ the users in the system.
	var filter = {}; 

	// ProTip: unless you need it, don't send lastSeen down as it'll make your 
	// templates constantly re-render (and use bandwidth)
	return Meteor.presences.find(filter, {fields: {state: true, userId: true}});
});

Meteor.publish('rooms', function (userId) {
	return Rooms.find({
		$or: [
			{type: 'public'},
			{type: '1-on-1', members: { $in: [userId] }}
		]
	});
});

Meteor.publish('messages', function (userId) {
	var rooms = [];

	// get all public rooms and room contain userId
	Rooms.find({$or: [
				{type: 'public'},
				{type: '1-on-1', members: { $in: [userId] }}
			]}).forEach(function (room) {
				rooms.push(room._id);
			});

  // get all messages from these rooms
	return Messages.find({
		$or: [
			{from: userId},
			{room: { $in: rooms }}
		]
	});
});