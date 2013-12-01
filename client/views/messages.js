Template.messages.helpers({
	messages: function () {
		return Messages.find().fetch();
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

		$messages.animate({scrollTop: $messages.get(0).scrollHeight}, 400);
	};

	$(window).resize(function() {
		updateSize();
	});

	updateSize();
};