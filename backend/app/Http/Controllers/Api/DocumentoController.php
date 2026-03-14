<?php

namespace App\Http\Controllers\Api;

use App\Models\Documento;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class DocumentoController extends Controller
{
    private function normalizeDocumentoPayload(Request $request): array
    {
        $doc = $request->input('documento');
        if (is_array($doc)) {
            return [
                'external_id' => $doc['id'] ?? null,
                'tipo_external_id' => $doc['tipoId'] ?? null,
                'titulo' => $doc['titulo'] ?? null,
                'valores' => $doc['valores'] ?? null,
                'pdf_visivel' => $doc['pdfVisivel'] ?? null,
            ];
        }

        return [
            'external_id' => $request->input('external_id'),
            'tipo_external_id' => $request->input('tipo_external_id'),
            'titulo' => $request->input('titulo'),
            'valores' => $request->input('valores'),
            'pdf_visivel' => $request->input('pdf_visivel'),
        ];
    }

    public function index(): JsonResponse
    {
        return response()->json(Documento::orderBy('id')->get());
    }

    public function store(Request $request): JsonResponse
    {
        $data = validator($this->normalizeDocumentoPayload($request), [
            'external_id' => ['required', 'string', 'max:255'],
            'tipo_external_id' => ['required', 'string', 'max:255'],
            'titulo' => ['required', 'string', 'max:255'],
            'valores' => ['required', 'array'],
            'pdf_visivel' => ['nullable', 'array'],
        ])->validate();

        $row = Documento::updateOrCreate(
            ['external_id' => $data['external_id']],
            $data
        );

        return response()->json($row, $row->wasRecentlyCreated ? 201 : 200);
    }

    public function show(string $id): JsonResponse
    {
        return response()->json(Documento::findOrFail($id));
    }

    public function update(Request $request, string $id): JsonResponse
    {
        $row = Documento::findOrFail($id);
        $normalized = array_filter(
            $this->normalizeDocumentoPayload($request),
            static fn ($v) => $v !== null
        );
        $data = validator($normalized, [
            'external_id' => ['sometimes', 'string', 'max:255', 'unique:documentos,external_id,' . $row->id],
            'tipo_external_id' => ['sometimes', 'string', 'max:255'],
            'titulo' => ['sometimes', 'string', 'max:255'],
            'valores' => ['sometimes', 'array'],
            'pdf_visivel' => ['nullable', 'array'],
        ])->validate();
        $row->update($data);
        return response()->json($row);
    }

    public function destroy(string $id): JsonResponse
    {
        Documento::findOrFail($id)->delete();
        return response()->json([], 204);
    }
}
