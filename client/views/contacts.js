Template.contacts.helpers({
	users: function () {
		var users = {};
		Meteor.presences.find().forEach(function (presence) {
			users[presence.userId] = Meteor.users.findOne(presence.userId);
		});
		return _.toArray(users);
	}
});