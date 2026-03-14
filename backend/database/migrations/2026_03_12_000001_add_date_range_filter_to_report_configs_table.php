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
        Schema::table('report_configs', function (Blueprint $table) {
            $table->string('filtro_valor_de')->nullable()->after('filtro_valor');
            $table->string('filtro_valor_ate')->nullable()->after('filtro_valor_de');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('report_configs', function (Blueprint $table) {
            $table->dropColumn(['filtro_valor_de', 'filtro_valor_ate']);
        });
    }
};

