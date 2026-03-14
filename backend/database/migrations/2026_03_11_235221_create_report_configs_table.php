<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('report_configs', function (Blueprint $table) {
            $table->id();
            $table->string('external_id')->unique();
            $table->string('nome');
            $table->string('tipo_external_id')->index();
            $table->json('selected_attr_ids')->nullable();
            $table->json('report_layout')->nullable();
            $table->json('report_block_order')->nullable();
            $table->json('report_block_visibility')->nullable();
            $table->string('report_footer_mode')->nullable();
            $table->string('report_footer_anchor')->nullable();
            $table->string('filtro_attr_id')->nullable();
            $table->string('filtro_operador')->nullable();
            $table->text('filtro_valor')->nullable();
            $table->boolean('somar_numericos')->default(false);
            $table->json('total_attr_ids')->nullable();
            $table->json('ordenacao')->nullable();
            $table->string('ordenar_attr_id')->nullable();
            $table->string('ordenar_direcao')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('report_configs');
    }
};
