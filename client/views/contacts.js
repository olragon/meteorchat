Template.contacts.helpers({
	users: function () {
		var users = [];
		Meteor.presences.find().forEach(function (presence) {
			if (presence.userId != Meteor.userId()) {
				users.push(Meteor.users.findOne(presence.userId));
			}
		});
		return users;
	}
});