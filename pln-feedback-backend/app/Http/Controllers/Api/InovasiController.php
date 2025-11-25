<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Inovasi;
use Illuminate\Http\Request;

class InovasiController extends Controller
{
    public function index()
    {
        $inovasis = Inovasi::all();
        return response()->json($inovasis);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|unique:inovasis,name',
        ]);

        $inovasi = Inovasi::create($validated);
        return response()->json($inovasi, 201);
    }
}