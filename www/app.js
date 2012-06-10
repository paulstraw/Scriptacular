

/*********************************************** 
     Begin setup.js 
***********************************************/ 

(function() {
	var win = window;

	win.scriptacular = {
		models: {},
		collections: {},
		views: {},
		templates: {}
	};
}());

/*********************************************** 
     Begin result.js 
***********************************************/ 

window.scriptacular.templates.result = _.template([
	'<!doctype html>',
	'<html lang="en">',
		'<head>',
			'<meta charset="utf-8">',
			'<meta name="viewport" content="width=device-width initial-scale=1">',

			'<title>Scriptactular Preview</title>',

			'<style type="text/css">',
				'<%= project.get(\'css\') %>',
			'</style>',
		'</head>',

		'<body>',
			'<%= project.get(\'html\') %>',

			'<script>',
				'<%= project.get(\'js\') %>',
			'</script>',
		'</body>',
	'</html>'
].join(''));

/*********************************************** 
     Begin markupTab.js 
***********************************************/ 

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

/*********************************************** 
     Begin styleTab.js 
***********************************************/ 

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

/*********************************************** 
     Begin resultTab.js 
***********************************************/ 

window.scriptacular.templates.resultTab = _.template([
	'i am the result tab'
].join(''));

/*********************************************** 
     Begin resultTab.js 
***********************************************/ 

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

/*********************************************** 
     Begin scriptTab.js 
***********************************************/ 

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

/*********************************************** 
     Begin project.js 
***********************************************/ 

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

/*********************************************** 
     Begin projectList.js 
***********************************************/ 

window.scriptacular.templates.projectList = _.template([
	'<header>',
		'<h1 class="airplane">Scriptacular</h1>',
		'<a class="button pictos" href="#new" id="add-project">&</a>',
	'</header>',
	'<div class="scroll"><div class="scroll-inner">',
		'<ul>',
			'<% _.each(projects, function(project) { %>',
				'<li><a href="#projects/<%= project.get(\'id\') %>"><%= project.get(\'title\') %><div class="arrow"></div></a></li>',
			'<% }); %>',
		'</ul>',
	'</div></div>',
	'<footer>',
		'<div id="project-count"><%= projectCount %> projects</div>',
	'</footer>'
].join(''));

/*********************************************** 
     Begin projectList.js 
***********************************************/ 

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

/*********************************************** 
     Begin project.js 
***********************************************/ 

window.scriptacular.templates.project = _.template([
	'<header>',
		'<button class="back">Projects</button>',
		'<input id="project-title" value="<%= project.get(\'title\') %>">',
	'</header>',
	'<div class="scroll"><div class="scroll-inner" id="tab-content">',
	'</div></div>',
	'<footer>',
		'<menu>',
			'<li data-view-name="markupTab"><div class="icon inconsolata">&lt;/&gt;</div><div class="title">Markup</div></li>',
			'<li data-view-name="styleTab"><div class="icon inconsolata">{}</div><div class="title">Style</div></li>',
			'<li data-view-name="scriptTab"><div class="icon inconsolata js">();</div><div class="title">Script</div></li>',
			'<li data-view-name="resultTab"><div class="icon pictos">L</div><div class="title">Result</div></li>',
		'</menu>',
	'</footer>'
].join(''));

/*********************************************** 
     Begin project.js 
***********************************************/ 

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

/*********************************************** 
     Begin kickoff.js 
***********************************************/ 

(function() {
	var win = window;

	Backbone.View.prototype.close = function(){
		this.remove();
		this.unbind();
	};

	//more native-feeling "active" states
	(function() {
		var activeTimer,
			activeTarget;

		function cancelActive() {
			activeTarget.removeClass('active');
			clearTimeout(activeTimer);
		}

		$(window)
		.on('touchstart', function(e) {
			activeTarget = $(e.target);

			activeTimer = setTimeout(function() {
				activeTarget.addClass('active');
			}, 200);
		})
		.on('touchmove', cancelActive)
		.on('touchend', cancelActive)
		.on('click', function(e) {
			$('.active').removeClass('active');
			$(e.target).addClass('active');
		});
	}());


	win.scriptacular.router = Backbone.Router.extend({
		routes: {
			'': 'projectList',
			'new': 'project',
			'projects/:id': 'project'
		},

		initialize: function() {
			this.pageHistory = [];
		},

		projectList: function() {
			var projectList = new win.scriptacular.views.projectList({
				collection: win.projects
			});

			this.slidePage(projectList.render());
		},

		project: function(id) {
			var project = id ? win.projects.get(id) : win.projects.create(),
				projectView = new win.scriptacular.views.project({
					model: project
				});

			if (!id) {
				this.navigate('projects/' + project.get('id'));
			}

			this.slidePage(projectView.render());
		},

		slidePage: function(page) {
			var slideFrom,
				that = this;

			ScrollFix(page.$el.find('.scroll')[0]);

			//first page loaded?
			if (!this.currentPage) {
				page.$el.attr('class', 'page stage-center');
				$('#content').append(page.el);

				this.currentPage = page;

				return;
			}

			//cleanup
			$('.stage-right, .stage-left').remove();

			if (window.location.hash === '' || !this.currentPage) {
				slideFrom = 'left';
				$(page.el).attr('class', 'page stage-left');
				this.pageHistory = [window.location.hash];
			} else if (this.pageHistory.length > 1 && window.location.hash == this.pageHistory[this.pageHistory.length - 2]) {
				//new page is same as previous page, back animation
				slideFrom = 'left';
				page.$el.attr('class', 'page stage-left');
				this.pageHistory.pop();
			} else {
				//forward transition
				slideFrom = 'right';
				page.$el.attr('class', 'page stage-right');
				this.pageHistory.push(window.location.hash);
			}

			$('#content').append(page.el);

			//once the page has been added to the DOM, do animation magic
			_.defer(function() {
				// Slide out the current page: If new page slides from the right -> slide current page to the left, and vice versa
				$(that.currentPage.el).attr('class', 'page transition ' + (slideFrom === "right" ? 'stage-left' : 'stage-right'));
				// Slide in the new page
				$(page.el).attr('class', 'page stage-center transition');
				that.currentPage = page;
			});
		}
	});

	var router = new win.scriptacular.router();

	$(document).ready(function() {
		Backbone.history.start();
	});
}());