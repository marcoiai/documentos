// @ts-nocheck
function closeAppModal(modalEl) {
  if (!modalEl) return;
  try {
    if (window.M && M.Modal) {
      const instance = M.Modal.getInstance(modalEl);
      if (instance && instance.close) {
        instance.close();
        return;
      }
    }
  } catch {}

  modalEl.classList.remove('open');
  modalEl.style.display = 'none';
  modalEl.setAttribute('aria-hidden', 'true');
}
