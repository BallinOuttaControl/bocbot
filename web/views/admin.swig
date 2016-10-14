{% extends 'shared/base.swig' %}

{% block style %}
<link rel="stylesheet" type="text/css" href="/static/css/style.css" />
{% endblock %}

{% block body %}
<h1>It works!</h1>
{% endblock %}

{% block scripts %}
<script src="https://code.jquery.com/jquery-3.1.1.min.js" integrity="sha256-/SIrNqv8h6QGKDuNoLGA4iret+kyesCkHGzVUUV0shc=" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.3.3/backbone-min.js"></script>
{% endblock %}
