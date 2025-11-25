<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Feedback;
use Illuminate\Http\Request;

class FeedbackController extends Controller
{
    public function index()
    {
        $feedbacks = Feedback::with(['unit', 'inovasi'])->orderBy('created_at', 'desc')->get();
        return response()->json($feedbacks);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nip' => 'required|string',
            'nama' => 'required|string',
            'unit_id' => 'required|exists:units,id',
            'inovasi_id' => 'required|exists:inovasis,id',
            'lama_inovasi' => 'required|string',
            'kepuasan_rating' => 'required|integer|min:1|max:10',
            'manfaat' => 'nullable|string',
            'ketidakpuasan_rating' => 'required|integer|min:1|max:10',
            'kekurangan' => 'nullable|string',
            'masukan' => 'nullable|string',
        ]);

        $feedback = Feedback::create($validated);
        return response()->json($feedback, 201);
    }

    public function show($id)
    {
        $feedback = Feedback::with(['unit', 'inovasi'])->findOrFail($id);
        return response()->json($feedback);
    }

    public function destroy($id)
    {
        $feedback = Feedback::findOrFail($id);
        $feedback->delete();
        return response()->json(['message' => 'Feedback deleted successfully']);
    }
}