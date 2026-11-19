// Mejoras de la carta (la carta funciona igual sin este archivo):
// 1. Animaciones de entrada al hacer scroll (fotos, títulos y platos).
// 2. Resalta en la barra superior la sección que estás viendo.
(function () {
  "use strict";
  var root = document.documentElement;

  // Sin IntersectionObserver (navegadores muy viejos): mostramos todo sin animar.
  if (!("IntersectionObserver" in window)) {
    root.classList.remove("js");
    return;
  }

  /* ---------- 1. Animaciones al aparecer en pantalla ---------- */

  // Escalonado: cada plato de una lista aparece 60 ms después del anterior.
  Array.prototype.forEach.call(document.querySelectorAll(".items"), function (list) {
    Array.prototype.forEach.call(list.children, function (item, i) {
      item.style.setProperty("--d", Math.min(i * 0.06, 0.6) + "s");
    });
  });
  Array.prototype.forEach.call(document.querySelectorAll(".gallery > li"), function (el, i) {
    el.style.setProperty("--d", i * 0.1 + "s");
  });

  var revealer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealer.unobserve(entry.target); // se anima una sola vez
      }
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

  Array.prototype.forEach.call(document.querySelectorAll(".reveal, .items, .gallery"), function (el) {
    revealer.observe(el);
  });

  /* ---------- 2. Botón activo en la barra de categorías ---------- */

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

  var spy = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) activate(entry.target.id);
    });
  }, { rootMargin: "-45% 0px -50% 0px" });

  Object.keys(byId).forEach(function (id) {
    var el = document.getElementById(id);
    if (el) spy.observe(el);
  });
})();
