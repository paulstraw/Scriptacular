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