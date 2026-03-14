<?php

namespace App\Http\Controllers\Api;

use App\Models\ReportConfig;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ReportConfigController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(ReportConfig::orderBy('id')->get());
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'external_id' => ['required', 'string', 'max:255', 'unique:report_configs,external_id'],
            'nome' => ['required', 'string', 'max:255'],
            'tipo_external_id' => ['required', 'string', 'max:255'],
            'selected_attr_ids' => ['nullable', 'array'],
            'report_layout' => ['nullable', 'array'],
            'report_block_order' => ['nullable', 'array'],
            'report_block_visibility' => ['nullable', 'array'],
            'report_block_spacer_heights' => ['nullable', 'array'],
            'report_block_images' => ['nullable', 'array'],
            'report_footer_mode' => ['nullable', 'string', 'max:255'],
            'report_footer_anchor' => ['nullable', 'string', 'max:255'],
            'filtro_attr_id' => ['nullable', 'string', 'max:255'],
            'filtro_operador' => ['nullable', 'string', 'max:255'],
            'filtro_valor' => ['nullable', 'string'],
            'filtro_valor_de' => ['nullable', 'date'],
            'filtro_valor_ate' => ['nullable', 'date'],
            'filtro_data_modo' => ['nullable', 'string', 'max:20'],
            'filtro_data_attr_de' => ['nullable', 'string', 'max:255'],
            'filtro_data_attr_ate' => ['nullable', 'string', 'max:255'],
            'filtro_data_intervalo_dias' => ['nullable', 'integer', 'min:0'],
            'somar_numericos' => ['nullable', 'boolean'],
            'total_attr_ids' => ['nullable', 'array'],
            'ordenacao' => ['nullable', 'array'],
            'ordenar_attr_id' => ['nullable', 'string', 'max:255'],
            'ordenar_direcao' => ['nullable', 'string', 'max:255'],
        ]);

        $row = ReportConfig::create($data);
        return response()->json($row, 201);
    }

    public function show(string $id): JsonResponse
    {
        return response()->json(ReportConfig::findOrFail($id));
    }

    public function update(Request $request, string $id): JsonResponse
    {
        $row = ReportConfig::findOrFail($id);
        $data = $request->validate([
            'external_id' => ['sometimes', 'string', 'max:255', 'unique:report_configs,external_id,' . $row->id],
            'nome' => ['sometimes', 'string', 'max:255'],
            'tipo_external_id' => ['sometimes', 'string', 'max:255'],
            'selected_attr_ids' => ['nullable', 'array'],
            'report_layout' => ['nullable', 'array'],
            'report_block_order' => ['nullable', 'array'],
            'report_block_visibility' => ['nullable', 'array'],
            'report_block_spacer_heights' => ['nullable', 'array'],
            'report_block_images' => ['nullable', 'array'],
            'report_footer_mode' => ['nullable', 'string', 'max:255'],
            'report_footer_anchor' => ['nullable', 'string', 'max:255'],
            'filtro_attr_id' => ['nullable', 'string', 'max:255'],
            'filtro_operador' => ['nullable', 'string', 'max:255'],
            'filtro_valor' => ['nullable', 'string'],
            'filtro_valor_de' => ['nullable', 'date'],
            'filtro_valor_ate' => ['nullable', 'date'],
            'filtro_data_modo' => ['nullable', 'string', 'max:20'],
            'filtro_data_attr_de' => ['nullable', 'string', 'max:255'],
            'filtro_data_attr_ate' => ['nullable', 'string', 'max:255'],
            'filtro_data_intervalo_dias' => ['nullable', 'integer', 'min:0'],
            'somar_numericos' => ['nullable', 'boolean'],
            'total_attr_ids' => ['nullable', 'array'],
            'ordenacao' => ['nullable', 'array'],
            'ordenar_attr_id' => ['nullable', 'string', 'max:255'],
            'ordenar_direcao' => ['nullable', 'string', 'max:255'],
        ]);

        $row->update($data);
        return response()->json($row);
    }

    public function destroy(string $id): JsonResponse
    {
        ReportConfig::findOrFail($id)->delete();
        return response()->json([], 204);
    }
}
