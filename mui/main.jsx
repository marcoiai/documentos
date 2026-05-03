import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Chip,
  Container,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from '@mui/material';

const app = window.documentosApp;

const PAGES = [
  { key: 'tipos', label: 'Tipos' },
  { key: 'secoes', label: 'Secoes' },
  { key: 'atributos', label: 'Atributos' },
  { key: 'documentos', label: 'Documentos' },
  { key: 'layout', label: 'Layout' },
  { key: 'relatorios', label: 'Relatorios' },
  { key: 'relatorio-layout', label: 'Layout Relatorio' },
];

function preview(text, max = 120) {
  const normalized = String(text || '').trim();
  if (!normalized) return '-';
  return normalized.length <= max ? normalized : `${normalized.slice(0, max - 3)}...`;
}

function applyDocumentMask(value, mask) {
  if (typeof window.applyMask === 'function') {
    return window.applyMask(String(value ?? ''), mask);
  }
  return String(value ?? '');
}

function useRoute() {
  const getRoute = () => {
    const raw = String(window.location.hash || '').replace(/^#/, '').trim();
    return PAGES.some((page) => page.key === raw) ? raw : 'tipos';
  };
  const [route, setRoute] = useState(getRoute);

  useEffect(() => {
    const onHashChange = () => setRoute(getRoute());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return route;
}

function useAppSnapshot() {
  const getSnapshot = () => (
    app?.getSnapshot?.() || {
      tipos: [],
      secoes: [],
      atributos: [],
      documentos: [],
    }
  );

  const [snapshot, setSnapshot] = useState(getSnapshot);

  useEffect(() => {
    if (!app?.subscribe) return undefined;
    return app.subscribe(() => setSnapshot(getSnapshot()));
  }, []);

  return snapshot;
}

function TipoDialog({ open, secoes, initialValue, onClose, onSave, onJumpToSecao }) {
  const [form, setForm] = useState({ id: '', nome: '', cabecalho: '', rodape: '', secaoIds: [] });

  useEffect(() => {
    if (!open) return;
    setForm({
      id: initialValue?.id || '',
      nome: initialValue?.nome || '',
      cabecalho: initialValue?.cabecalho || '',
      rodape: initialValue?.rodape || '',
      secaoIds: initialValue?.secoes?.map((secao) => secao.id) || secoes.map((secao) => secao.id),
    });
  }, [open, initialValue, secoes]);

  const toggleSecao = (secaoId) => {
    setForm((current) => ({
      ...current,
      secaoIds: current.secaoIds.includes(secaoId)
        ? current.secaoIds.filter((id) => id !== secaoId)
        : [...current.secaoIds, secaoId],
    }));
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>{form.id ? 'Editar tipo' : 'Novo tipo'}</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={3} sx={{ pt: 1 }}>
          <TextField
            autoFocus
            required
            label="Nome do tipo"
            value={form.nome}
            onChange={(event) => setForm((current) => ({ ...current, nome: event.target.value }))}
          />
          <TextField
            label="Cabecalho"
            multiline
            minRows={3}
            value={form.cabecalho}
            onChange={(event) => setForm((current) => ({ ...current, cabecalho: event.target.value }))}
          />
          <TextField
            label="Rodape"
            multiline
            minRows={3}
            value={form.rodape}
            onChange={(event) => setForm((current) => ({ ...current, rodape: event.target.value }))}
          />
          <Box>
            <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1.5 }}>
              Secoes vinculadas
            </Typography>
            <Stack spacing={1}>
              {secoes.map((secao) => (
                <Stack key={secao.id} direction="row" justifyContent="space-between" alignItems="center">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={form.secaoIds.includes(secao.id)}
                        onChange={() => toggleSecao(secao.id)}
                      />
                    }
                    label={secao.nome}
                  />
                  <Button size="small" onClick={() => onJumpToSecao(secao.id)}>
                    Abrir secao
                  </Button>
                </Stack>
              ))}
            </Stack>
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={() => onSave(form)}>
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function SecaoDialog({ open, initialValue, onClose, onSave }) {
  const [form, setForm] = useState({ id: '', nome: '', cabecalho: '', rodape: '' });

  useEffect(() => {
    if (!open) return;
    setForm({
      id: initialValue?.id || '',
      nome: initialValue?.nome || '',
      cabecalho: initialValue?.cabecalho || '',
      rodape: initialValue?.rodape || '',
    });
  }, [open, initialValue]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{form.id ? 'Editar secao' : 'Nova secao'}</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={3} sx={{ pt: 1 }}>
          <TextField
            autoFocus
            required
            label="Nome da secao"
            value={form.nome}
            onChange={(event) => setForm((current) => ({ ...current, nome: event.target.value }))}
          />
          <TextField
            label="Cabecalho"
            multiline
            minRows={3}
            value={form.cabecalho}
            onChange={(event) => setForm((current) => ({ ...current, cabecalho: event.target.value }))}
          />
          <TextField
            label="Rodape"
            multiline
            minRows={3}
            value={form.rodape}
            onChange={(event) => setForm((current) => ({ ...current, rodape: event.target.value }))}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={() => onSave(form)}>
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function AtributoDialog({ open, tipos, secoes, initialValue, onClose, onSave }) {
  const [form, setForm] = useState({
    id: '',
    tipoId: '',
    nome: '',
    tipoCampo: 'texto',
    secaoId: '',
    validador: '',
    peso: '',
    mascara: '',
    templateTexto: '',
  });

  useEffect(() => {
    if (!open) return;
    setForm({
      id: initialValue?.id || '',
      tipoId: initialValue?.tipoId || tipos[0]?.id || '',
      nome: initialValue?.nome || '',
      tipoCampo: initialValue?.tipoCampo || 'texto',
      secaoId: initialValue?.secaoId || '',
      validador: initialValue?.validador || '',
      peso: initialValue?.peso ?? '',
      mascara: initialValue?.mascara || '',
      templateTexto: initialValue?.templateTexto || '',
    });
  }, [open, initialValue, tipos]);

  const secoesDoTipo = form.tipoId
    ? (app?.getSecoesForTipo?.(form.tipoId) || [])
    : secoes;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>{form.id ? 'Editar atributo' : 'Novo atributo'}</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={3} sx={{ pt: 1 }}>
          <FormControl fullWidth>
            <InputLabel>Tipo</InputLabel>
            <Select
              label="Tipo"
              value={form.tipoId}
              onChange={(event) => setForm((current) => ({ ...current, tipoId: event.target.value, secaoId: '' }))}
            >
              {tipos.map((tipo) => (
                <MenuItem key={tipo.id} value={tipo.id}>
                  {tipo.nome}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Nome"
            value={form.nome}
            onChange={(event) => setForm((current) => ({ ...current, nome: event.target.value }))}
          />
          <FormControl fullWidth>
            <InputLabel>Tipo do campo</InputLabel>
            <Select
              label="Tipo do campo"
              value={form.tipoCampo}
              onChange={(event) => setForm((current) => ({ ...current, tipoCampo: event.target.value }))}
            >
              {['texto', 'numero', 'data', 'boolean', 'textarea', 'texto_placeholder', 'assinatura'].map((tipoCampo) => (
                <MenuItem key={tipoCampo} value={tipoCampo}>
                  {tipoCampo}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Secao</InputLabel>
            <Select
              label="Secao"
              value={form.secaoId}
              onChange={(event) => setForm((current) => ({ ...current, secaoId: event.target.value }))}
            >
              <MenuItem value="">Sem secao</MenuItem>
              {[...secoes].map((secao) => {
                const inTipo = secoesDoTipo.some((item) => item.id === secao.id);
                return (
                  <MenuItem key={secao.id} value={secao.id}>
                    {inTipo ? secao.nome : `${secao.nome} (fora do tipo)`}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <TextField
            label="Validador"
            value={form.validador}
            onChange={(event) => setForm((current) => ({ ...current, validador: event.target.value }))}
          />
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="Peso"
              value={form.peso}
              onChange={(event) => setForm((current) => ({ ...current, peso: event.target.value }))}
            />
            <TextField
              fullWidth
              label="Mascara"
              value={form.mascara}
              onChange={(event) => setForm((current) => ({ ...current, mascara: event.target.value }))}
            />
          </Stack>
          {form.tipoCampo === 'texto_placeholder' && (
            <TextField
              label="Template"
              multiline
              minRows={3}
              value={form.templateTexto}
              onChange={(event) => setForm((current) => ({ ...current, templateTexto: event.target.value }))}
            />
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={() => onSave(form)}>
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function LayoutPage() {
  const tipos = app?.getTipos?.() || [];
  const [tipoId, setTipoId] = useState('');

  useEffect(() => {
    if (!tipoId && tipos[0]) {
      setTipoId(tipos[0].id);
    }
  }, [tipoId, tipos]);

  const sections = tipoId ? (app?.getLayoutEditorData?.(tipoId) || []) : [];
  const sectionKeys = sections.map((section) => section.key);
  const destinationSections = [
    { key: '__sem_secao__', nome: 'Sem secao' },
    ...(app?.getSecoesForTipo?.(tipoId) || []).map((secao) => ({ key: secao.id, nome: secao.nome })),
  ];

  const moveSection = (key, direction) => {
    const index = sectionKeys.indexOf(key);
    const nextIndex = index + direction;
    if (index < 0 || nextIndex < 0 || nextIndex >= sectionKeys.length) return;
    app?.moveLayoutSectionBefore?.(tipoId, key, sectionKeys[nextIndex]);
  };

  const moveItem = (items, attrId, direction) => {
    const index = items.findIndex((item) => item.attr.id === attrId);
    const target = items[index + direction];
    if (index < 0 || !target) return;
    app?.swapLayoutItems?.(tipoId, attrId, target.attr.id);
  };

  const resetLayout = () => {
    if (!tipoId) return;
    app?.resetLayoutForTipo?.(tipoId);
    app?.notify?.('Layout resetado para o padrao do tipo.');
  };

  return (
    <Stack spacing={2}>
      <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" spacing={2}>
        <Box>
          <Typography variant="h4">Layout</Typography>
          <Typography color="text.secondary">Organize secoes, ordem e largura dos campos sem depender da tela legada.</Typography>
        </Box>
        <Stack direction="row" spacing={1}>
          <Button variant="outlined" onClick={resetLayout} disabled={!tipoId}>Resetar</Button>
        </Stack>
      </Stack>

      <Card>
        <CardContent>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems={{ md: 'center' }}>
            <FormControl fullWidth>
              <InputLabel>Tipo</InputLabel>
              <Select label="Tipo" value={tipoId} onChange={(event) => setTipoId(event.target.value)}>
                {tipos.map((tipo) => (
                  <MenuItem key={tipo.id} value={tipo.id}>{tipo.nome}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Typography variant="body2" color="text.secondary">
              Alteracoes de layout sao salvas automaticamente.
            </Typography>
          </Stack>
        </CardContent>
      </Card>

      {!tipoId ? (
        <EmptyState title="Nenhum tipo disponivel" description="Crie um tipo para editar o layout." />
      ) : sections.length === 0 ? (
        <EmptyState title="Nenhuma secao encontrada" description="Vincule secoes ou atributos ao tipo para montar o layout." />
      ) : (
        <Stack spacing={2}>
          {sections.map((section, sectionIndex) => (
            <Card key={section.key}>
              <CardContent>
                <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" spacing={2} sx={{ mb: 2 }}>
                  <Box sx={{ flex: 1 }}>
                    <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap>
                      <Typography variant="h6">{section.nome}</Typography>
                      {section.key === '__sem_secao__' ? <Chip label="Fixa no topo" size="small" color="primary" variant="outlined" /> : null}
                    </Stack>
                    {section.cabecalho ? (
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Cabecalho: {preview(section.cabecalho, 180)}
                      </Typography>
                    ) : null}
                    {section.rodape ? (
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        Rodape: {preview(section.rodape, 180)}
                      </Typography>
                    ) : null}
                  </Box>
                  <Stack direction="row" spacing={1}>
                    <Button variant="outlined" onClick={() => moveSection(section.key, -1)} disabled={sectionIndex <= 1 || section.key === '__sem_secao__'}>↑</Button>
                    <Button variant="outlined" onClick={() => moveSection(section.key, 1)} disabled={sectionIndex === sections.length - 1 || section.key === '__sem_secao__'}>↓</Button>
                  </Stack>
                </Stack>

                {section.items.length === 0 ? (
                  <Typography color="text.secondary">Sem atributos nesta secao.</Typography>
                ) : (
                  <Stack spacing={1.5}>
                    {section.items.map((item, itemIndex) => (
                      <Card key={item.attr.id} variant="outlined">
                        <CardContent sx={{ '&:last-child': { pb: 2 } }}>
                          <Stack direction={{ xs: 'column', lg: 'row' }} justifyContent="space-between" spacing={2}>
                            <Box sx={{ flex: 1 }}>
                              <Typography fontWeight={700}>{item.attr.nome}</Typography>
                              <Typography variant="body2" color="text.secondary">
                                {item.attr.tipoCampo}
                              </Typography>
                            </Box>
                            <Stack direction={{ xs: 'column', md: 'row' }} spacing={1}>
                              <FormControl sx={{ minWidth: 140 }}>
                                <InputLabel>Largura</InputLabel>
                                <Select
                                  label="Largura"
                                  value={String(item.colSpan)}
                                  onChange={(event) => app?.updateLayoutSpan?.(tipoId, item.attr.id, Number(event.target.value))}
                                >
                                  {[3, 4, 6, 8, 12].map((value) => (
                                    <MenuItem key={value} value={String(value)}>{value}/12</MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                              <FormControl sx={{ minWidth: 180 }}>
                                <InputLabel>Secao</InputLabel>
                                <Select
                                  label="Secao"
                                  value={section.key}
                                  onChange={(event) => app?.moveAttributeToSection?.(tipoId, item.attr.id, event.target.value)}
                                >
                                  {destinationSections.map((destination) => (
                                    <MenuItem key={destination.key} value={destination.key}>{destination.nome}</MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                              <Button variant="outlined" onClick={() => moveItem(section.items, item.attr.id, -1)} disabled={itemIndex === 0}>↑</Button>
                              <Button variant="outlined" onClick={() => moveItem(section.items, item.attr.id, 1)} disabled={itemIndex === section.items.length - 1}>↓</Button>
                            </Stack>
                          </Stack>
                        </CardContent>
                      </Card>
                    ))}
                  </Stack>
                )}
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}
    </Stack>
  );
}

function renderDocumentoField(attr, value, onChange) {
  if (attr.mascara) {
    return (
      <TextField
        fullWidth
        label={attr.nome}
        value={applyDocumentMask(value, attr.mascara)}
        onChange={(event) => onChange(applyDocumentMask(event.target.value, attr.mascara))}
      />
    );
  }

  const commonProps = {
    fullWidth: true,
    label: attr.nome,
    value: value ?? '',
    onChange: (event) => onChange(event.target.value),
  };

  if (attr.tipoCampo === 'boolean') {
    return (
      <FormControlLabel
        control={<Checkbox checked={Boolean(value)} onChange={(event) => onChange(event.target.checked)} />}
        label={attr.nome}
      />
    );
  }

  if (attr.tipoCampo === 'textarea' || attr.tipoCampo === 'texto_placeholder') {
    return <TextField {...commonProps} multiline minRows={3} />;
  }

  if (attr.tipoCampo === 'numero') {
    return <TextField {...commonProps} type="number" />;
  }

  if (attr.tipoCampo === 'data') {
    return <TextField {...commonProps} type="date" InputLabelProps={{ shrink: true }} />;
  }

  return <TextField {...commonProps} />;
}

function DocumentoDialog({ open, tipos, initialValue, onClose, onSave }) {
  const [form, setForm] = useState({ id: '', titulo: '', tipoId: '', valores: {}, pdfVisivel: {} });

  useEffect(() => {
    if (!open) return;
    setForm({
      id: initialValue?.id || '',
      titulo: initialValue?.titulo || '',
      tipoId: initialValue?.tipoId || tipos[0]?.id || '',
      valores: initialValue?.valores || {},
      pdfVisivel: initialValue?.pdfVisivel || {},
    });
  }, [open, initialValue, tipos]);

  const atributos = form.tipoId ? (app?.getAtributosByTipo?.(form.tipoId) || []) : [];
  const secoes = form.tipoId ? (app?.getSecoesForTipo?.(form.tipoId) || []) : [];
  const attrsBySecao = secoes.map((secao) => ({
    key: secao.id,
    nome: secao.nome,
    attrs: atributos.filter((attr) => attr.secaoId === secao.id),
  }));
  const semSecao = atributos.filter((attr) => !attr.secaoId);

  const updateValor = (attrId, nextValue) => {
    setForm((current) => ({
      ...current,
      valores: { ...current.valores, [attrId]: nextValue },
    }));
  };

  const updatePdfFlag = (attrId, checked) => {
    setForm((current) => ({
      ...current,
      pdfVisivel: { ...current.pdfVisivel, [attrId]: checked },
    }));
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>{form.id ? 'Editar documento' : 'Novo documento'}</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={3} sx={{ pt: 1 }}>
          <TextField
            autoFocus
            label="Titulo"
            value={form.titulo}
            onChange={(event) => setForm((current) => ({ ...current, titulo: event.target.value }))}
          />
          <FormControl fullWidth>
            <InputLabel>Tipo</InputLabel>
            <Select
              label="Tipo"
              value={form.tipoId}
              onChange={(event) => setForm((current) => ({ ...current, tipoId: event.target.value, valores: {}, pdfVisivel: {} }))}
            >
              {tipos.map((tipo) => (
                <MenuItem key={tipo.id} value={tipo.id}>
                  {tipo.nome}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {semSecao.length > 0 && (
            <Card variant="outlined">
              <CardContent>
                <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 2 }}>
                  Campos sem secao
                </Typography>
                <Stack spacing={2}>
                  {semSecao.map((attr) => (
                    <Box key={attr.id}>
                      {renderDocumentoField(attr, form.valores[attr.id], (nextValue) => updateValor(attr.id, nextValue))}
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={form.pdfVisivel[attr.id] !== false}
                            onChange={(event) => updatePdfFlag(attr.id, event.target.checked)}
                          />
                        }
                        label="Exibir no PDF"
                      />
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          )}

          {attrsBySecao.filter((group) => group.attrs.length > 0).map((group) => (
            <Card key={group.key} variant="outlined">
              <CardContent>
                <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 2 }}>
                  {group.nome}
                </Typography>
                <Stack spacing={2}>
                  {group.attrs.map((attr) => (
                    <Box key={attr.id}>
                      {renderDocumentoField(attr, form.valores[attr.id], (nextValue) => updateValor(attr.id, nextValue))}
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={form.pdfVisivel[attr.id] !== false}
                            onChange={(event) => updatePdfFlag(attr.id, event.target.checked)}
                          />
                        }
                        label="Exibir no PDF"
                      />
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={() => onSave(form)}>
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function RelatoriosPage() {
  const reportTipos = app?.getReportTiposData?.() || [];
  const [tipoId, setTipoId] = useState('');
  const [configId, setConfigId] = useState('');
  const [configName, setConfigName] = useState('');
  const [selectedAttrIds, setSelectedAttrIds] = useState([]);
  const [filtroAttrId, setFiltroAttrId] = useState('');
  const [filtroOperador, setFiltroOperador] = useState('contains');
  const [filtroValor, setFiltroValor] = useState('');
  const [totalAttrIds, setTotalAttrIds] = useState([]);
  const [sumOfSumsEnabled, setSumOfSumsEnabled] = useState(false);
  const [sumOfSumsAttrIds, setSumOfSumsAttrIds] = useState([]);
  const [totalFilters, setTotalFilters] = useState([]);
  const [ordenarAttrId, setOrdenarAttrId] = useState('');
  const [ordenarDirecao, setOrdenarDirecao] = useState('asc');
  const [ordenacao, setOrdenacao] = useState([]);
  const [result, setResult] = useState(null);
  const [resultDialogOpen, setResultDialogOpen] = useState(false);

  useEffect(() => {
    if (!tipoId && reportTipos[0]) {
      setTipoId(reportTipos[0].id);
    }
  }, [reportTipos, tipoId]);

  const attrGroups = tipoId ? (app?.getRelatorioAttributeGroups?.(tipoId) || []) : [];
  const attrs = attrGroups.flatMap((group) => group.items.map((item) => item.attr));
  const numericAttrs = attrs.filter((attr) => attr.tipoCampo === 'numero');
  const availableTotalFilters = [
    ...numericAttrs
      .filter((attr) => totalAttrIds.includes(attr.id))
      .map((attr) => ({ key: `attr_total:${attr.id}`, label: `Total de ${attr.nome}` })),
    ...(sumOfSumsEnabled ? [{ key: 'sum_of_sums', label: 'Total dos totais' }] : []),
  ];
  const availableTotalFilterKeysSignature = availableTotalFilters.map((item) => item.key).join('|');
  const configs = tipoId ? (app?.getReportConfigsData?.(tipoId) || []) : [];

  useEffect(() => {
    if (!tipoId) return;
    setConfigId('');
    setConfigName('');
    setSelectedAttrIds(attrs.map((attr) => attr.id));
    setFiltroAttrId('');
    setFiltroOperador('contains');
    setFiltroValor('');
    setTotalAttrIds([]);
    setSumOfSumsEnabled(false);
    setSumOfSumsAttrIds([]);
    setTotalFilters([]);
    setOrdenarAttrId('');
    setOrdenarDirecao('asc');
    setOrdenacao([]);
    setResult(null);
    setResultDialogOpen(false);
  }, [tipoId]);

  const currentConfig = configs.find((config) => config.id === configId) || null;

  const toggleAttr = (attrId) => {
    setSelectedAttrIds((current) => (
      current.includes(attrId)
        ? current.filter((id) => id !== attrId)
        : [...current, attrId]
    ));
    setTotalAttrIds((current) => current.filter((id) => id !== attrId));
    setSumOfSumsAttrIds((current) => current.filter((id) => id !== attrId));
    setTotalFilters((current) => current.filter((filter) => filter.key !== `attr_total:${attrId}`));
  };

  const toggleTotal = (attrId) => {
    setTotalAttrIds((current) => (
      current.includes(attrId)
        ? current.filter((id) => id !== attrId)
        : [...current, attrId]
    ));
    setSumOfSumsAttrIds((current) => current.filter((id) => id !== attrId));
    setTotalFilters((current) => current.filter((filter) => filter.key !== `attr_total:${attrId}`));
  };

  const toggleSumOfSumsAttr = (attrId) => {
    setSumOfSumsAttrIds((current) => (
      current.includes(attrId)
        ? current.filter((id) => id !== attrId)
        : [...current, attrId]
    ));
  };

  const applyConfig = (nextConfigId) => {
    setConfigId(nextConfigId);
    const config = configs.find((item) => item.id === nextConfigId);
    if (!config) {
      setConfigName('');
      setSelectedAttrIds(attrs.map((attr) => attr.id));
      setFiltroAttrId('');
      setFiltroOperador('contains');
      setFiltroValor('');
      setTotalAttrIds([]);
      setSumOfSumsEnabled(false);
      setSumOfSumsAttrIds([]);
      setTotalFilters([]);
      setOrdenarAttrId('');
      setOrdenarDirecao('asc');
      setOrdenacao([]);
      setResult(null);
      setResultDialogOpen(false);
      return;
    }
    setConfigName(config.nome || '');
    setSelectedAttrIds(Array.isArray(config.selectedAttrIds) ? config.selectedAttrIds : []);
    setFiltroAttrId(config.filtroAttrId || '');
    setFiltroOperador(config.filtroOperador || 'contains');
    setFiltroValor(config.filtroValor || '');
    setTotalAttrIds(Array.isArray(config.totalAttrIds) ? config.totalAttrIds : []);
    setSumOfSumsEnabled(Boolean(config.sumOfSumsEnabled));
    setSumOfSumsAttrIds(Array.isArray(config.sumOfSumsAttrIds) ? config.sumOfSumsAttrIds : []);
    setTotalFilters(Array.isArray(config.totalFilters) ? config.totalFilters : []);
    setOrdenacao(Array.isArray(config.ordenacao) ? config.ordenacao : []);
    setOrdenarAttrId(config.ordenacao?.[0]?.attrId || '');
    setOrdenarDirecao(config.ordenacao?.[0]?.direcao || 'asc');
    setResult(null);
    setResultDialogOpen(false);
  };

  const addOrdenacao = () => {
    if (!ordenarAttrId) {
      app?.notify?.('Selecione um atributo para ordenar.');
      return;
    }
    setOrdenacao((current) => {
      const next = [...current.filter((item) => item.attrId !== ordenarAttrId), { attrId: ordenarAttrId, direcao: ordenarDirecao === 'desc' ? 'desc' : 'asc' }];
      return next;
    });
  };

  const updateTotalFilter = (key, patch) => {
    setTotalFilters((current) => {
      const existing = current.find((filter) => filter.key === key);
      if (!existing) {
        return [...current, {
          key,
          enabled: Boolean(patch.enabled),
          operator: patch.operator || 'gte',
          value: patch.value || '',
        }];
      }
      return current.map((filter) => (
        filter.key === key ? { ...filter, ...patch } : filter
      ));
    });
  };

  useEffect(() => {
    const availableKeys = new Set(availableTotalFilters.map((item) => item.key));
    setTotalFilters((current) => {
      const next = current.filter((filter) => availableKeys.has(filter.key));
      return next.length === current.length ? current : next;
    });
  }, [availableTotalFilterKeysSignature]);

  const saveConfig = () => {
    const response = app?.saveReportConfig?.({
      id: currentConfig?.id || '',
      nome: configName,
      tipoId,
      selectedAttrIds,
      filtroAttrId,
      filtroOperador,
      filtroValor,
      somarNumericos: totalAttrIds.length > 0,
      totalAttrIds,
      sumOfSumsEnabled,
      sumOfSumsAttrIds,
      totalFilters,
      ordenacao,
      ordenarAttrId,
      ordenarDirecao,
      reportLayout: currentConfig?.reportLayout || [],
      reportBlockOrder: currentConfig?.reportBlockOrder || [],
      reportBlockVisibility: currentConfig?.reportBlockVisibility || {},
      reportBlockSpacerHeights: currentConfig?.reportBlockSpacerHeights || {},
      reportFooterMode: currentConfig?.reportFooterMode || 'fixed_bottom',
      reportFooterAnchor: currentConfig?.reportFooterAnchor || 'tabela',
      createdAt: currentConfig?.createdAt || new Date().toISOString(),
    });
    if (response?.ok) {
      setConfigId(response.configId);
    }
  };

  const generate = async () => {
    const response = await app?.generateReport?.({
      tipoId,
      configId,
      selectedAttrIds,
      filtroAttrId,
      filtroOperador,
      filtroValor,
      somarNumericos: totalAttrIds.length > 0,
      totalAttrIds,
      sumOfSumsEnabled,
      sumOfSumsAttrIds,
      totalFilters,
      ordenacao,
      ordenarAttrId,
      ordenarDirecao,
      reportLayout: currentConfig?.reportLayout || [],
    });
    if (response?.ok) {
      setResult(response.result);
      setResultDialogOpen(true);
    }
    return response;
  };

  const renderPdf = async () => {
    const response = await generate();
    if (!response?.ok) {
      app?.notify?.('Gere o relatorio antes de renderizar o PDF.');
      return;
    }
    app?.exportRelatorioPdf?.();
  };

  return (
    <Stack spacing={2}>
      <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" spacing={2}>
        <Box>
          <Typography variant="h4">Relatorios</Typography>
          <Typography color="text.secondary">Monte a selecao de colunas, filtros e ordenacao no React.</Typography>
        </Box>
        <Button href="#relatorio-layout" variant="outlined">
          Abrir layout do relatorio
        </Button>
      </Stack>

      <Card>
        <CardContent>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
            <FormControl fullWidth>
              <InputLabel>Tipo</InputLabel>
              <Select label="Tipo" value={tipoId} onChange={(event) => setTipoId(event.target.value)}>
                {reportTipos.map((tipo) => (
                  <MenuItem key={tipo.id} value={tipo.id}>
                    {tipo.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField fullWidth label="Nome da configuracao" value={configName} onChange={(event) => setConfigName(event.target.value)} />
            <FormControl fullWidth>
              <InputLabel>Configuracao salva</InputLabel>
              <Select label="Configuracao salva" value={configId} onChange={(event) => applyConfig(event.target.value)}>
                <MenuItem value="">Sem configuracao</MenuItem>
                {configs.map((config) => (
                  <MenuItem key={config.id} value={config.id}>
                    {config.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
          <Stack direction="row" spacing={1} sx={{ mt: 2 }} flexWrap="wrap" useFlexGap>
            <Button variant="outlined" onClick={saveConfig}>Salvar config</Button>
            {configId ? <Button color="error" onClick={() => {
              app?.deleteReportConfig?.(configId);
              applyConfig('');
            }}>Excluir config</Button> : null}
            <Button variant="contained" onClick={generate}>Gerar relatorio</Button>
            <Button variant="outlined" onClick={renderPdf}>Render PDF</Button>
          </Stack>
        </CardContent>
      </Card>

      <Stack direction={{ xs: 'column', lg: 'row' }} spacing={2} alignItems="flex-start">
        <Card sx={{ flex: 1, width: '100%' }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>Atributos (colunas)</Typography>
            <Stack spacing={2}>
              {attrGroups.map((group) => (
                <Card key={group.key} variant="outlined">
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1.5 }}>
                      {group.nome}
                    </Typography>
                    <Stack spacing={1}>
                      {group.items.map(({ attr }) => (
                        <Stack key={attr.id} direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" spacing={1}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={selectedAttrIds.includes(attr.id)}
                                onChange={() => toggleAttr(attr.id)}
                              />
                            }
                            label={attr.nome}
                          />
                          {attr.tipoCampo === 'numero' ? (
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={totalAttrIds.includes(attr.id)}
                                  onChange={() => toggleTotal(attr.id)}
                                  disabled={!selectedAttrIds.includes(attr.id)}
                                />
                              }
                              label="Somar"
                            />
                          ) : null}
                        </Stack>
                      ))}
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </CardContent>
        </Card>

        <Card sx={{ width: '100%', maxWidth: 380 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>Filtro e ordenacao</Typography>
            <Stack spacing={2}>
              <Card variant="outlined">
                <CardContent sx={{ '&:last-child': { pb: 2 } }}>
                  <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1 }}>
                    Total dos totais
                  </Typography>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={sumOfSumsEnabled}
                        onChange={(event) => setSumOfSumsEnabled(event.target.checked)}
                        disabled={totalAttrIds.length === 0}
                      />
                    }
                    label="Exibir total dos totais"
                  />
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                    Escolha quais totais de coluna entram nesse total geral.
                  </Typography>
                  <Stack spacing={1}>
                    {numericAttrs.filter((attr) => totalAttrIds.includes(attr.id)).length === 0 ? (
                      <Typography variant="body2" color="text.secondary">
                        Marque primeiro algum Somar nas colunas numericas.
                      </Typography>
                    ) : numericAttrs.filter((attr) => totalAttrIds.includes(attr.id)).map((attr) => (
                      <FormControlLabel
                        key={`sum_of_sums_${attr.id}`}
                        control={
                          <Checkbox
                            checked={sumOfSumsAttrIds.includes(attr.id)}
                            onChange={() => toggleSumOfSumsAttr(attr.id)}
                            disabled={!sumOfSumsEnabled}
                          />
                        }
                        label={attr.nome}
                      />
                    ))}
                  </Stack>
                </CardContent>
              </Card>
              <Card variant="outlined">
                <CardContent sx={{ '&:last-child': { pb: 2 } }}>
                  <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1 }}>
                    Filtros de totais
                  </Typography>
                  <Stack spacing={1.5}>
                    {availableTotalFilters.length === 0 ? (
                      <Typography variant="body2" color="text.secondary">
                        Nenhum total disponivel para filtrar ainda.
                      </Typography>
                    ) : availableTotalFilters.map((item) => {
                      const currentFilter = totalFilters.find((filter) => filter.key === item.key) || {
                        key: item.key,
                        enabled: false,
                        operator: 'gte',
                        value: '',
                      };
                      return (
                        <Card key={item.key} variant="outlined">
                          <CardContent sx={{ '&:last-child': { pb: 2 } }}>
                            <FormControlLabel
                              control={(
                                <Checkbox
                                  checked={Boolean(currentFilter.enabled)}
                                  onChange={(event) => updateTotalFilter(item.key, { enabled: event.target.checked })}
                                />
                              )}
                              label={item.label}
                            />
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                              <FormControl fullWidth disabled={!currentFilter.enabled}>
                                <InputLabel>Operador</InputLabel>
                                <Select
                                  label="Operador"
                                  value={currentFilter.operator || 'gte'}
                                  onChange={(event) => updateTotalFilter(item.key, { operator: event.target.value })}
                                >
                                  <MenuItem value="equals">Igual</MenuItem>
                                  <MenuItem value="not_equals">Diferente</MenuItem>
                                  <MenuItem value="gt">Maior que</MenuItem>
                                  <MenuItem value="gte">Maior ou igual</MenuItem>
                                  <MenuItem value="lt">Menor que</MenuItem>
                                  <MenuItem value="lte">Menor ou igual</MenuItem>
                                  <MenuItem value="empty">Vazio</MenuItem>
                                  <MenuItem value="not_empty">Preenchido</MenuItem>
                                </Select>
                              </FormControl>
                              <TextField
                                fullWidth
                                label="Valor"
                                value={currentFilter.value || ''}
                                onChange={(event) => updateTotalFilter(item.key, { value: event.target.value })}
                                disabled={!currentFilter.enabled || ['empty', 'not_empty'].includes(currentFilter.operator)}
                              />
                            </Stack>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </Stack>
                </CardContent>
              </Card>
              <FormControl fullWidth>
                <InputLabel>Filtro: atributo</InputLabel>
                <Select label="Filtro: atributo" value={filtroAttrId} onChange={(event) => setFiltroAttrId(event.target.value)}>
                  <MenuItem value="">Sem filtro</MenuItem>
                  {attrs.map((attr) => (
                    <MenuItem key={attr.id} value={attr.id}>{attr.nome}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Operador</InputLabel>
                <Select label="Operador" value={filtroOperador} onChange={(event) => setFiltroOperador(event.target.value)}>
                  <MenuItem value="contains">Contem</MenuItem>
                  <MenuItem value="equals">Igual</MenuItem>
                  <MenuItem value="not_equals">Diferente</MenuItem>
                  <MenuItem value="empty">Vazio</MenuItem>
                  <MenuItem value="not_empty">Preenchido</MenuItem>
                </Select>
              </FormControl>
              <TextField label="Valor do filtro" value={filtroValor} onChange={(event) => setFiltroValor(event.target.value)} />
              <Divider />
              <FormControl fullWidth>
                <InputLabel>Ordenar por</InputLabel>
                <Select label="Ordenar por" value={ordenarAttrId} onChange={(event) => setOrdenarAttrId(event.target.value)}>
                  <MenuItem value="">Sem ordenacao</MenuItem>
                  {attrs.map((attr) => (
                    <MenuItem key={attr.id} value={attr.id}>{attr.nome}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Direcao</InputLabel>
                <Select label="Direcao" value={ordenarDirecao} onChange={(event) => setOrdenarDirecao(event.target.value)}>
                  <MenuItem value="asc">Crescente (ASC)</MenuItem>
                  <MenuItem value="desc">Decrescente (DESC)</MenuItem>
                </Select>
              </FormControl>
              <Button variant="outlined" onClick={addOrdenacao}>Adicionar criterio</Button>
              <Stack spacing={1}>
                {ordenacao.length === 0 ? (
                  <Typography variant="body2" color="text.secondary">Sem ordenacao composta.</Typography>
                ) : ordenacao.map((item, index) => {
                  const attr = attrs.find((entry) => entry.id === item.attrId);
                  return (
                    <Card key={`${item.attrId}_${index}`} variant="outlined">
                      <CardContent sx={{ '&:last-child': { pb: 2 } }}>
                        <Stack direction="row" justifyContent="space-between" spacing={1}>
                          <Box>
                            <Typography fontWeight={700}>{attr?.nome || item.attrId}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              {item.direcao === 'desc' ? 'DESC' : 'ASC'}
                            </Typography>
                          </Box>
                          <Button color="error" onClick={() => setOrdenacao((current) => current.filter((_, idx) => idx !== index))}>
                            Remover
                          </Button>
                        </Stack>
                      </CardContent>
                    </Card>
                  );
                })}
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Stack>

      <Dialog
        open={resultDialogOpen && Boolean(result)}
        onClose={() => setResultDialogOpen(false)}
        fullWidth
        maxWidth="xl"
      >
        <DialogTitle>Resultado do relatorio</DialogTitle>
        <DialogContent dividers>
          {result ? (
            <Stack spacing={2}>
              <Typography color="text.secondary">
                {result.tipoNome}: {result.rows.length} registro(s)
              </Typography>
              {result.totalsFilterMessage ? (
                <Typography color="error">
                  {result.totalsFilterMessage}
                </Typography>
              ) : null}
              <Box sx={{ overflowX: 'auto' }}>
                <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse' }}>
                  <Box component="thead">
                    <Box component="tr">
                      {result.columns.map((column) => (
                        <Box
                          key={column}
                          component="th"
                          sx={{ textAlign: 'left', borderBottom: '1px solid #d7e2e7', p: 1, bgcolor: '#f7fbfc' }}
                        >
                          {column}
                        </Box>
                      ))}
                      {sumOfSumsEnabled ? (
                        <Box
                          component="th"
                          sx={{ textAlign: 'left', borderBottom: '1px solid #d7e2e7', p: 1, bgcolor: '#f7fbfc' }}
                        >
                          Totais
                        </Box>
                      ) : null}
                    </Box>
                  </Box>
                  <Box component="tbody">
                    {result.rows.map((row, rowIndex) => (
                      <Box component="tr" key={`row_${rowIndex}`}>
                        {row.map((value, cellIndex) => (
                          <Box key={`cell_${rowIndex}_${cellIndex}`} component="td" sx={{ borderBottom: '1px solid #edf2f5', p: 1 }}>
                            {value}
                          </Box>
                        ))}
                        {sumOfSumsEnabled ? (
                          <Box component="td" sx={{ borderBottom: '1px solid #edf2f5', p: 1 }} />
                        ) : null}
                      </Box>
                    ))}
                    {Array.isArray(result.totalValues) && result.totalValues.some((value) => String(value || '').trim() !== '') ? (
                      <Box component="tr">
                        {result.totalValues.map((value, index) => (
                          <Box key={`total_${index}`} component="td" sx={{ borderBottom: '1px solid #edf2f5', p: 1, fontWeight: 700 }}>
                            {String(value || '').trim() === ''
                              ? (index === result.totalValues.findIndex((item) => String(item || '').trim() === '') ? 'Total' : '')
                              : value}
                          </Box>
                        ))}
                        {sumOfSumsEnabled ? (
                          <Box key="total_sum_of_sums" component="td" sx={{ borderBottom: '1px solid #edf2f5', p: 1, fontWeight: 700 }}>
                            {result.sumOfSumsValue || ''}
                          </Box>
                        ) : null}
                      </Box>
                    ) : null}
                  </Box>
                </Box>
              </Box>
            </Stack>
          ) : null}
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={renderPdf}>Render PDF</Button>
          <Button onClick={() => setResultDialogOpen(false)}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}

function EmptyState({ title, description, actionLabel, onAction }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 1 }}>
          {title}
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 2 }}>
          {description}
        </Typography>
        {actionLabel ? <Button variant="contained" onClick={onAction}>{actionLabel}</Button> : null}
      </CardContent>
    </Card>
  );
}

const REPORT_BLOCK_LABELS = {
  cabecalho: 'Cabecalho',
  info_geracao: 'Info de geracao',
  tabela: 'Tabela',
  rodape: 'Rodape',
};

function defaultReportBlockOrderReact() {
  return ['cabecalho', 'info_geracao', 'tabela', 'rodape'];
}

function isReportSpacerKey(key) {
  return String(key || '').startsWith('spacer:');
}

function normalizeReportBlockOrderReact(order = []) {
  const seen = new Set();
  const next = [];
  order.forEach((key) => {
    const text = String(key || '').trim();
    if (!text || seen.has(text)) return;
    if (!defaultReportBlockOrderReact().includes(text) && !isReportSpacerKey(text)) return;
    seen.add(text);
    next.push(text);
  });
  defaultReportBlockOrderReact().forEach((key) => {
    if (!seen.has(key)) next.push(key);
  });
  return next;
}

function normalizeReportBlockVisibilityReact(raw = {}, order = []) {
  const next = {};
  normalizeReportBlockOrderReact(order).forEach((key) => {
    next[key] = raw[key] !== false;
  });
  return next;
}

function normalizeReportBlockSpacerHeightsReact(raw = {}, order = []) {
  const next = {};
  normalizeReportBlockOrderReact(order).forEach((key) => {
    if (!isReportSpacerKey(key)) return;
    const value = Number(raw[key]);
    next[key] = Number.isFinite(value) ? Math.min(240, Math.max(4, Math.round(value))) : 24;
  });
  return next;
}

function buildReportLayoutWorking(config, attrs) {
  const attrById = new Map(attrs.map((attr) => [attr.id, attr]));
  const selected = Array.isArray(config?.selectedAttrIds)
    ? config.selectedAttrIds.filter((id) => attrById.has(id))
    : [];
  const base = Array.isArray(config?.reportLayout)
    ? config.reportLayout
      .filter((item) => selected.includes(item.attrId))
      .map((item) => ({
        attrId: item.attrId,
        colSpan: [3, 4, 6, 8, 12].includes(Number(item.colSpan)) ? Number(item.colSpan) : 6,
      }))
    : [];
  const inBase = new Set(base.map((item) => item.attrId));
  selected.forEach((id) => {
    if (!inBase.has(id)) base.push({ attrId: id, colSpan: 6 });
  });
  return base;
}

function RelatorioLayoutPage() {
  const reportTipos = app?.getReportTiposData?.() || [];
  const [tipoId, setTipoId] = useState('');
  const [configId, setConfigId] = useState('');
  const [layoutItems, setLayoutItems] = useState([]);
  const [totalAttrIds, setTotalAttrIds] = useState([]);
  const [blockOrder, setBlockOrder] = useState(defaultReportBlockOrderReact());
  const [blockVisibility, setBlockVisibility] = useState(normalizeReportBlockVisibilityReact({}, defaultReportBlockOrderReact()));
  const [blockSpacerHeights, setBlockSpacerHeights] = useState({});
  const [footerMode, setFooterMode] = useState('fixed_bottom');
  const [footerAnchor, setFooterAnchor] = useState('tabela');

  useEffect(() => {
    if (!tipoId && reportTipos[0]) {
      setTipoId(reportTipos[0].id);
    }
  }, [reportTipos, tipoId]);

  const attrs = tipoId ? (app?.getAtributosByTipo?.(tipoId) || []) : [];
  const configs = tipoId ? (app?.getReportConfigsData?.(tipoId) || []) : [];
  const currentConfig = configs.find((config) => config.id === configId) || null;

  useEffect(() => {
    if (!tipoId) return;
    const nextConfigId = configs[0]?.id || '';
    setConfigId((current) => (current && configs.some((config) => config.id === current) ? current : nextConfigId));
  }, [tipoId, configs]);

  useEffect(() => {
    if (!tipoId || !configId) {
      setLayoutItems([]);
      setTotalAttrIds([]);
      const nextOrder = defaultReportBlockOrderReact();
      setBlockOrder(nextOrder);
      setBlockVisibility(normalizeReportBlockVisibilityReact({}, nextOrder));
      setBlockSpacerHeights({});
      setFooterMode('fixed_bottom');
      setFooterAnchor('tabela');
      return;
    }
    const config = configs.find((item) => item.id === configId) || null;
    if (!config) return;
    const nextOrder = normalizeReportBlockOrderReact(config.reportBlockOrder || []);
    setLayoutItems(buildReportLayoutWorking(config, attrs));
    setTotalAttrIds(Array.isArray(config.totalAttrIds) ? config.totalAttrIds : []);
    setBlockOrder(nextOrder);
    setBlockVisibility(normalizeReportBlockVisibilityReact(config.reportBlockVisibility || {}, nextOrder));
    setBlockSpacerHeights(normalizeReportBlockSpacerHeightsReact(config.reportBlockSpacerHeights || {}, nextOrder));
    setFooterMode(config.reportFooterMode === 'after_block' ? 'after_block' : 'fixed_bottom');
    setFooterAnchor(['cabecalho', 'info_geracao', 'tabela'].includes(config.reportFooterAnchor) ? config.reportFooterAnchor : 'tabela');
  }, [tipoId, configId, attrs, configs]);

  const moveItem = (attrId, direction) => {
    setLayoutItems((current) => {
      const index = current.findIndex((item) => item.attrId === attrId);
      const nextIndex = index + direction;
      if (index < 0 || nextIndex < 0 || nextIndex >= current.length) return current;
      const next = [...current];
      const [item] = next.splice(index, 1);
      next.splice(nextIndex, 0, item);
      return next;
    });
  };

  const updateSpan = (attrId, colSpan) => {
    const nextSpan = [3, 4, 6, 8, 12].includes(Number(colSpan)) ? Number(colSpan) : 6;
    setLayoutItems((current) => current.map((item) => (
      item.attrId === attrId ? { ...item, colSpan: nextSpan } : item
    )));
  };

  const toggleTotal = (attrId) => {
    setTotalAttrIds((current) => (
      current.includes(attrId)
        ? current.filter((id) => id !== attrId)
        : [...current, attrId]
    ));
  };

  const moveBlock = (key, direction) => {
    setBlockOrder((current) => {
      const index = current.indexOf(key);
      const nextIndex = index + direction;
      if (index < 0 || nextIndex < 0 || nextIndex >= current.length) return current;
      const next = [...current];
      const [item] = next.splice(index, 1);
      next.splice(nextIndex, 0, item);
      return next;
    });
  };

  const addSpacer = () => {
    const key = `spacer:${Date.now()}`;
    setBlockOrder((current) => normalizeReportBlockOrderReact([...current, key]));
    setBlockVisibility((current) => ({ ...current, [key]: true }));
    setBlockSpacerHeights((current) => ({ ...current, [key]: 24 }));
  };

  const removeSpacer = (key) => {
    setBlockOrder((current) => current.filter((item) => item !== key));
    setBlockVisibility((current) => {
      const next = { ...current };
      delete next[key];
      return next;
    });
    setBlockSpacerHeights((current) => {
      const next = { ...current };
      delete next[key];
      return next;
    });
  };

  const resetLayout = () => {
    if (!currentConfig) {
      app?.notify?.('Selecione tipo e configuracao para resetar layout.');
      return;
    }
    setLayoutItems(buildReportLayoutWorking({ ...currentConfig, reportLayout: [] }, attrs));
    setTotalAttrIds([]);
    const nextOrder = defaultReportBlockOrderReact();
    setBlockOrder(nextOrder);
    setBlockVisibility(normalizeReportBlockVisibilityReact({}, nextOrder));
    setBlockSpacerHeights({});
    setFooterMode('fixed_bottom');
    setFooterAnchor('tabela');
  };

  const saveLayout = () => {
    if (!currentConfig || !tipoId) {
      app?.notify?.('Selecione tipo e configuracao para salvar layout.');
      return;
    }
    const response = app?.saveReportConfig?.({
      ...currentConfig,
      tipoId,
      selectedAttrIds: layoutItems.map((item) => item.attrId),
      reportLayout: layoutItems.map((item) => ({ attrId: item.attrId, colSpan: item.colSpan })),
      reportBlockOrder: normalizeReportBlockOrderReact(blockOrder),
      reportBlockVisibility: normalizeReportBlockVisibilityReact(blockVisibility, blockOrder),
      reportBlockSpacerHeights: normalizeReportBlockSpacerHeightsReact(blockSpacerHeights, blockOrder),
      reportFooterMode: footerMode === 'after_block' ? 'after_block' : 'fixed_bottom',
      reportFooterAnchor: ['cabecalho', 'info_geracao', 'tabela'].includes(footerAnchor) ? footerAnchor : 'tabela',
      totalAttrIds,
    });
    if (response?.ok) {
      app?.notify?.('Layout da configuracao de relatorio salvo.');
    }
  };

  const attrById = new Map(attrs.map((attr) => [attr.id, attr]));

  return (
    <Stack spacing={2}>
      <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" spacing={2}>
        <Box>
          <Typography variant="h4">Layout Relatorio</Typography>
          <Typography color="text.secondary">Configure blocos, ordem, largura e totais do relatorio no modelo novo.</Typography>
        </Box>
        <Stack direction="row" spacing={1}>
          <Button variant="outlined" onClick={resetLayout}>Resetar</Button>
          <Button variant="contained" onClick={saveLayout}>Salvar</Button>
        </Stack>
      </Stack>

      <Card>
        <CardContent>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
            <FormControl fullWidth>
              <InputLabel>Tipo</InputLabel>
              <Select label="Tipo" value={tipoId} onChange={(event) => setTipoId(event.target.value)}>
                {reportTipos.map((tipo) => (
                  <MenuItem key={tipo.id} value={tipo.id}>{tipo.nome}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Configuracao</InputLabel>
              <Select label="Configuracao" value={configId} onChange={(event) => setConfigId(event.target.value)}>
                <MenuItem value="">Sem configuracao</MenuItem>
                {configs.map((config) => (
                  <MenuItem key={config.id} value={config.id}>{config.nome}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </CardContent>
      </Card>

      {!tipoId || !configId ? (
        <EmptyState title="Selecione tipo e configuracao" description="Escolha uma configuracao de relatorio para editar o layout." />
      ) : (
        <Stack spacing={2}>
          <Card>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Typography variant="h6">Blocos do relatorio</Typography>
                <Button variant="outlined" onClick={addSpacer}>Adicionar espacador</Button>
              </Stack>
              <Stack spacing={1.5}>
                {blockOrder.map((key, index) => (
                  <Card key={key} variant="outlined">
                    <CardContent sx={{ '&:last-child': { pb: 2 } }}>
                      <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" spacing={2}>
                        <Box sx={{ flex: 1 }}>
                          <Typography fontWeight={700}>{REPORT_BLOCK_LABELS[key] || 'Espacador'}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {isReportSpacerKey(key) ? 'Bloco de espacamento' : 'Bloco estrutural do relatorio'}
                          </Typography>
                          <FormControlLabel
                            control={(
                              <Checkbox
                                checked={blockVisibility[key] !== false}
                                onChange={(event) => setBlockVisibility((current) => ({ ...current, [key]: event.target.checked }))}
                              />
                            )}
                            label="Exibir no PDF"
                          />
                          {isReportSpacerKey(key) ? (
                            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mt: 1 }}>
                              <TextField
                                label="Altura"
                                type="range"
                                value={blockSpacerHeights[key] || 24}
                                onChange={(event) => setBlockSpacerHeights((current) => ({ ...current, [key]: Number(event.target.value) }))}
                                inputProps={{ min: 4, max: 240, step: 1 }}
                                fullWidth
                              />
                              <TextField
                                label="Px"
                                type="number"
                                value={blockSpacerHeights[key] || 24}
                                onChange={(event) => setBlockSpacerHeights((current) => ({ ...current, [key]: Number(event.target.value) }))}
                                inputProps={{ min: 4, max: 240, step: 1 }}
                                sx={{ maxWidth: 140 }}
                              />
                            </Stack>
                          ) : null}
                        </Box>
                        <Stack direction="row" spacing={1}>
                          <Button variant="outlined" onClick={() => moveBlock(key, -1)} disabled={index === 0}>↑</Button>
                          <Button variant="outlined" onClick={() => moveBlock(key, 1)} disabled={index === blockOrder.length - 1}>↓</Button>
                          {isReportSpacerKey(key) ? (
                            <Button color="error" onClick={() => removeSpacer(key)}>Remover</Button>
                          ) : null}
                        </Stack>
                      </Stack>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Rodape</Typography>
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                <FormControl fullWidth>
                  <InputLabel>Posicao do rodape</InputLabel>
                  <Select label="Posicao do rodape" value={footerMode} onChange={(event) => setFooterMode(event.target.value)}>
                    <MenuItem value="fixed_bottom">Rodape fixo no final</MenuItem>
                    <MenuItem value="after_block">Rodape abaixo de bloco</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth disabled={footerMode !== 'after_block'}>
                  <InputLabel>Elemento ancora</InputLabel>
                  <Select label="Elemento ancora" value={footerAnchor} onChange={(event) => setFooterAnchor(event.target.value)}>
                    <MenuItem value="cabecalho">Abaixo do Cabecalho</MenuItem>
                    <MenuItem value="info_geracao">Abaixo da Info de geracao</MenuItem>
                    <MenuItem value="tabela">Abaixo da Tabela</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Campos</Typography>
              {layoutItems.length === 0 ? (
                <Typography color="text.secondary">Essa configuracao nao possui atributos selecionados.</Typography>
              ) : (
                <Stack spacing={1.5}>
                  {layoutItems.map((item, index) => {
                    const attr = attrById.get(item.attrId);
                    if (!attr) return null;
                    return (
                      <Card key={item.attrId} variant="outlined">
                        <CardContent sx={{ '&:last-child': { pb: 2 } }}>
                          <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" spacing={2}>
                            <Box sx={{ flex: 1 }}>
                              <Typography fontWeight={700}>{attr.nome}</Typography>
                              <Typography variant="body2" color="text.secondary">{attr.tipoCampo}</Typography>
                              {attr.tipoCampo === 'numero' ? (
                                <FormControlLabel
                                  control={(
                                    <Checkbox
                                      checked={totalAttrIds.includes(item.attrId)}
                                      onChange={() => toggleTotal(item.attrId)}
                                    />
                                  )}
                                  label="Somar no total"
                                />
                              ) : null}
                            </Box>
                            <Stack direction={{ xs: 'column', md: 'row' }} spacing={1}>
                              <FormControl sx={{ minWidth: 140 }}>
                                <InputLabel>Largura</InputLabel>
                                <Select
                                  label="Largura"
                                  value={String(item.colSpan)}
                                  onChange={(event) => updateSpan(item.attrId, Number(event.target.value))}
                                >
                                  {[3, 4, 6, 8, 12].map((value) => (
                                    <MenuItem key={value} value={String(value)}>{value}/12</MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                              <Button variant="outlined" onClick={() => moveItem(item.attrId, -1)} disabled={index === 0}>↑</Button>
                              <Button variant="outlined" onClick={() => moveItem(item.attrId, 1)} disabled={index === layoutItems.length - 1}>↓</Button>
                            </Stack>
                          </Stack>
                        </CardContent>
                      </Card>
                    );
                  })}
                </Stack>
              )}
            </CardContent>
          </Card>
        </Stack>
      )}
    </Stack>
  );
}

function LegacyPageFrame({ title, description, src }) {
  return (
    <Stack spacing={2}>
      <Card>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 1 }}>{title}</Typography>
          <Typography color="text.secondary">{description}</Typography>
        </CardContent>
      </Card>
      <Card sx={{ overflow: 'hidden' }}>
        <Box
          component="iframe"
          title={title}
          src={src}
          sx={{ width: '100%', minHeight: '78vh', border: 0, backgroundColor: '#fff' }}
        />
      </Card>
    </Stack>
  );
}

function App() {
  const snapshot = useAppSnapshot();
  const route = useRoute();

  const [tipoDialogOpen, setTipoDialogOpen] = useState(false);
  const [secaoDialogOpen, setSecaoDialogOpen] = useState(false);
  const [atributoDialogOpen, setAtributoDialogOpen] = useState(false);
  const [documentoDialogOpen, setDocumentoDialogOpen] = useState(false);
  const [editingTipo, setEditingTipo] = useState(null);
  const [editingSecao, setEditingSecao] = useState(null);
  const [editingAtributo, setEditingAtributo] = useState(null);
  const [editingDocumento, setEditingDocumento] = useState(null);
  const [selectedTipoFilterId, setSelectedTipoFilterId] = useState('');

  const theme = createTheme({
    palette: {
      mode: 'light',
      primary: { main: '#0f766e' },
      secondary: { main: '#b45309' },
      background: { default: '#f4f7f4', paper: '#ffffff' },
    },
    shape: { borderRadius: 18 },
    typography: {
      fontFamily: '"Segoe UI", "Helvetica Neue", Arial, sans-serif',
      h4: { fontWeight: 800, letterSpacing: '-0.03em' },
      h6: { fontWeight: 700 },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            border: '1px solid rgba(15, 118, 110, 0.10)',
            boxShadow: '0 18px 48px rgba(15, 23, 42, 0.08)',
          },
        },
      },
    },
  });

  const openTipoDialog = (tipo = null) => {
    setEditingTipo(tipo);
    setTipoDialogOpen(true);
  };
  const openSecaoDialog = (secao = null) => {
    setEditingSecao(secao);
    setSecaoDialogOpen(true);
  };
  const openAtributoDialog = (atributo = null) => {
    setEditingAtributo(atributo);
    setAtributoDialogOpen(true);
  };
  const openDocumentoDialog = (documento = null) => {
    setEditingDocumento(documento);
    setDocumentoDialogOpen(true);
  };

  const handleAsyncSave = async (runner, close) => {
    const result = await runner();
    if (result?.ok) close();
  };

  const renderPage = () => {
    if (route === 'tipos') {
      return (
        <Stack spacing={2}>
          <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" spacing={2}>
            <Box>
              <Typography variant="h4">Tipos</Typography>
              <Typography color="text.secondary">Gerencie tipos e secoes vinculadas.</Typography>
            </Box>
            <Button variant="contained" size="large" onClick={() => openTipoDialog()}>
              Novo tipo
            </Button>
          </Stack>
          {snapshot.tipos.length === 0 ? (
            <EmptyState title="Nenhum tipo cadastrado" description="Crie o primeiro tipo para continuar." actionLabel="Criar tipo" onAction={() => openTipoDialog()} />
          ) : (
            snapshot.tipos.map((tipo) => (
              <Card key={tipo.id}>
                <CardContent>
                  <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" spacing={2}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6">{tipo.nome}</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Cabecalho: {preview(tipo.cabecalho)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Rodape: {preview(tipo.rodape)}
                      </Typography>
                      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mt: 2 }}>
                        {tipo.secoes.length > 0 ? tipo.secoes.map((secao) => (
                          <Chip key={secao.id} label={secao.nome} size="small" variant="outlined" />
                        )) : <Chip label="Sem secoes vinculadas" size="small" />}
                      </Stack>
                    </Box>
                    <Stack direction="row" spacing={1}>
                      <Button variant="outlined" onClick={() => openTipoDialog(tipo)}>Editar</Button>
                      <Button color="error" onClick={() => app?.deleteTipo?.(tipo.id)}>Excluir</Button>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            ))
          )}
        </Stack>
      );
    }

    if (route === 'secoes') {
      const filteredSecoes = selectedTipoFilterId
        ? snapshot.secoes.filter((secao) => secao.linkedTipoIds.includes(selectedTipoFilterId))
        : snapshot.secoes;

      return (
        <Stack spacing={2}>
          <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" spacing={2}>
            <Box>
              <Typography variant="h4">Secoes</Typography>
              <Typography color="text.secondary">Gerencie secoes e seu uso nos tipos.</Typography>
            </Box>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
              <FormControl sx={{ minWidth: 240 }}>
                <InputLabel>Filtrar por tipo</InputLabel>
                <Select
                  label="Filtrar por tipo"
                  value={selectedTipoFilterId}
                  onChange={(event) => setSelectedTipoFilterId(event.target.value)}
                >
                  <MenuItem value="">Todos os tipos</MenuItem>
                  {snapshot.tipos.map((tipo) => (
                    <MenuItem key={tipo.id} value={tipo.id}>
                      {tipo.nome}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button variant="contained" size="large" onClick={() => openSecaoDialog()}>
                Nova secao
              </Button>
            </Stack>
          </Stack>
          {filteredSecoes.length === 0 ? (
            <EmptyState title="Nenhuma secao cadastrada" description="Crie a primeira secao." actionLabel="Criar secao" onAction={() => openSecaoDialog()} />
          ) : (
            filteredSecoes.map((secao) => (
              <Card key={secao.id}>
                <CardContent>
                  <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" spacing={2}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6">{secao.nome}</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Tipos vinculados: {secao.linkedTipoIds.length}
                      </Typography>
                    </Box>
                    <Stack direction="row" spacing={1}>
                      <Button variant="outlined" onClick={() => openSecaoDialog(secao)}>Editar</Button>
                      <Button color="error" onClick={() => app?.deleteSecao?.(secao.id)}>Excluir</Button>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            ))
          )}
        </Stack>
      );
    }

    if (route === 'atributos') {
      const filteredAtributos = selectedTipoFilterId
        ? snapshot.atributos.filter((atributo) => atributo.tipoId === selectedTipoFilterId)
        : snapshot.atributos;
      const filteredSecoes = selectedTipoFilterId
        ? snapshot.secoes.filter((secao) => secao.linkedTipoIds.includes(selectedTipoFilterId))
        : snapshot.secoes;
      const atributosPorSecao = filteredSecoes
        .map((secao) => ({
          secao,
          atributos: filteredAtributos.filter((atributo) => atributo.secaoId === secao.id),
        }))
        .filter((group) => group.atributos.length > 0);
      const atributosSemSecao = filteredAtributos.filter((atributo) => !atributo.secaoId);

      return (
        <Stack spacing={2}>
          <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" spacing={2}>
            <Box>
              <Typography variant="h4">Atributos</Typography>
              <Typography color="text.secondary">Cadastre campos dinâmicos por tipo e secao.</Typography>
            </Box>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
              <FormControl sx={{ minWidth: 240 }}>
                <InputLabel>Filtrar por tipo</InputLabel>
                <Select
                  label="Filtrar por tipo"
                  value={selectedTipoFilterId}
                  onChange={(event) => setSelectedTipoFilterId(event.target.value)}
                >
                  <MenuItem value="">Todos os tipos</MenuItem>
                  {snapshot.tipos.map((tipo) => (
                    <MenuItem key={tipo.id} value={tipo.id}>
                      {tipo.nome}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button variant="contained" size="large" onClick={() => openAtributoDialog()}>
                Novo atributo
              </Button>
            </Stack>
          </Stack>
          {filteredAtributos.length === 0 ? (
            <EmptyState title="Nenhum atributo cadastrado" description="Crie o primeiro atributo." actionLabel="Criar atributo" onAction={() => openAtributoDialog()} />
          ) : (
            <Stack spacing={2}>
              {atributosPorSecao.map(({ secao, atributos }) => (
                <Card key={secao.id}>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 0.5 }}>
                      {secao.nome}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {atributos.length} atributo(s) nesta secao
                    </Typography>
                    <Stack spacing={2}>
                      {atributos.map((atributo) => (
                        <Card key={atributo.id} variant="outlined">
                          <CardContent>
                            <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" spacing={2}>
                              <Box sx={{ flex: 1 }}>
                                <Typography variant="h6">{atributo.nome}</Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                  Tipo: {atributo.tipoNome || '-'} | Secao: {atributo.secaoNome || '-'}
                                </Typography>
                                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mt: 2 }}>
                                  <Chip label={atributo.tipoCampo} size="small" />
                                  {atributo.validador ? <Chip label={`Validador: ${atributo.validador}`} size="small" variant="outlined" /> : null}
                                  {atributo.mascara ? <Chip label={`Mascara: ${atributo.mascara}`} size="small" variant="outlined" /> : null}
                                </Stack>
                              </Box>
                              <Stack direction="row" spacing={1}>
                                <Button variant="outlined" onClick={() => openAtributoDialog(atributo)}>Editar</Button>
                                <Button color="error" onClick={() => app?.deleteAtributo?.(atributo.id)}>Excluir</Button>
                              </Stack>
                            </Stack>
                          </CardContent>
                        </Card>
                      ))}
                    </Stack>
                  </CardContent>
                </Card>
              ))}

              {atributosSemSecao.length > 0 ? (
                <Card>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 0.5 }}>
                      Sem secao
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {atributosSemSecao.length} atributo(s) sem vinculacao de secao
                    </Typography>
                    <Stack spacing={2}>
                      {atributosSemSecao.map((atributo) => (
                        <Card key={atributo.id} variant="outlined">
                          <CardContent>
                            <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" spacing={2}>
                              <Box sx={{ flex: 1 }}>
                                <Typography variant="h6">{atributo.nome}</Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                  Tipo: {atributo.tipoNome || '-'} | Secao: -
                                </Typography>
                                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mt: 2 }}>
                                  <Chip label={atributo.tipoCampo} size="small" />
                                  {atributo.validador ? <Chip label={`Validador: ${atributo.validador}`} size="small" variant="outlined" /> : null}
                                  {atributo.mascara ? <Chip label={`Mascara: ${atributo.mascara}`} size="small" variant="outlined" /> : null}
                                </Stack>
                              </Box>
                              <Stack direction="row" spacing={1}>
                                <Button variant="outlined" onClick={() => openAtributoDialog(atributo)}>Editar</Button>
                                <Button color="error" onClick={() => app?.deleteAtributo?.(atributo.id)}>Excluir</Button>
                              </Stack>
                            </Stack>
                          </CardContent>
                        </Card>
                      ))}
                    </Stack>
                  </CardContent>
                </Card>
              ) : null}
            </Stack>
          )}
        </Stack>
      );
    }

    if (route === 'documentos') {
      return (
        <Stack spacing={2}>
          <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" spacing={2}>
            <Box>
              <Typography variant="h4">Documentos</Typography>
              <Typography color="text.secondary">Cadastre e edite documentos com campos dinâmicos.</Typography>
            </Box>
            <Button variant="contained" size="large" onClick={() => openDocumentoDialog()}>
              Novo documento
            </Button>
          </Stack>
          {snapshot.documentos.length === 0 ? (
            <EmptyState title="Nenhum documento cadastrado" description="Crie o primeiro documento." actionLabel="Criar documento" onAction={() => openDocumentoDialog()} />
          ) : (
            snapshot.documentos.map((documento) => (
              <Card key={documento.id}>
                <CardContent>
                  <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" spacing={2}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6">{documento.titulo}</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Tipo: {documento.tipoNome || '-'}
                      </Typography>
                      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mt: 2 }}>
                        <Chip label={`${Object.keys(documento.valores || {}).length} campos`} size="small" variant="outlined" />
                      </Stack>
                    </Box>
                    <Stack direction="row" spacing={1}>
                      <Button variant="outlined" onClick={() => openDocumentoDialog(documento)}>Editar</Button>
                      <Button color="error" onClick={() => app?.deleteDocumento?.(documento.id)}>Excluir</Button>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            ))
          )}
        </Stack>
      );
    }

    if (route === 'layout') {
      return <LayoutPage />;
    }

    if (route === 'relatorios') {
      return <RelatoriosPage />;
    }

    return <RelatorioLayoutPage />;
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', background: 'linear-gradient(180deg, #e7f5f2 0%, #f4f7f4 24%, #f4f7f4 100%)' }}>
        <AppBar position="static" color="transparent" elevation={0}>
          <Toolbar sx={{ py: 1.5, gap: 2, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" color="text.primary">
                Documentos
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Workspace React/MUI em migracao progressiva
              </Typography>
            </Box>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {PAGES.map((page) => (
                <Button
                  key={page.key}
                  href={`#${page.key}`}
                  variant={route === page.key ? 'contained' : 'text'}
                  color={route === page.key ? 'primary' : 'inherit'}
                >
                  {page.label}
                </Button>
              ))}
              <Button href="index.html" color="inherit">Legacy</Button>
            </Stack>
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg" sx={{ py: 5 }}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="space-between">
                <Box>
                  <Typography variant="h6">Resumo</Typography>
                  <Typography color="text.secondary">Base React usando o mesmo estado do app legado.</Typography>
                </Box>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  <Chip label={`${snapshot.tipos.length} tipos`} color="primary" />
                  <Chip label={`${snapshot.secoes.length} secoes`} variant="outlined" />
                  <Chip label={`${snapshot.atributos.length} atributos`} variant="outlined" />
                  <Chip label={`${snapshot.documentos.length} documentos`} variant="outlined" />
                </Stack>
              </Stack>
            </CardContent>
          </Card>

          {renderPage()}

          <Divider sx={{ my: 4 }} />
          <Typography variant="body2" color="text.secondary">
            CRUD principal em React; ferramentas avançadas ainda usam a implementacao legada dentro do shell React por enquanto.
          </Typography>
        </Container>

        <TipoDialog
          open={tipoDialogOpen}
          secoes={snapshot.secoes}
          initialValue={editingTipo}
          onClose={() => setTipoDialogOpen(false)}
          onSave={(payload) => {
            const result = app?.saveTipo?.(payload);
            if (result?.ok) setTipoDialogOpen(false);
          }}
          onJumpToSecao={(secaoId) => {
            window.location.hash = '#secoes';
            app?.focusSecao?.(secaoId);
          }}
        />
        <SecaoDialog
          open={secaoDialogOpen}
          initialValue={editingSecao}
          onClose={() => setSecaoDialogOpen(false)}
          onSave={(payload) => {
            const result = app?.saveSecao?.(payload);
            if (result?.ok) setSecaoDialogOpen(false);
          }}
        />
        <AtributoDialog
          open={atributoDialogOpen}
          tipos={snapshot.tipos}
          secoes={snapshot.secoes}
          initialValue={editingAtributo}
          onClose={() => setAtributoDialogOpen(false)}
          onSave={(payload) => {
            const result = app?.saveAtributo?.(payload);
            if (result?.ok) setAtributoDialogOpen(false);
          }}
        />
        <DocumentoDialog
          open={documentoDialogOpen}
          tipos={snapshot.tipos}
          initialValue={editingDocumento}
          onClose={() => setDocumentoDialogOpen(false)}
          onSave={(payload) => handleAsyncSave(() => app?.saveDocumento?.(payload), () => setDocumentoDialogOpen(false))}
        />
      </Box>
    </ThemeProvider>
  );
}

const rootElement = document.getElementById('mui-root');
if (rootElement) {
  createRoot(rootElement).render(<App />);
}
