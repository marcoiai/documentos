<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AppStateSnapshot;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AppStateController extends Controller
{
    public function show(Request $request): JsonResponse
    {
        $scope = (string) $request->query('scope', 'default');
        $snapshot = AppStateSnapshot::query()
            ->where('scope', $scope)
            ->latest('id')
            ->first();

        if (!$snapshot) {
            return response()->json(['scope' => $scope, 'payload' => null]);
        }

        return response()->json([
            'scope' => $snapshot->scope,
            'payload' => $snapshot->payload,
            'saved_at' => $snapshot->updated_at,
        ]);
    }

    public function upsert(Request $request): JsonResponse
    {
        $data = $request->validate([
            'scope' => ['nullable', 'string', 'max:255'],
            'payload' => ['required', 'array'],
        ]);

        $scope = (string) ($data['scope'] ?? 'default');
        $snapshot = AppStateSnapshot::query()->updateOrCreate(
            ['scope' => $scope],
            ['payload' => $data['payload']]
        );

        return response()->json([
            'ok' => true,
            'scope' => $scope,
            'id' => $snapshot->id,
            'saved_at' => $snapshot->updated_at,
        ]);
    }
}
