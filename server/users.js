Meteor.startup(function () {
	Meteor.users.find().forEach(function (user) {
		if (!user.profile || !user.profile.avatar) {
			Meteor.users.update(user._id, { $set: { 'profile.avatar': Meteor.call('getAvatar', user._id) } });
		}
	});
});