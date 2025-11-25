<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Unit;
use App\Models\Inovasi;
use App\Models\Feedback;
use Carbon\Carbon;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        // Seed Units
        $units = [
            'PolyPurple email subscription',
            'PolyPurple Contact Form',
            'Hashtog Ocean Signups',
            'PolyPurple Enquiry Form',
            'FormsOcean email subscription'
        ];

        foreach ($units as $unit) {
            Unit::create(['name' => $unit]);
        }

        // Seed Inovasis
        $inovasis = [
            'Inovasi 1',
            'Inovasi 2',
            'Inovasi 3',
            'Inovasi 4',
            'Inovasi 5'
        ];

        foreach ($inovasis as $inovasi) {
            Inovasi::create(['name' => $inovasi]);
        }

        // Seed Feedbacks (Data Dummy)
        $namaList = [
            'Budi Santoso', 'Siti Nurhaliza', 'Ahmad Wijaya', 'Dewi Lestari',
            'Eko Prasetyo', 'Fitri Handayani', 'Gunawan Setiawan', 'Heni Kusuma',
            'Irfan Hakim', 'Joko Widodo', 'Kartika Sari', 'Linda Wijaya',
            'Made Sudarsana', 'Nurul Hidayah', 'Oscar Lawalata', 'Putri Ayu'
        ];

        $manfaatList = [
            'Meningkatkan efisiensi kerja secara signifikan',
            'Memudahkan proses administrasi',
            'Menghemat waktu dan biaya operasional',
            'Meningkatkan akurasi data',
            'Mempercepat pelayanan kepada pelanggan',
            'Sistem lebih user-friendly dan mudah digunakan',
            'Mengurangi kesalahan input data',
            'Membantu monitoring kinerja tim'
        ];

        $kekuranganList = [
            'Masih ada bug di beberapa fitur',
            'Interface kurang intuitif',
            'Perlu training lebih intensif',
            'Loading terkadang lambat',
            'Fitur search kurang akurat',
            'Tidak ada notifikasi otomatis',
            'Belum support mobile',
            'Perlu penambahan fitur export'
        ];

        $masukanList = [
            'Tambahkan fitur notifikasi email',
            'Perbaiki kecepatan loading',
            'Sediakan tutorial video',
            'Tingkatkan keamanan sistem',
            'Tambahkan dashboard monitoring',
            'Buat versi mobile app',
            'Perbaiki tampilan UI/UX',
            'Tambahkan fitur backup otomatis'
        ];

        // Generate 50 feedback dummy dengan berbagai bulan
        for ($i = 0; $i < 50; $i++) {
            $monthAgo = rand(0, 11); // Random bulan dalam 1 tahun
            $createdAt = Carbon::now()->subMonths($monthAgo)->subDays(rand(0, 28));

            Feedback::create([
                'nip' => '2024' . str_pad($i + 1, 4, '0', STR_PAD_LEFT),
                'nama' => $namaList[array_rand($namaList)],
                'unit_id' => rand(1, 5),
                'inovasi_id' => rand(1, 5),
                'lama_inovasi' => rand(1, 12) . ' bulan',
                'manfaat' => $manfaatList[array_rand($manfaatList)],
                'kepuasan_rating' => rand(6, 10),
                'ketidakpuasan_rating' => rand(1, 5),
                'masukan' => $masukanList[array_rand($masukanList)],
                'created_at' => $createdAt,
                'updated_at' => $createdAt,
            ]);
        }

        $this->command->info('✅ Seeding completed!');
        $this->command->info('📊 Created: 5 Units, 5 Inovasis, 50 Feedbacks');
    }
}