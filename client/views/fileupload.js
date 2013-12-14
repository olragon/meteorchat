Template.fileupload.rendered = function () {
	console.log(this);
	var $drop = $('#fileupload');
	var $status = $('#fileupload .h3');
	var $progress = $('#fileupload_progress .progress-bar');
	var $progress_text = $('#fileupload .uploadprogress');
	var updateProgress = function (percentage) {
		$progress
			.attr('aria-valuenow', percentage)
			.css('width', percentage + '%')
			.find('span')
				.text(percentage + '% complete!');

		if (percentage === 0) {
			$progress_text.html(0).hide();
		} else {
			$progress_text.show().html(percentage + '% complete!');
		}
	}
	

	ModuleLoader.ready('filepicker', function (filepicker) {
		filepicker.makeDropPane($drop.get(0), {
			multiple: true,
			dragEnter: function () {
				$drop.css({
					'backgroundColor': "#E0E0E0",
					'border': "1px solid #000"
				});
				$status.html('Drop to send file.');
			},
			dragLeave: function () {
				$drop.css({
					'backgroundColor': "#F6F6F6",
					'border': "1px dashed #666"
				});
				$status.html('Drag & Drop file here to send.');
			},
			onSuccess: function (InkBlobs) {
				console.log(InkBlobs);
				updateProgress(100);

				var message = {};
				message.type = 'file';
				message.content = InkBlobs;
				message.created = new Date();
				message.changed = new Date();
				message.creator = Meteor.userId();
				message.from = message.creator;
				Messages.insert(message, function (err, _id) {
					console.log(err, _id);
				});

				// reset progress
				updateProgress(0);
			},
			onError: function (type, message) {
				alert('Send file error ' + message);
				console.error(type, message);
			},
			onProgress: function (percentage) {
				updateProgress(percentage);
			}
		})
	});

	// var $overlay = $('.overlay');

	// $(document).on('dragstart', function (e) {

	// });
	// $(document).on('dragover', function (e) {
	// 	$overlay.find('.overlay-mask').show();
	// });
	// $(document).on('dragenter', function (e) {

	// });
	// $overlay.find('.overlay-mask').on('dragleave', function (e) {
	// 	$overlay.find('.overlay-mask').hide();
	// });
	// $overlay.find('.overlay-mask').on('drop', function (e) {
	// 	console.log('drop', e);
	// 	// e.preventDefault();
	// 	// e.stopPropagation();
	// 	// return false;
	// });
	// $('document, body').on('drop', function () {
	// 	// e.preventDefault();
	// 	// e.stopPropagation();
	// 	// return false;
	// });
}