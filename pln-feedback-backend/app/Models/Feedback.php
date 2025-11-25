<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Feedback extends Model
{
    use HasFactory;

    // TAMBAHKAN BARIS INI
    protected $table = 'feedbacks';

    protected $fillable = [
        'nip',
        'nama',
        'unit_id',
        'inovasi_id',
        'lama_inovasi',
        'kepuasan_rating',
        'manfaat',
        'ketidakpuasan_rating',
        'kekurangan',
        'masukan'
    ];

    public function unit()
    {
        return $this->belongsTo(Unit::class);
    }

    public function inovasi()
    {
        return $this->belongsTo(Inovasi::class);
    }
}