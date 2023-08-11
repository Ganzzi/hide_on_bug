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
        Schema::create('films', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('stream_service_provider_id');
            $table->foreign('stream_service_provider_id')->references('id')->on('stream_service_providers')->onDelete('cascade');
            $table->string('film_name');
            $table->string('film_poster');
            $table->string('video');
            $table->date('premiere_date')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('films');
    }
};
