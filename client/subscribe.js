Meteor.subscribe('userData');
Meteor.subscribe('userPresence');
Meteor.subscribe('rooms', Meteor.userId());
Meteor.subscribe('messages', Meteor.userId());