{% if theme.comments.enable or page.comments %}
  <i id="com-switch" class="iconfont icon-down jumping-in long infinite" style="font-size:24px;display:block;text-align:center;transform:rotate(180deg);transition:transform 0.5s ease;-webkit-transition:-webkit-transform 0.5s ease;will-change:transform;"></i>
  <div class="post-comments syuanpi" id="post-comments" style="display: block;margin: auto 16px;">
    {% include "../../_script/_comment/gitalk.swig" %}
    {% include "../../_script/_comment/changyan.swig" %}
    {% include "../../_script/_comment/disqus.swig" %}
    {% include "../../_script/_comment/livere.swig" %}
    {% include "../../_script/_comment/utterances.swig" %}
  </div>
{% endif %}
