// Resalta en la barra de categorías la sección que se está viendo.
// La carta funciona igual sin este archivo: esto es solo una mejora.
(function () {
  "use strict";
  if (!("IntersectionObserver" in window)) return;

  var links = Array.prototype.slice.call(document.querySelectorAll(".catnav a"));
  var byId = {};
  links.forEach(function (a) { byId[a.getAttribute("href").slice(1)] = a; });

  function activate(id) {
    links.forEach(function (a) { a.removeAttribute("aria-current"); });
    var link = byId[id];
    if (!link) return;
    link.setAttribute("aria-current", "true");
    // Mantiene visible el botón activo en móviles (la barra se desliza de lado)
    var bar = link.parentNode.parentNode;
    var left = link.offsetLeft - (bar.clientWidth - link.offsetWidth) / 2;
    bar.scrollTo({ left: left, behavior: "smooth" });
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) activate(entry.target.id);
    });
  }, { rootMargin: "-45% 0px -50% 0px" });

  Object.keys(byId).forEach(function (id) {
    var el = document.getElementById(id);
    if (el) observer.observe(el);
  });
})();
