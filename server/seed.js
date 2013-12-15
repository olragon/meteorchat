Meteor.startup(function () {
	if (Rooms.find().count() === 0) {
		Rooms.insert({
			name: 'Public',
			description: 'Public',
			members: ['__all__'],
			created: new Date(),
			changed: new Date(),
			type: 'public'
		});
	}
});