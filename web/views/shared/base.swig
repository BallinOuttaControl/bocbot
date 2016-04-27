<!DOCTYPE html>
<html>
<head>
	{% include '../partials/meta.swig' %}
	<title>bocbot</title>
	<link rel="shortcut icon" href="/static/img/favicon.ico" />

	{% block style %}{% endblock %}
</head>
<body>
	{% block body %}{% endblock %}

	{# Partials #}
	{# {% include "../partials/loader.swig" %} #}

	{# Scripts #}
	<script>
		var app = {};
	</script>

	{% block scripts %}{% endblock %}
</body>
</html>