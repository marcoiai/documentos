<?php

namespace App\Http\Controllers\Api;

use App\Models\DocumentoTipo;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class DocumentoTipoController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(DocumentoTipo::orderBy('id')->get());
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'external_id' => ['required', 'string', 'max:255', 'unique:documento_tipos,external_id'],
            'nome' => ['required', 'string', 'max:255'],
            'cabecalho' => ['nullable', 'string'],
            'rodape' => ['nullable', 'string'],
        ]);

        $row = DocumentoTipo::create([
            ...$data,
            'cabecalho' => $data['cabecalho'] ?? '',
            'rodape' => $data['rodape'] ?? '',
        ]);

        return response()->json($row, 201);
    }

    public function show(string $id): JsonResponse
    {
        return response()->json(DocumentoTipo::findOrFail($id));
    }

    public function update(Request $request, string $id): JsonResponse
    {
        $row = DocumentoTipo::findOrFail($id);

        $data = $request->validate([
            'external_id' => ['sometimes', 'string', 'max:255', 'unique:documento_tipos,external_id,' . $row->id],
            'nome' => ['sometimes', 'string', 'max:255'],
            'cabecalho' => ['nullable', 'string'],
            'rodape' => ['nullable', 'string'],
        ]);

        $row->update($data);
        return response()->json($row);
    }

    public function destroy(string $id): JsonResponse
    {
        DocumentoTipo::findOrFail($id)->delete();
        return response()->json(status: 204);
    }
}
