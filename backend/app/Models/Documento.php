<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Documento extends Model
{
    protected $fillable = [
        'external_id',
        'tipo_external_id',
        'titulo',
        'valores',
        'pdf_visivel',
    ];

    protected $casts = [
        'valores' => 'array',
        'pdf_visivel' => 'array',
    ];
}
