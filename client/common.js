window.App = {
	scrollBottom: function () {
		var $messages = $('.messages');
		if (Session.get('autoScroll')) {
			$messages.animate({scrollTop: $messages.get(0).scrollHeight}, 500);
			imagesLoaded($messages.get(0), function () {
				$messages.animate({scrollTop: $messages.get(0).scrollHeight}, 500);
			});
		}
	}
};