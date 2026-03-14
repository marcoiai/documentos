<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Layout extends Model
{
    protected $fillable = [
        'tipo_external_id',
        'items',
        'section_order',
    ];

    protected $casts = [
        'items' => 'array',
        'section_order' => 'array',
    ];
}
