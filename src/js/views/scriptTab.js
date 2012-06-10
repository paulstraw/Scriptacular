window.scriptacular.views.scriptTab = Backbone.View.extend({
	id: 'script-tab',
	tagName: 'div',
	className: 'tab',

	events: {

	},

	initialize: function() {
		var that = this;

		that.on('change', function(newJs) {
			this.model.set({js: newJs});
			this.model.save();
		});
	},

	initMirror: function() {
		var that = this,
			el = this.$el;

		that.codeMirror = CodeMirror.fromTextArea(el.find('textarea')[0], {
			mode: 'javascript',
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

		el.append('<textarea>' + this.model.get('js') + '</textarea>');

		return this;
	}
});