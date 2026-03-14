<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AppStateSnapshot extends Model
{
    protected $fillable = [
        'scope',
        'payload',
    ];

    protected $casts = [
        'payload' => 'array',
    ];
}
