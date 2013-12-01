Template.message.helpers({
	message: function () {
		var message = _.clone(this); // avoid cross reference
		var created = message.created;
		var creator = Meteor.users.findOne(message.from);
		var message = _.extend(message, {
			created: [created.getHours(), created.getMinutes(), created.getSeconds()].join(':') +' '+ [created.getDate(), created.getMonth() + 1, created.getFullYear()].join('/'),
			from: creator
		});
		return message;
	}
});