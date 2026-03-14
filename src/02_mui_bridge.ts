// @ts-nocheck
(function initMuiBridge() {
  const listeners = [];

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function emitChange() {
    listeners.slice().forEach((listener) => {
      try {
        listener();
      } catch (err) {
        console.warn('[mui-bridge] listener failed', err);
      }
    });
  }

  function getTipos() {
    return state.tipos.map((tipo) => ({
      ...clone(tipo),
      secoes: getSecoesForTipo(tipo.id).map((secao) => clone(secao)),
    }));
  }

  function getSecoes() {
    return state.secoes.map((secao) => clone(secao));
  }

  function saveTipo(payload) {
    const nome = String(payload?.nome || '').trim();
    if (!nome) {
      notify('Informe um nome para o tipo.');
      return { ok: false };
    }

    const cabecalho = String(payload?.cabecalho || '').trim();
    const rodape = String(payload?.rodape || '').trim();
    const requestedSecaoIds = Array.isArray(payload?.secaoIds) ? payload.secaoIds.map((id) => String(id)) : [];
    const validSecaoIds = requestedSecaoIds.filter((id, index) => (
      state.secoes.some((secao) => secao.id === id) && requestedSecaoIds.indexOf(id) === index
    ));

    let tipoId = String(payload?.id || '').trim();
    if (tipoId) {
      const tipo = state.tipos.find((item) => item.id === tipoId);
      if (!tipo) {
        notify('Tipo nao encontrado.');
        return { ok: false };
      }
      tipo.nome = nome;
      tipo.cabecalho = cabecalho;
      tipo.rodape = rodape;
    } else {
      tipoId = makeId('tipo', 'tipoCounter');
      state.tipos.push({ id: tipoId, nome, cabecalho, rodape });
    }

    const currentSecaoIds = getSecoesForTipo(tipoId).map((secao) => secao.id);
    const nextSecaoIds = Array.isArray(payload?.secaoIds)
      ? validSecaoIds
      : (currentSecaoIds.length > 0 ? currentSecaoIds : state.secoes.map((secao) => secao.id));

    const removedSecaoIds = currentSecaoIds.filter((id) => !nextSecaoIds.includes(id));
    if (removedSecaoIds.length > 0) {
      state.atributos
        .filter((atributo) => atributo.tipoId === tipoId && removedSecaoIds.includes(atributo.secaoId))
        .forEach((atributo) => {
          atributo.secaoId = '';
        });
    }

    state.tipoSecoes[tipoId] = nextSecaoIds;
    syncLayoutSectionsForTipo(tipoId);
    saveState();
    renderAll();
    return { ok: true, tipoId };
  }

  function subscribe(listener) {
    if (typeof listener !== 'function') return () => {};
    listeners.push(listener);
    return () => {
      const index = listeners.indexOf(listener);
      if (index >= 0) listeners.splice(index, 1);
    };
  }

  (window as any).documentosApp = {
    ...((window as any).documentosApp || {}),
    __emitChange: emitChange,
    subscribe,
    getTipos,
    getSecoes,
    saveTipo,
    deleteTipo: (tipoId) => deleteTipo(tipoId),
    focusSecao: (secaoId) => focusSecaoCard(secaoId),
    notify: (message) => notify(message),
  };
})();
