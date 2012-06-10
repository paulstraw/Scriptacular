window.scriptacular.views.project = Backbone.View.extend({
	id: 'project',
	tagName: 'div',

	template: window.scriptacular.templates.project,

	events: {
		'click .back': 'back',
		'focusout #project-title': 'updateTitle',
		'mouseup #project-title': 'selectHelper',
		'focusin #project-title': 'selectTitle',
		'click footer li': 'switchTab'
	},

	selectHelper: function() {
		return false;
	},

	selectTitle: function(e) {
		e.target.setSelectionRange(0, 9999);
	},

	switchTab: function(e) {
		var trigger = $(e.currentTarget),
			view = new window.scriptacular.views[trigger.data('view-name')]({
				model: this.model
			});

		trigger.addClass('current').siblings().removeClass('current');

		this.$el.find('#tab-content').html(view.render().el);

		_.defer(function() {
			if (view.initMirror) {
				view.initMirror();
			}
		});
	},

	updateTitle: function(e) {
		var el = $(e.target),
			val = el.val();

		if (!val) {
			val = 'Untitled';
			el.val('Untitled');
		}

		this.model.set({title: val});
		this.model.save();
	},

	back: function(e) {
		this.model.save();
		window.location.hash = '';
	},

	initialize: function() {

	},

	render: function() {
		var el = this.$el;

		el.html(this.template({
			project: this.model
		}));

		//fake click the first tab
		this.switchTab({
			currentTarget: el.find('footer li:first-child')
		});

		return this;
	}
});