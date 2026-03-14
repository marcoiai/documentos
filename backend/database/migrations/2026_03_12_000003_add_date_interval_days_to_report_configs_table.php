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
            $table->integer('filtro_data_intervalo_dias')->nullable()->after('filtro_data_attr_ate');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('report_configs', function (Blueprint $table) {
            $table->dropColumn('filtro_data_intervalo_dias');
        });
    }
};

