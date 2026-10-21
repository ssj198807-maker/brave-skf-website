(function () {
  'use strict';

  var button = document.querySelector('.menu-toggle');
  var nav = document.getElementById('nav');
  if (!button || !nav) return;

  var compact = window.matchMedia('(max-width: 1100px)');

  function setOpen(open) {
    nav.classList.toggle('is-open', open);
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? '关闭导航菜单' : '打开导航菜单');
  }

  // Keep navigation visible when JavaScript is unavailable; enhance it only here.
  document.documentElement.classList.add('nav-enhanced');
  setOpen(false);

  button.addEventListener('click', function () {
    setOpen(button.getAttribute('aria-expanded') !== 'true');
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && nav.classList.contains('is-open')) {
      setOpen(false);
      button.focus();
    }
  });

  document.addEventListener('click', function (event) {
    if (!nav.contains(event.target) && !button.contains(event.target)) setOpen(false);
  });

  nav.addEventListener('click', function (event) {
    if (event.target.closest('a')) setOpen(false);
  });

  function onBreakpointChange() {
    if (nav.contains(document.activeElement) && compact.matches) button.focus();
    if (!compact.matches && document.activeElement === button) nav.querySelector('a').focus();
    setOpen(false);
  }
  if (compact.addEventListener) compact.addEventListener('change', onBreakpointChange);
  else compact.addListener(onBreakpointChange);
})();
