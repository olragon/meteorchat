Template.files.helpers({
	files: function () {
		var files = [];
		Messages.find({type: 'file'}, {sort: { created: -1 }}).forEach(function (file) {
			var InkBlobs = _.isString(file.content) ? JSON.parse(file.content) : file.content;
			_.each(InkBlobs, function (InkBlob) {
				InkBlob.size = bytesToSize(InkBlob.size);
				files.push(InkBlob);
			});
		});
		return files;
	}
});