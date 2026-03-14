<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DocumentoTipo extends Model
{
    protected $fillable = [
        'external_id',
        'nome',
        'cabecalho',
        'rodape',
    ];
}
