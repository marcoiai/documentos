<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Atributo;
use App\Models\Documento;
use App\Models\DocumentoTipo;
use App\Models\Layout;
use App\Models\ReportConfig;
use App\Models\Secao;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AppDataController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json([
            'tipos' => DocumentoTipo::orderBy('id')->get(),
            'secoes' => Secao::orderBy('id')->get(),
            'atributos' => Atributo::orderBy('id')->get(),
            'documentos' => Documento::orderBy('id')->get(),
            'layouts' => Layout::orderBy('id')->get(),
            'report_configs' => ReportConfig::orderBy('id')->get(),
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'tipos' => ['nullable', 'array'],
            'secoes' => ['nullable', 'array'],
            'atributos' => ['nullable', 'array'],
            'documentos' => ['nullable', 'array'],
            'layouts' => ['nullable', 'array'],
            'report_configs' => ['nullable', 'array'],
        ]);

        DB::transaction(function () use ($data) {
            DocumentoTipo::query()->delete();
            Secao::query()->delete();
            Atributo::query()->delete();
            Documento::query()->delete();
            Layout::query()->delete();
            ReportConfig::query()->delete();

            foreach ($data['tipos'] ?? [] as $row) {
                DocumentoTipo::create([
                    'external_id' => (string) ($row['external_id'] ?? ''),
                    'nome' => (string) ($row['nome'] ?? ''),
                    'cabecalho' => (string) ($row['cabecalho'] ?? ''),
                    'rodape' => (string) ($row['rodape'] ?? ''),
                ]);
            }

            foreach ($data['secoes'] ?? [] as $row) {
                Secao::create([
                    'external_id' => (string) ($row['external_id'] ?? ''),
                    'nome' => (string) ($row['nome'] ?? ''),
                    'cabecalho' => (string) ($row['cabecalho'] ?? ''),
                    'rodape' => (string) ($row['rodape'] ?? ''),
                ]);
            }

            foreach ($data['atributos'] ?? [] as $row) {
                Atributo::create([
                    'external_id' => (string) ($row['external_id'] ?? ''),
                    'tipo_external_id' => (string) ($row['tipo_external_id'] ?? ''),
                    'secao_external_id' => isset($row['secao_external_id']) ? (string) $row['secao_external_id'] : null,
                    'nome' => (string) ($row['nome'] ?? ''),
                    'tipo_campo' => (string) ($row['tipo_campo'] ?? 'texto'),
                    'validador' => isset($row['validador']) ? (string) $row['validador'] : null,
                    'peso' => isset($row['peso']) ? (float) $row['peso'] : null,
                    'mascara' => isset($row['mascara']) ? (string) $row['mascara'] : null,
                    'template_texto' => isset($row['template_texto']) ? (string) $row['template_texto'] : null,
                ]);
            }

            foreach ($data['documentos'] ?? [] as $row) {
                Documento::create([
                    'external_id' => (string) ($row['external_id'] ?? ''),
                    'tipo_external_id' => (string) ($row['tipo_external_id'] ?? ''),
                    'titulo' => (string) ($row['titulo'] ?? ''),
                    'valores' => is_array($row['valores'] ?? null) ? $row['valores'] : [],
                    'pdf_visivel' => is_array($row['pdf_visivel'] ?? null) ? $row['pdf_visivel'] : [],
                ]);
            }

            foreach ($data['layouts'] ?? [] as $row) {
                Layout::create([
                    'tipo_external_id' => (string) ($row['tipo_external_id'] ?? ''),
                    'items' => is_array($row['items'] ?? null) ? $row['items'] : [],
                    'section_order' => is_array($row['section_order'] ?? null) ? $row['section_order'] : [],
                ]);
            }

            foreach ($data['report_configs'] ?? [] as $row) {
                ReportConfig::create([
                    'external_id' => (string) ($row['external_id'] ?? ''),
                    'nome' => (string) ($row['nome'] ?? ''),
                    'tipo_external_id' => (string) ($row['tipo_external_id'] ?? ''),
                    'selected_attr_ids' => is_array($row['selected_attr_ids'] ?? null) ? $row['selected_attr_ids'] : [],
                    'report_layout' => is_array($row['report_layout'] ?? null) ? $row['report_layout'] : [],
                    'report_block_order' => is_array($row['report_block_order'] ?? null) ? $row['report_block_order'] : [],
                    'report_block_visibility' => is_array($row['report_block_visibility'] ?? null) ? $row['report_block_visibility'] : [],
                    'report_block_spacer_heights' => is_array($row['report_block_spacer_heights'] ?? null) ? $row['report_block_spacer_heights'] : [],
                    'report_block_images' => is_array($row['report_block_images'] ?? null) ? $row['report_block_images'] : [],
                    'report_footer_mode' => isset($row['report_footer_mode']) ? (string) $row['report_footer_mode'] : null,
                    'report_footer_anchor' => isset($row['report_footer_anchor']) ? (string) $row['report_footer_anchor'] : null,
                    'filtro_attr_id' => isset($row['filtro_attr_id']) ? (string) $row['filtro_attr_id'] : null,
                    'filtro_operador' => isset($row['filtro_operador']) ? (string) $row['filtro_operador'] : null,
                    'filtro_valor' => isset($row['filtro_valor']) ? (string) $row['filtro_valor'] : null,
                    'filtro_valor_de' => isset($row['filtro_valor_de']) ? (string) $row['filtro_valor_de'] : null,
                    'filtro_valor_ate' => isset($row['filtro_valor_ate']) ? (string) $row['filtro_valor_ate'] : null,
                    'filtro_data_modo' => isset($row['filtro_data_modo']) ? (string) $row['filtro_data_modo'] : null,
                    'filtro_data_attr_de' => isset($row['filtro_data_attr_de']) ? (string) $row['filtro_data_attr_de'] : null,
                    'filtro_data_attr_ate' => isset($row['filtro_data_attr_ate']) ? (string) $row['filtro_data_attr_ate'] : null,
                    'filtro_data_intervalo_dias' => isset($row['filtro_data_intervalo_dias']) ? (int) $row['filtro_data_intervalo_dias'] : null,
                    'somar_numericos' => (bool) ($row['somar_numericos'] ?? false),
                    'total_attr_ids' => is_array($row['total_attr_ids'] ?? null) ? $row['total_attr_ids'] : [],
                    'ordenacao' => is_array($row['ordenacao'] ?? null) ? $row['ordenacao'] : [],
                    'ordenar_attr_id' => isset($row['ordenar_attr_id']) ? (string) $row['ordenar_attr_id'] : null,
                    'ordenar_direcao' => isset($row['ordenar_direcao']) ? (string) $row['ordenar_direcao'] : null,
                ]);
            }
        });

        return response()->json(['ok' => true], 201);
    }
}
