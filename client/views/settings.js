Template.settings.events({
	'click input[name="autoScroll"]': function (e) {
		var isAutoScroll = $(e.target).is(':checked');
		Session.set('autoScroll', isAutoScroll);
		if (isAutoScroll) {
			App.scrollBottom();
		}
	}
});

Template.settings.helpers({
	settings: function () {
		return {
			autoScroll: Session.get('autoScroll', true)
		}
	}
});