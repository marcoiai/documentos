type CampoTipo =
  | 'texto'
  | 'numero'
  | 'data'
  | 'boolean'
  | 'textarea'
  | 'textarea_template'
  | 'texto_placeholder'
  | 'assinatura'
  | string;

interface Tipo {
  id: string;
  nome: string;
  cabecalho: string;
  rodape: string;
}

interface Secao {
  id: string;
  nome: string;
  cabecalho: string;
  rodape: string;
}

interface Atributo {
  id: string;
  tipoId: string;
  nome: string;
  tipoCampo: CampoTipo;
  secaoId: string;
  validador?: string;
  peso?: number | null;
  mascara?: string;
  templateTexto?: string;
  textoBase?: string;
}

interface Documento {
  id: string;
  titulo: string;
  tipoId: string;
  valores: Record<string, unknown>;
  pdfVisivel: Record<string, boolean>;
}

interface LayoutItem {
  attrId: string;
  colSpan: number;
}

interface AppState {
  tipoCounter: number;
  secaoCounter: number;
  atributoCounter: number;
  documentoCounter: number;
  tipos: Tipo[];
  secoes: Secao[];
  atributos: Atributo[];
  documentos: Documento[];
  layouts: Record<string, LayoutItem[]>;
  layoutSections: Record<string, string[]>;
  tipoSecoes: Record<string, string[]>;
}

interface SectionGroupItem {
  attr: Atributo;
  colSpan: number;
}

interface SectionGroup {
  key: string;
  nome: string;
  items: SectionGroupItem[];
}

interface ValidatorRules {
  hasNumber: boolean;
  hasDate: boolean;
  hasUnique: boolean;
  hasRequired: boolean;
  hasNullable: boolean;
  requiredIfFieldNames: string[];
  max: number | null;
  invalid: string[];
}

interface ValidationError {
  attrId: string;
  summary: string;
  message: string;
}
