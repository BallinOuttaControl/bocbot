{% extends 'shared/base.swig' %}

{% block style %}
  <link rel="stylesheet" type="text/css" href="/static/css/error.css" />
{% endblock %}

{% block scripts %}
  <script src="https://code.jquery.com/jquery-2.2.3.min.js" integrity="sha256-a23g1Nt4dtEYOj7bR+vTu7+T8VP13humZFBJNIYoEJo=" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/hammer.js/1.0.6/hammer.min.js"></script>
  <script src="/static/js/error.js"></script>
{% endblock %}

{% block body %}
  <h1 class="error-message">There was an unexpected error... so have a game of 2048.</h1>
  <hr class="page-separator">
  <div class="container">
    <div class="heading">
      <h1 class="title">2048</h1>
      <div class="score-container">0</div>
    </div>
    <p class="game-intro">Join the numbers and get to the <strong>2048 tile!</strong></p>

    <div class="game-container">
      <div class="game-message">
        <p></p>
        <div class="lower">
          <a class="retry-button">Try again</a>
        </div>
      </div>

      <div class="grid-container">
        <div class="grid-row">
          <div class="grid-cell"></div>
          <div class="grid-cell"></div>
          <div class="grid-cell"></div>
          <div class="grid-cell"></div>
        </div>
        <div class="grid-row">
          <div class="grid-cell"></div>
          <div class="grid-cell"></div>
          <div class="grid-cell"></div>
          <div class="grid-cell"></div>
        </div>
        <div class="grid-row">
          <div class="grid-cell"></div>
          <div class="grid-cell"></div>
          <div class="grid-cell"></div>
          <div class="grid-cell"></div>
        </div>
        <div class="grid-row">
          <div class="grid-cell"></div>
          <div class="grid-cell"></div>
          <div class="grid-cell"></div>
          <div class="grid-cell"></div>
        </div>
      </div>

      <div class="tile-container">

      </div>
    </div>

    <p class="game-explanation">
      <strong class="important">How to play:</strong> Use your <strong>arrow keys</strong> to move the tiles. When two tiles with the same number touch, they <strong>merge into one!</strong>
    </p>
  </div>
{% endblock %}