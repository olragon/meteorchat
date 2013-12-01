Package.describe({
  summary: "Adds the method .serializeJSON() to jQuery, that serializes a form into a JavaScript Object with the same format as the default Ruby on Rails request params hash."
});

Package.on_use(function (api, where) {
  api.use('jquery', 'client');
  api.add_files('lib/jquery.serializeJSON.js', 'client');
  api.export('jQuery');
});
