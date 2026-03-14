<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Secao extends Model
{
    protected $table = 'secoes';

    protected $fillable = [
        'external_id',
        'nome',
        'cabecalho',
        'rodape',
    ];
}
