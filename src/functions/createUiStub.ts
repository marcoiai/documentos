// @ts-nocheck
function createUiStub() {
  const stub = {
    value: '',
    checked: false,
    innerHTML: '',
    textContent: '',
    style: {},
    dataset: {},
    className: '',
    classList: {
      add() {},
      remove() {},
      contains() { return false; },
    },
    addEventListener() {},
    removeEventListener() {},
    appendChild() {},
    remove() {},
    setAttribute() {},
    getAttribute() { return ''; },
    querySelector() { return createUiStub(); },
    querySelectorAll() { return []; },
    closest() { return null; },
    focus() {},
    scrollIntoView() {},
  };
  return stub;
}
