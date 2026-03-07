// @ts-nocheck
function openTab(tabId) {
  if (!window.M) return;
  const tabsEl = document.querySelector('.tabs');
  if (!tabsEl) return;
  const instance = M.Tabs.getInstance(tabsEl);
  if (instance) instance.select(tabId);
}

