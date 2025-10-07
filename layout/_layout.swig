<!DOCTYPE html>
<html lang="{{ config.language }}" prefix="og: http://ogp.me/ns#">
<head>
  {% include "_partial/head.swig" %}
  <title>{% block title %}{% endblock %}</title>
</head>
<body>
  <div class="container">
    {% include "_partial/header.swig" %}
    <div class="container-inner{% if is_post() %} has_toc{% endif %}" style="display:none;">
      <main class="main" id="main">
        <div class="main-wrapper">
          {% block main %} {% endblock %}
        </div>
      </main>
      {% include "./_partial/footer.swig" %}
    </div>
    {% include "./_partial/tagcloud.swig" %}
  </div>
  {% include "_partial/_feature/common.swig" %}
</body>
</html>
