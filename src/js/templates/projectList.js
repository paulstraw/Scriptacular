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