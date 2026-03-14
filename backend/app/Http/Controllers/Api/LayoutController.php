<?php

namespace App\Http\Controllers\Api;

use App\Models\Layout;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class LayoutController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(Layout::orderBy('id')->get());
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'tipo_external_id' => ['required', 'string', 'max:255', 'unique:layouts,tipo_external_id'],
            'items' => ['nullable', 'array'],
            'section_order' => ['nullable', 'array'],
        ]);
        $row = Layout::create($data);
        return response()->json($row, 201);
    }

    public function show(string $id): JsonResponse
    {
        return response()->json(Layout::findOrFail($id));
    }

    public function update(Request $request, string $id): JsonResponse
    {
        $row = Layout::findOrFail($id);
        $data = $request->validate([
            'tipo_external_id' => ['sometimes', 'string', 'max:255', 'unique:layouts,tipo_external_id,' . $row->id],
            'items' => ['nullable', 'array'],
            'section_order' => ['nullable', 'array'],
        ]);
        $row->update($data);
        return response()->json($row);
    }

    public function destroy(string $id): JsonResponse
    {
        Layout::findOrFail($id)->delete();
        return response()->json([], 204);
    }
}
