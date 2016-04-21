---
title: 'Alarm Clock'
---

{% extends 'shared/layout.swig' %}

{% block body %}
<h1>It works!</h1>
<div class="test"></div>
{% endblock %}

{% block scripts %}
<script>
	$(function(){
		$('.test').text('JS test passed!');
	})
</script>
{% endblock %}