// @ts-nocheck
function openAppModal(modalEl) {
  if (!modalEl) return;
  try {
    if (window.M && M.Modal) {
      const instance = M.Modal.getInstance(modalEl) || M.Modal.init(modalEl);
      if (instance && instance.open) {
        instance.open();
        return;
      }
    }
  } catch {}

  // Fallback if Materialize modal instance is unavailable.
  modalEl.style.display = 'block';
  modalEl.classList.add('open');
  modalEl.setAttribute('aria-hidden', 'false');
}
