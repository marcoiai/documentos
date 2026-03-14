<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Atributo extends Model
{
    protected $fillable = [
        'external_id',
        'tipo_external_id',
        'secao_external_id',
        'nome',
        'tipo_campo',
        'validador',
        'peso',
        'mascara',
        'template_texto',
    ];
}
