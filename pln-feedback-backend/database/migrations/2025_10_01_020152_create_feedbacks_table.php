<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('feedbacks', function (Blueprint $table) {
            $table->id();
            $table->string('nip');
            $table->string('nama');
            $table->foreignId('unit_id')->constrained()->onDelete('cascade');
            $table->foreignId('inovasi_id')->constrained()->onDelete('cascade');
            $table->text('lama_inovasi');
            $table->integer('kepuasan_rating')->default(0);
            $table->text('manfaat')->nullable();
            $table->integer('ketidakpuasan_rating')->default(0);
            $table->text('kekurangan')->nullable();
            $table->text('masukan')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('feedbacks');
    }
};