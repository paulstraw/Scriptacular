window.scriptacular.views.resultTab = Backbone.View.extend({
	id: 'result-tab',
	tagName: 'div',
	className: 'tab',

	//data:text/html;charset=utf-8;base64,CONTENT

	template: window.scriptacular.templates.resultTab,

	resultTemplate: window.scriptacular.templates.result,

	events: {

	},

	initialize: function() {

	},

	render: function() {
		var el = this.$el;

		el.html('<iframe src="data:text/html;charset=utf-8;base64,' + btoa(this.resultTemplate({
			project: this.model
		})) + '"></iframe>');

		return this;
	}
});