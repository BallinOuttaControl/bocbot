{% extends 'shared/base.swig' %}

{% block style %}
<link rel="stylesheet" type="text/css" href="/static/css/style.css" />
{% endblock %}

{% block body %}
<div class="cover-image">
	<img src="/static/img/hubot.png" alt="hubot" />
</div>
{% endblock %}

{% block scripts %}
<script src="https://code.jquery.com/jquery-2.2.3.min.js" integrity="sha256-a23g1Nt4dtEYOj7bR+vTu7+T8VP13humZFBJNIYoEJo=" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.3.3/backbone-min.js"></script>
{% endblock %}
