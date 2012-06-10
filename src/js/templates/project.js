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