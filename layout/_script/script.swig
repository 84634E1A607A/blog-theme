{{ js('https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js') }}

{% if theme.lightbox %}
  <script></script>
  <script src="{{ url_for('/') }}script/lib/lightbox/js/lightbox.min.js" async></script>
{% endif %}

{% if theme.mathjax %}
  <script src="https://cdn.jsdelivr.net/npm/mathjax@2.7.7/unpacked/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>
  <script type="text/x-mathjax-config;executed=true">MathJax.Hub.Config({tex2jax: {inlineMath: [["$","$"], ["\\(","\\)"]]}});</script>
{% endif %}

{% if theme.mathjax3 %}
  <script src="https://cdnjs.cloudflare.com/polyfill/v3/polyfill.min.js?features=es6"></script>
  <script>
    MathJax = {
      tex: {
        tags: 'ams'
      }
    };
  </script>
  <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js"></script>
{% endif %}

{% if theme.lazyload %}
  <script src="https://cdn.jsdelivr.net/npm/lazysizes@5.1.1/lazysizes.min.js" async></script>
{% endif %}

{% if theme.pjax %}
  {{ js('script/lib/pjax/pjax') }}
{% endif %}

{% if theme.scheme == 'banderole' %}
  {{ js('script/scheme/banderole') }}
{% else %}
  {{ js('script/scheme/balance') }}
{% endif %}

{{ js('script/bootstarp') }}

{% if is_post() %}
<script>
if (nlviconfig.theme.toc) {
  $(".container-inner").addClass("has_toc");
}
</script>
{% endif %}

<script type="module">
  import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';
  mermaid.initialize({ startOnLoad: false });
  window.mermaid = mermaid;

  async function renderMermaids() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const activeClass = prefersDark ? 'mermaid-dark' : 'mermaid-light';
    mermaid.run({
      querySelector: '.mermaid.' + activeClass,
    })
  }

  renderMermaids();

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    renderMermaids();
  });
</script>
