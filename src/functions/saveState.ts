// @ts-nocheck
let saveStateSnapshotTimer: number | null = null;
let saveStateSnapshotInFlight = false;
let saveStateSnapshotQueued = false;

async function flushStateSnapshotToApi() {
  if (saveStateSnapshotInFlight) {
    saveStateSnapshotQueued = true;
    return;
  }

  saveStateSnapshotInFlight = true;
  saveStateSnapshotQueued = false;

  try {
    await pushStateSnapshotToApi();
  } catch (error) {
    console.warn('[app-state] erro ao salvar snapshot na API', error);
  } finally {
    saveStateSnapshotInFlight = false;
    if (saveStateSnapshotQueued) scheduleStateSnapshotToApi();
  }
}

function scheduleStateSnapshotToApi() {
  if (!APP_STATE_API_URL) return;
  if (saveStateSnapshotTimer !== null) window.clearTimeout(saveStateSnapshotTimer);
  saveStateSnapshotTimer = window.setTimeout(() => {
    saveStateSnapshotTimer = null;
    void flushStateSnapshotToApi();
  }, 400);
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  scheduleStateSnapshotToApi();
}
