window.scriptacular.views.markupTab = Backbone.View.extend({
	id: 'markup-tab',
	tagName: 'div',
	className: 'tab',

	events: {

	},

	initialize: function() {
		var that = this;

		that.on('change', function(newHtml) {
			this.model.set({html: newHtml});
			this.model.save();
		});
	},

	initMirror: function() {
		var that = this,
			el = this.$el;

		that.codeMirror = CodeMirror.fromTextArea(el.find('textarea')[0], {
			mode: 'htmlmixed',
			indentUnit: 4,
			indentWithTabs: true,
			gutter: false,
			lineWrapping: true,
			onChange: function() {
				that.trigger('change', [that.codeMirror.getValue()]);
			}
		});
	},

	render: function() {
		var el = this.$el;

		el.append('<textarea>' + this.model.get('html') + '</textarea>');

		return this;
	}
});