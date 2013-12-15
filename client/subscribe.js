Meteor.subscribe('userData');
Meteor.subscribe('userPresence');
Meteor.subscribe('rooms', Meteor.userId(), function () {
	var pubRoom = Rooms.findOne({type: 'public', members: ['__all__']});
	if (!Session.get('activeRoom')) {
		Session.set('activeRoom', pubRoom._id);	
	}
	if (!Session.get('publicRoom')) {
		Session.set('publicRoom', pubRoom._id);		
	}
});
Meteor.subscribe('messages', Meteor.userId());