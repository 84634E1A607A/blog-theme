<meta charset="UTF-8"/>
<meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1" />
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
<meta name="browsermode" content="application">
<meta name="apple-touch-fullscreen" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="{{config.title}}">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="msapplication-navbutton-color" content="#666666">
<meta name= "format-detection" content="telephone=no" />
{% if theme.favicon %}
  <link rel="apple-touch-icon"  sizes="72x72"  href="{{theme.favicon}}">
  <link rel="apple-touch-icon-precomposed"  sizes="72x72"  href="{{theme.favicon}}">
{% endif %}
{% if config.subtitle %}
  <meta name="subtitle" content="{{ config.subtitle }}">
{% endif %}
{% if page.description %}
  <meta name="description" content="{{ page.description }}">
{% elif config.description %}
  <meta name="description" content="{{ config.description }}">
{% endif %}
{% if config.keywords %}
  <meta name="keywords" content="{{ config.keywords }}" />
{% endif %}
{% if page.tags and page.tags.length %}
  <meta name="keywords" content="{% for tag in page.tags %}{{ tag.name }}, {% endfor %}nlvi" />
{% endif %}
{% if config.canonical %}
  {% if page.permalink %}
    <link rel="canonical" href="{{ page.permalink }}" />
  {% else %}
    <link rel="canonical" href="{{ config.url + "/" + page.path }}" />
  {% endif %}
{% endif %}
