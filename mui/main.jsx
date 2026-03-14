import React, { useEffect, useMemo, useState } from 'react';
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
  FormControlLabel,
  FormGroup,
  Stack,
  TextField,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from '@mui/material';

const app = window.documentosApp;

function preview(text, max = 120) {
  const normalized = String(text || '').trim();
  if (!normalized) return '-';
  return normalized.length <= max ? normalized : `${normalized.slice(0, max - 3)}...`;
}

function useAppSnapshot() {
  const getSnapshot = () => ({
    tipos: app?.getTipos?.() || [],
    secoes: app?.getSecoes?.() || [],
  });
  const [snapshot, setSnapshot] = useState(getSnapshot);

  useEffect(() => {
    if (!app?.subscribe) return undefined;
    return app.subscribe(() => setSnapshot(getSnapshot()));
  }, []);

  return snapshot;
}

function TipoDialog({ open, secoes, initialValue, onClose, onSave, onJumpToSecao }) {
  const [form, setForm] = useState({
    id: '',
    nome: '',
    cabecalho: '',
    rodape: '',
    secaoIds: [],
  });

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

  const selectedCount = form.secaoIds.length;

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
            <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center" sx={{ mb: 1.5 }}>
              <Typography variant="subtitle1" fontWeight={700}>
                Secoes vinculadas
              </Typography>
              <Chip label={`${selectedCount} selecionadas`} color="primary" variant="outlined" />
            </Stack>
            {secoes.length === 0 ? (
              <Typography variant="body2" color="text.secondary">
                Nenhuma secao cadastrada ainda.
              </Typography>
            ) : (
              <FormGroup>
                {secoes.map((secao) => (
                  <Box
                    key={secao.id}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: 2,
                      py: 0.75,
                    }}
                  >
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
                  </Box>
                ))}
              </FormGroup>
            )}
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={() => onSave(form)}>
          Salvar tipo
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function App() {
  const { tipos, secoes } = useAppSnapshot();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTipo, setEditingTipo] = useState(null);

  const theme = useMemo(
    () =>
      createTheme({
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
      }),
    []
  );

  const openCreateDialog = () => {
    setEditingTipo(null);
    setDialogOpen(true);
  };

  const openEditDialog = (tipo) => {
    setEditingTipo(tipo);
    setDialogOpen(true);
  };

  const handleSave = (payload) => {
    const result = app?.saveTipo?.(payload);
    if (result?.ok) {
      setDialogOpen(false);
      setEditingTipo(null);
    }
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
                Migracao inicial para MUI na tela de tipos
              </Typography>
            </Box>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {[
                ['Tipos', 'index.html'],
                ['Secoes', 'secoes.html'],
                ['Atributos', 'atributos.html'],
                ['Documento', 'documentos.html'],
                ['Layout', 'layout.html'],
                ['Relatorios', 'relatorios.html'],
                ['Layout Relatorio', 'relatorio-layout.html'],
              ].map(([label, href]) => (
                <Button
                  key={href}
                  href={href}
                  variant={href === 'index.html' ? 'contained' : 'text'}
                  color={href === 'index.html' ? 'primary' : 'inherit'}
                >
                  {label}
                </Button>
              ))}
            </Stack>
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg" sx={{ py: 5 }}>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={2}
            justifyContent="space-between"
            alignItems={{ xs: 'flex-start', md: 'center' }}
            sx={{ mb: 3 }}
          >
            <Box>
              <Typography variant="h4">Documento tipos</Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                Gerencie os tipos e as secoes vinculadas com uma interface MUI.
              </Typography>
            </Box>
            <Button variant="contained" onClick={openCreateDialog} size="large">
              Novo tipo
            </Button>
          </Stack>

          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="space-between">
                <Box>
                  <Typography variant="h6">Resumo</Typography>
                  <Typography color="text.secondary">A tela de tipos ja esta usando MUI.</Typography>
                </Box>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  <Chip label={`${tipos.length} tipos`} color="primary" />
                  <Chip label={`${secoes.length} secoes`} variant="outlined" />
                </Stack>
              </Stack>
            </CardContent>
          </Card>

          <Stack spacing={2}>
            {tipos.length === 0 ? (
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    Nenhum tipo cadastrado
                  </Typography>
                  <Typography color="text.secondary" sx={{ mb: 2 }}>
                    Crie o primeiro tipo para continuar a migracao desta area.
                  </Typography>
                  <Button variant="contained" onClick={openCreateDialog}>
                    Criar tipo
                  </Button>
                </CardContent>
              </Card>
            ) : (
              tipos.map((tipo) => (
                <Card key={tipo.id}>
                  <CardContent>
                    <Stack
                      direction={{ xs: 'column', md: 'row' }}
                      spacing={2}
                      justifyContent="space-between"
                      alignItems={{ xs: 'flex-start', md: 'center' }}
                    >
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography variant="h6">{tipo.nome}</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                          Cabecalho: {preview(tipo.cabecalho)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Rodape: {preview(tipo.rodape)}
                        </Typography>
                        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mt: 2 }}>
                          {tipo.secoes.length > 0 ? (
                            tipo.secoes.map((secao) => <Chip key={secao.id} label={secao.nome} size="small" variant="outlined" />)
                          ) : (
                            <Chip label="Sem secoes vinculadas" size="small" />
                          )}
                        </Stack>
                      </Box>
                      <Stack direction="row" spacing={1}>
                        <Button variant="outlined" onClick={() => openEditDialog(tipo)}>
                          Editar
                        </Button>
                        <Button color="error" variant="text" onClick={() => app?.deleteTipo?.(tipo.id)}>
                          Excluir
                        </Button>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              ))
            )}
          </Stack>

          <Divider sx={{ my: 4 }} />
          <Typography variant="body2" color="text.secondary">
            As outras paginas ainda seguem no layout legado. Posso migrar Secoes e Atributos na mesma base a seguir.
          </Typography>
        </Container>

        <TipoDialog
          open={dialogOpen}
          secoes={secoes}
          initialValue={editingTipo}
          onClose={() => setDialogOpen(false)}
          onSave={handleSave}
          onJumpToSecao={(secaoId) => app?.focusSecao?.(secaoId)}
        />
      </Box>
    </ThemeProvider>
  );
}

const rootElement = document.getElementById('mui-root');
if (rootElement) {
  createRoot(rootElement).render(<App />);
}
