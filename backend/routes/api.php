<?php

use App\Http\Controllers\Api\AppStateController;
use App\Http\Controllers\Api\AppDataController;
use App\Http\Controllers\Api\AtributoController;
use App\Http\Controllers\Api\DocumentoController;
use App\Http\Controllers\Api\DocumentoTipoController;
use App\Http\Controllers\Api\LayoutController;
use App\Http\Controllers\Api\ReportConfigController;
use App\Http\Controllers\Api\SecaoController;
use Illuminate\Support\Facades\Route;

Route::get('/bootstrap', [AppDataController::class, 'index']);
Route::post('/bootstrap', [AppDataController::class, 'store']);
Route::get('/state', [AppStateController::class, 'show']);
Route::put('/state', [AppStateController::class, 'upsert']);

Route::apiResource('tipos', DocumentoTipoController::class);
Route::apiResource('secoes', SecaoController::class);
Route::apiResource('atributos', AtributoController::class);
Route::apiResource('documentos', DocumentoController::class);
Route::apiResource('layouts', LayoutController::class);
Route::apiResource('report-configs', ReportConfigController::class);
