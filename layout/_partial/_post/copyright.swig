{% if theme.copyright.enable %}
  <hr class="copy-line">
  <div class="post-copyright">
    <div class="copy-author">
      <span>{{ __('copyright.author') }} :</span>

      {% if config.email %}
      <a href='mailto:{{ config.email }}'>
      {% endif %}

      <span>{{ config.author }}</span>

      {% if config.email %}
      </a>
      {% endif %}
    </div>
    <div class="copy-url">
      <span>{{ __('copyright.url') }} :</span>
      <a href="{{ page.permalink }}">{{ page.permalink }}</a>
    </div>
    <div class="copy-origin">
      <span>{{ __('copyright.origin') }} :</span>
      <a href="{{ config.url }}">{{ config.url }}</a>
    </div>
    <div class="copy-license">
      {% set license = theme.copyright.license || "著作权归作者所有，转载请联系作者获得授权。" %}
      {{ license }}
    </div>
  </div>
{% endif %}