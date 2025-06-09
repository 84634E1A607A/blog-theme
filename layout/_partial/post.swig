{% macro render(post) %}
  {% if !config.mathjax && !config.mathjax3 && page.mathjax %}
    <script src="https://cdn.jsdelivr.net/npm/mathjax@2.7.7/unpacked/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>
    <script type="text/x-mathjax-config;executed=true">MathJax.Hub.Config({tex2jax: {inlineMath: [["$","$"], ["\\(","\\)"]]}});</script>
  {% endif %}
  <article class="
  post
  {% if is_post() %} is_post {% endif %}
  ">
    <header class="post-header">
      <div class="post-time syuanpi fadeInRightShort back-1">
        <div class="post-time-wrapper">
          {% if not is_post() and post.top %}
            <i class="iconfont icon-pin post-pin"></i>
          {% endif %}
          <time class="post-time-inner">{{ full_date(post.date, 'YYYY-MM-DD') }}</time>
          {% if post.categories and post.categories.length %}
            {% for category in post.categories %}
              <span class="post-category"><a href="{{ url_for(category.path) }}">{{ category.name }}</a></span>
            {% endfor %}
          {% endif %}

          {% if post.updated and (full_date(post.date, 'YYYY-MM-DD') != full_date(post.updated, 'YYYY-MM-DD')) %}
          <span class="post-updated">更新于 <time>{{ full_date(post.updated, 'YYYY-MM-DD') }}</time>
          <span id="post-updated-views-separator"> | </span>
          </span>
          {% endif %}

          <span class="post-views" id="post-views">观测到 <span id="post-view-count">0</span> 次访问</span>
          <script>
            var postPath = "{{ post.path }}";
            var postViewCount = document.getElementById('post-view-count');
            var postViews = document.getElementById('post-views');
            var postUpdatedViewsSeparator = document.getElementById('post-updated-views-separator');
            fetch('/api/views/' + postPath)
              .then(response => response.json())
              .then(data => {
                if (data && data.views) {
                  postViewCount.textContent = data.views;
                } else {
                  postViews.style.display = 'none';
                  postUpdatedViewsSeparator.style.display = 'none';
                }
              })
              .catch(error => {
                console.error('Error fetching post views:', error);
                postViews.style.display = 'none';
                postUpdatedViewsSeparator.style.display = 'none';
              });
          </script>
        </div>
      </div>
      <h1 class="post-title syuanpi fadeInRightShort back-2">
        {% if is_post() %}
          {{ post.title }}
        {% else %}
          <a href="{{ url_for(post.path) }}">{{ post.title }}</a>
        {% endif %}
      </h1>
    </header>
    <div class="post-content syuanpi fadeInRightShort back-3">
      {% if is_post() %}
        {{ post.content }}
      {% else %}
        {% if post.excerpt %}
          {{ post.excerpt }}
        {% else %}
          {{ post.content }}
        {% endif %}
      {% endif %}
    {% if post.excerpt and is_home() %}
      <p class="content-link">
        <a href="{{ url_for(post.path) }}#more">
          <span>{{ __('page.readmore') }}</span>
        </a>
      </p>
    {% endif %}
    </div>
    {% if post.tags and post.tags.length %}
      <div class="post-tags syuanpi fadeInRightShort back-3">
      {% for tag in post.tags %}
        <a href="{{ url_for(tag.path) }}">{{ tag.name }}</a>
      {% endfor %}
      </div>
    {% endif %}
    {% if is_post() %}
      {% include "_post/reward.swig" %}
      {% include "_post/copyright.swig" %}
    {% endif %}
  </article>
  {% if is_post() %}
    <img src="/api/read/{{post.path}}" onerror="this.style.display='none'">
    {% include "pagenum.swig" %}
    {% include "_post/comments.swig" %}

  {% endif %}
  {% if theme.scheme == 'banderole' %}
    {% include "./_feature/banderole.swig" %}
  {% endif %}
{% endmacro %}
