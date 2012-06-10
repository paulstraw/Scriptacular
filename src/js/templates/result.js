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