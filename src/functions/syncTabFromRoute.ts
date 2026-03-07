// @ts-nocheck
function syncTabFromRoute() {
  const hash = String(window.location.hash || '').replace(/^#/, '');
  if (!hash) return;
  const panel = document.getElementById(hash);
  if (!panel) return;
  openTab(hash);
}

