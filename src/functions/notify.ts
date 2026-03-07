// @ts-nocheck
function notify(message) {
  if (window.M && M.toast) {
    M.toast({ html: message });
    return;
  }
  alert(message);
}

