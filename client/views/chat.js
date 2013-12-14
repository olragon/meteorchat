Template.chat.helpers({
	enterToSend: function () {
		return Session.get('enterToSend');
	}
});

function submitForm(e) {
	e.preventDefault();

	var $form = $(e.target);
	var message = $form.serializeJSON();
	message.created = new Date();
	message.changed = new Date();
	message.creator = Meteor.userId();
	message.from = message.creator;
	Messages.insert(message, function (err, _id) {
		if (err) {
			alert('Lỗi', err);
		} else {
			$form.find('textarea').val('');
		}
	});
	return false;
}

Template.chat.events({
	'submit form': function (e) {
		return submitForm(e);
	},
	'click input[type="checkbox"]': function (e) {
		var $checkbox = $(e.target);
		if ($checkbox.is(':checked')) {
			Session.set('enterToSend', true);
		} else {
			Session.set('enterToSend', false);
		}
	},
	'keydown textarea': function (e) {
		var code = (e.keyCode ? e.keyCode : e.which);
		console.log(code, e);
		if (Session.get('enterToSend')) {
			if (code === 13 && !e.shiftKey) {
				submitForm(e);
				$(e.target.form).find('textarea').val('');
				return false;
			}
		}
	}
});

Template.chat.rendered = function () {
	ModuleLoader.ready('filepicker', function (filepicker) {
		console.log(filepicker);
	});
};