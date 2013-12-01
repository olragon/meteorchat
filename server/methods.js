Meteor.methods({
	getProfile: function (_id) {
		var user = Meteor.users.findOne(_id);
		if (user && user.profile) {
			return user.profile;
		}
	},
	getAvatar: function (_id) {
		var user = Meteor.users.findOne(_id);
		if (user && user.emails.length > 0)
			return Gravatar.imageUrl(user.emails[0].address);
	},
	updateAvatar: function (_id) {
		var avatar = Meteor.call('getAvatar', _id);
		if (avatar)
			Meteor.users.update(_id, { $set: { 'profile.avatar': avatar } });
	}
});