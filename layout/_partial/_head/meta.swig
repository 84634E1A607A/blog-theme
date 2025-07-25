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

{# Open Graph Protocol #}
<meta property="og:site_name" content="{{ config.title }}" />
<meta property="og:logo" content="https://aajax.top/favicon.ico" />
{% if page.ogp_image %}
  {# If ogp_image.url is a relative link, solve it here #}
  {% if page.ogp_image.url.startsWith('https://') or page.ogp_image.url.startsWith('http://') %}
    <meta property="og:image" content="{{ page.ogp_image.url }}" />
  {% elif page.ogp_image.url.startsWith('/') %}
    <meta property="og:image" content="{{ config.url + page.ogp_image.url }}" />
  {% else %}
    <meta property="og:image" content="{{ page.permalink + page.ogp_image.url }}" />
  {% endif %}
  <meta property="og:image:width" content="{{ page.ogp_image.width }}" />
  <meta property="og:image:height" content="{{ page.ogp_image.height }}" />
  <meta property="og:image:alt" content="{{ page.ogp_image.alt }}" />
{% elif config.ogp_image %}
  <meta property="og:image" content="{{ config.ogp_image.url }}" />
  <meta property="og:image:width" content="{{ config.ogp_image.width }}" />
  <meta property="og:image:height" content="{{ config.ogp_image.height }}" />
  <meta property="og:image:alt" content="{{ config.ogp_image.alt }}" />
{% endif %}
{% if page.title %}
  <meta property="og:title" content="{{ page.title }}" />
{% endif %}
{% if page.permalink %}
  <meta property="og:url" content="{{ page.permalink }}" />
{% else %}
  <meta property="og:url" content="{{ config.url + "/" + page.path }}" />
{% endif %}
{% if page.description %}
  <meta property="og:description" content="{{ page.description }}" />
{% elif config.description %}
  <meta property="og:description" content="{{ config.description }}" />
{% endif %}
{% if is_post() %}
  <meta property="og:type" content="article" />
  <meta property="article:published_time" content="{{ page.date.toISOString() }}" />
  <meta property="article:modified_time" content="{{ page.updated.toISOString() }}" />
  {% if page.author %}
    <meta property="article:author" content="{{ page.author }}" />
  {% elif config.author %}
    <meta property="article:author" content="{{ config.author }}" />
  {% endif %}
  {% if page.tags and page.tags.length %}
    {% for tag in page.tags %}
      <meta property="article:tag" content="{{ tag.name }}" />
    {% endfor %}
  {% endif %}
  {% if page.categories and page.categories.length %}
    {% for category in page.categories %}
      <meta property="article:section" content="{{ category.name }}" />
    {% endfor %}
  {% endif %}
{% else %}
  <meta property="og:type" content="website" />
{% endif %}
