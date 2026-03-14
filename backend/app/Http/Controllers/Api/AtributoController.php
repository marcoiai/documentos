<?php

namespace App\Http\Controllers\Api;

use App\Models\Atributo;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class AtributoController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(Atributo::orderBy('id')->get());
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'external_id' => ['required', 'string', 'max:255', 'unique:atributos,external_id'],
            'tipo_external_id' => ['required', 'string', 'max:255'],
            'secao_external_id' => ['nullable', 'string', 'max:255'],
            'nome' => ['required', 'string', 'max:255'],
            'tipo_campo' => ['required', 'string', 'max:255'],
            'validador' => ['nullable', 'string', 'max:255'],
            'peso' => ['nullable', 'numeric'],
            'mascara' => ['nullable', 'string', 'max:255'],
            'template_texto' => ['nullable', 'string'],
        ]);
        $row = Atributo::create($data);
        return response()->json($row, 201);
    }

    public function show(string $id): JsonResponse
    {
        return response()->json(Atributo::findOrFail($id));
    }

    public function update(Request $request, string $id): JsonResponse
    {
        $row = Atributo::findOrFail($id);
        $data = $request->validate([
            'external_id' => ['sometimes', 'string', 'max:255', 'unique:atributos,external_id,' . $row->id],
            'tipo_external_id' => ['sometimes', 'string', 'max:255'],
            'secao_external_id' => ['nullable', 'string', 'max:255'],
            'nome' => ['sometimes', 'string', 'max:255'],
            'tipo_campo' => ['sometimes', 'string', 'max:255'],
            'validador' => ['nullable', 'string', 'max:255'],
            'peso' => ['nullable', 'numeric'],
            'mascara' => ['nullable', 'string', 'max:255'],
            'template_texto' => ['nullable', 'string'],
        ]);
        $row->update($data);
        return response()->json($row);
    }

    public function destroy(string $id): JsonResponse
    {
        Atributo::findOrFail($id)->delete();
        return response()->json([], 204);
    }
}
