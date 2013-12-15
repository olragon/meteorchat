Deps.autorun(function () {
	var activeRoom = Session.get('activeRoom');
	if (activeRoom) {
		Meteor.call('userLastSeenRoom', Meteor.userId(), activeRoom);
	}
});