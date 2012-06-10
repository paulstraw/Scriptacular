window.scriptacular.views.styleTab = Backbone.View.extend({
	id: 'style-tab',
	tagName: 'div',
	className: 'tab',

	events: {

	},

	initialize: function() {
		var that = this;

		that.on('change', function(newCss) {
			this.model.set({css: newCss});
			this.model.save();
		});
	},

	initMirror: function() {
		var that = this,
			el = this.$el;

		that.codeMirror = CodeMirror.fromTextArea(el.find('textarea')[0], {
			mode: 'css',
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

		el.append('<textarea>' + this.model.get('css') + '</textarea>');

		return this;
	}
});