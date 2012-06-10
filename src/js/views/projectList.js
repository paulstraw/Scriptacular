window.scriptacular.views.projectList = Backbone.View.extend({
	id: 'project-list',
	tagName: 'div',

	template: window.scriptacular.templates.projectList,

	events: {
		'swipeRight li': 'showDelete'
	},

	initialize: function() {

	},

	showDelete: function(e) {
		e.stopPropagation();
		console.log('omgomgomg');
	},

	render: function() {
		this.$el.html(this.template({
			projects: this.collection.models,
			projectCount: this.collection.length
		}));
		return this;
	}
});