Template.message.helpers({
	message: function () {
		var message = _.clone(this); // avoid cross reference
		var created = message.created;
		var creator = Meteor.users.findOne(message.from);
		var message = _.extend(message, {
			created: [created.getHours(), created.getMinutes(), created.getSeconds()].join(':') +' - '+ [created.getDate(), created.getMonth() + 1, created.getFullYear()].join('/'),
			from: creator
		});

		// hiển thị file
		if (message.type && message.type === 'file') {
			var InkBlobs = _.isString(message.content) ? JSON.parse(message.content) : message.content;
			var content = '<div>';
			_.each(InkBlobs, function (InkBlob) {
				content += '<div class="row">';
				content += '	<div class="col-md-1"><i class="glyphicon glyphicon-file"></i></div>';
				content += '	<div class="col-md-5">';
				if (InkBlob && InkBlob.mimetype && InkBlob.mimetype.match(/^image/)) {
					content += '	<a href="'+ InkBlob.url +'"><img src="'+ InkBlob.url +'" class="thumbnail"></a>';
				}
				content += '	<a href="'+ InkBlob.url +'">'+ InkBlob.filename +' ('+ bytesToSize(InkBlob.size) +') </a>';
				content += '</div>'
			});
			content += '</div>';

			message.content = content;
		}

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