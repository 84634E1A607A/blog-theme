<div class="copyright">
    <div class="info">
        <span>&copy;</span>
        <span>{{ theme.since }} ~ {{ date(Date.now(), 'YYYY') }}</span>
        <span>❤</span>
        {% if config.email %}
        <a href='mailto:{{ config.email }}'>
        {% endif %}

        <span>{{ config.author }}</span>

        {% if config.email %}
        </a>
        {% endif %}
    </div>
    <div class="theme">
        <span>
            {{ __('come') }}
            <a href="http://hexo.io/" target="_blank" rel="noopener">Hexo </a>
        </span>
        <span>
            {{ __('theme') }}
            <a href="https://github.com/ColMugX/hexo-theme-Nlvi"> Nlvi </a>
        </span>
        <span>
            , <a href="https://github.com/84634E1A607A/blog-theme"> 由 Ajax 本喵魔改 </a>
        </span>
    </div>
    {% if theme.visit_count %}
    <div class="visit_count">
        <i class="iconfont icon-eye"></i>
        <span id="busuanzi_value_site_uv"></span>
        <i class="iconfont icon-team"></i>
        <span id="busuanzi_value_site_pv"></span>
    </div>
    {% endif %}
</div>
