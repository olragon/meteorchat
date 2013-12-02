Template.message.helpers({
	message: function () {
		var message = _.clone(this); // avoid cross reference
		var created = message.created;
		var creator = Meteor.users.findOne(message.from);
		var message = _.extend(message, {
			created: [created.getHours(), created.getMinutes(), created.getSeconds()].join(':') +' - '+ [created.getDate(), created.getMonth() + 1, created.getFullYear()].join('/'),
			from: creator
		});

		// hiển thị link
		if (message.content) {
			message.content = message.content.autoLink({
				callback: function (link) {
					if (link.match(/(https?:\/\/.*\.(?:png|jpg))/i)) {
						return '<a href="'+ link +'" target="_blank"><img src="'+ link +'" class="thumbnail"></a>';
					}
					return '<a href="'+ link +'" target="_blank">'+ link +'</a>';
				}
			});
		}

		return message;
	}
});