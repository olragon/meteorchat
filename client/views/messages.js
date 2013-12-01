Template.messages.helpers({
	messages: function () {
		// get 200 latest messages
		var messages = Messages.find({}, { limit: 200, sort: { created: -1 } }).fetch();

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

		$messages.animate({scrollTop: $messages.get(0).scrollHeight}, 0);
	};

	$(window).resize(function() {
		updateSize();
	});

	updateSize();
};