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
        Schema::create('watch_list_films', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('watch_list_id');
            $table->foreign('watch_list_id')->references('id')->on('watch_lists')->onDelete('cascade');
            $table->unsignedBigInteger('film_id');
            $table->foreign('film_id')->references('id')->on('films')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('watch_list_films');
    }
};
