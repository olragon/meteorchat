Template.messages.helpers({
	messages: function () {
		// get active room
		var activeRoom = Session.get('activeRoom');
		var isPublicRoom = (Session.get('publicRoom') === activeRoom);

		console.log(isPublicRoom);

		// build message query
		var query = {};

		if (isPublicRoom) {
			query = _.extend(query, {
				$or: [
					{room: {$exists: false}}, // message not in any room
					{room: activeRoom}
				]
			});
		} else {
			query.room = activeRoom;
		}

		// get 200 latest messages
		var messages = Messages.find(query, { limit: 200, sort: { created: -1 } }).fetch();

		// sort messages by created time asc
		messages = _.sortBy(messages, function (message) {
			return message.created.getTime();
		});

		// group messages
		var grouped = [];
		_.each(messages, function (message, id) {
			if (messages[id-1] && messages[id-1].from === message.from && message.created.getTime() - messages[id-1].created.getTime() < (1 * 60 * 1000)) {
				grouped[grouped.length - 1].content += new Handlebars.SafeString('<br/>') + message.content;
			} else {
				grouped.push(message);
			}
		});

		return grouped;
	}
});

Template.messages_container.preserve(['.messages']);

Template.messages.rendered = function () {
	function updateSize() {
		var $messages = $('.messages');
		var maxHeight = $(window).height() - $('.chat').outerHeight() - $messages.offset().top;
		
		$messages.css({
			'max-height': maxHeight
		});

		App.scrollBottom();
	};

	$(window).resize(function() {
		updateSize();
	});

	updateSize();
};