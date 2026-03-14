<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ReportConfig extends Model
{
    protected $fillable = [
        'external_id',
        'nome',
        'tipo_external_id',
        'selected_attr_ids',
        'report_layout',
        'report_block_order',
        'report_block_visibility',
        'report_block_spacer_heights',
        'report_block_images',
        'report_footer_mode',
        'report_footer_anchor',
        'filtro_attr_id',
        'filtro_operador',
        'filtro_valor',
        'filtro_valor_de',
        'filtro_valor_ate',
        'filtro_data_modo',
        'filtro_data_attr_de',
        'filtro_data_attr_ate',
        'filtro_data_intervalo_dias',
        'somar_numericos',
        'total_attr_ids',
        'ordenacao',
        'ordenar_attr_id',
        'ordenar_direcao',
    ];

    protected $casts = [
        'selected_attr_ids' => 'array',
        'report_layout' => 'array',
        'report_block_order' => 'array',
        'report_block_visibility' => 'array',
        'report_block_spacer_heights' => 'array',
        'report_block_images' => 'array',
        'somar_numericos' => 'boolean',
        'total_attr_ids' => 'array',
        'ordenacao' => 'array',
    ];
}
