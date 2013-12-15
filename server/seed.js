Rooms.remove();
if (Rooms.find().count() === 0) {
	Rooms.insert({
		name: 'Public',
		description: 'Public',
		members: ['__all__'],
		created: new Date(),
		changed: new Date(),
		type: 'public'
	});
}
Rooms.find({type: { $exists: false }}).forEach(function (room) {
	Rooms.update(room._id, { $set: { type: 'public' } });
});