(function () {
  'use strict';

  var triggers = document.querySelectorAll('[data-certificate-open]');
  if (!triggers.length) return;

  triggers.forEach(function (trigger) {
    var dialog = document.getElementById(trigger.getAttribute('aria-controls'));
    if (!dialog || typeof dialog.showModal !== 'function') {
      // The adjacent original-image link remains available without dialog support.
      trigger.disabled = true;
      return;
    }

    trigger.addEventListener('click', function () {
      dialog.certificateOpener = trigger;
      if (!dialog.open) dialog.showModal();
    });

    if (dialog.dataset.certificateReady) return;
    dialog.dataset.certificateReady = 'true';

    dialog.querySelectorAll('[data-certificate-close]').forEach(function (button) {
      button.addEventListener('click', function () {
        dialog.close();
      });
    });

    dialog.addEventListener('click', function (event) {
      if (event.target !== dialog) return;
      var bounds = dialog.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right ||
          event.clientY < bounds.top || event.clientY > bounds.bottom) {
        dialog.close();
      }
    });

    dialog.addEventListener('close', function () {
      if (dialog.certificateOpener) dialog.certificateOpener.focus();
    });
  });
})();
