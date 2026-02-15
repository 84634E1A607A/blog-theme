document.addEventListener('DOMContentLoaded', function() {
  document.body.addEventListener('touchstart', function () {});
  var app = new Nlvi(nlviconfig);
  app.bootstarp();

  document.querySelectorAll('.container-inner, .logo-inner').forEach(function(el) {
    el.style.display = 'block';
  });
});
