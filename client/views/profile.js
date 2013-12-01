Template.profile.events({
	'submit form': function (e) {
		e.preventDefault();
		var $form = $(e.target);
		var me = Meteor.user();
		var formValues = $form.serializeJSON();
		profile = _.extend(me.profile || {}, formValues.profile);
		Meteor.users.update(me._id, { $set: { profile: profile } });
		Meteor.call('updateAvatar', me._id);
		return false;
	}
});