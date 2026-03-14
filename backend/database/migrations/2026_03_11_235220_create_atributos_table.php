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
        Schema::create('atributos', function (Blueprint $table) {
            $table->id();
            $table->string('external_id')->unique();
            $table->string('tipo_external_id')->index();
            $table->string('secao_external_id')->nullable()->index();
            $table->string('nome');
            $table->string('tipo_campo')->default('texto');
            $table->string('validador')->nullable();
            $table->decimal('peso', 14, 4)->nullable();
            $table->string('mascara')->nullable();
            $table->text('template_texto')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('atributos');
    }
};
