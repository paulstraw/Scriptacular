(function() {
	var win = window;

	win.scriptacular.models.project = Backbone.Model.extend({
		defaults: {
			title: 'Untitled',
			html: '',
			css: '',
			js: ''
		},

		initialize: function() {
/*			this.on('error', function(model, error) {
				if (error == 'invalidTitle') {
					model.set({title: 'Untitled'});
				}
			});*/
		},

		validate: function(attrs) {
/*			if (attrs.title === '') {
				return 'invalidTitle';
			}*/
		}
	});

	win.scriptacular.collections.projectList = Backbone.Collection.extend({
		model: win.scriptacular.models.project,

		localStorage: new Store('scriptacularProjects')
	});

	win.projects = new win.scriptacular.collections.projectList();

	win.projects.fetch();
}());