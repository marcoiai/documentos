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
            $table->string('filtro_data_modo')->nullable()->after('filtro_valor_ate');
            $table->string('filtro_data_attr_de')->nullable()->after('filtro_data_modo');
            $table->string('filtro_data_attr_ate')->nullable()->after('filtro_data_attr_de');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('report_configs', function (Blueprint $table) {
            $table->dropColumn(['filtro_data_modo', 'filtro_data_attr_de', 'filtro_data_attr_ate']);
        });
    }
};

