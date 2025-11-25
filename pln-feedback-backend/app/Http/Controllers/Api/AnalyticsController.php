<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Feedback;
use Illuminate\Support\Facades\DB;

class AnalyticsController extends Controller
{
    public function index()
    {
        $totalResponses = Feedback::count();
        
        $kepuasanCount = Feedback::where('kepuasan_rating', '>=', 7)->count();
        $ketidakpuasanCount = Feedback::where('ketidakpuasan_rating', '>=', 7)->count();
        
        $kepuasanPercentage = $totalResponses > 0 ? round(($kepuasanCount / $totalResponses) * 100) : 0;
        $ketidakpuasanPercentage = $totalResponses > 0 ? round(($ketidakpuasanCount / $totalResponses) * 100) : 0;
        
        // Monthly responses
        $monthlyResponses = Feedback::select(
            DB::raw('MONTH(created_at) as month'),
            DB::raw('COUNT(*) as count')
        )
        ->whereYear('created_at', date('Y'))
        ->groupBy('month')
        ->orderBy('month')
        ->get();
        
        // Kepuasan vs Ketidakpuasan
        $kepuasanVsKetidakpuasan = [
            'kepuasan' => $kepuasanCount,
            'ketidakpuasan' => $ketidakpuasanCount
        ];
        
        // Rating per inovasi
        $ratingPerInovasi = Feedback::select(
            'inovasis.name',
            DB::raw('AVG(kepuasan_rating) as avg_rating')
        )
        ->join('inovasis', 'feedbacks.inovasi_id', '=', 'inovasis.id')
        ->groupBy('inovasis.id', 'inovasis.name')
        ->orderBy('avg_rating', 'desc')
        ->limit(5)
        ->get();
        
        // Kepuasan per inovasi
        $kepuasanPerInovasi = Feedback::select(
            'inovasis.name',
            DB::raw('COUNT(*) as count')
        )
        ->join('inovasis', 'feedbacks.inovasi_id', '=', 'inovasis.id')
        ->groupBy('inovasis.id', 'inovasis.name')
        ->orderBy('count', 'desc')
        ->limit(5)
        ->get();
        
        // Kepuasan per unit
        $kepuasanPerUnit = Feedback::select(
            'units.name',
            DB::raw('COUNT(*) as count')
        )
        ->join('units', 'feedbacks.unit_id', '=', 'units.id')
        ->groupBy('units.id', 'units.name')
        ->orderBy('count', 'desc')
        ->limit(5)
        ->get();
        
        return response()->json([
            'total_responses' => $totalResponses,
            'kepuasan_percentage' => $kepuasanPercentage,
            'ketidakpuasan_percentage' => $ketidakpuasanPercentage,
            'monthly_responses' => $monthlyResponses,
            'kepuasan_vs_ketidakpuasan' => $kepuasanVsKetidakpuasan,
            'rating_per_inovasi' => $ratingPerInovasi,
            'kepuasan_per_inovasi' => $kepuasanPerInovasi,
            'kepuasan_per_unit' => $kepuasanPerUnit
        ]);
    }
}