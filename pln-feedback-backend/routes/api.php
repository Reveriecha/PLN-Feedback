<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\FeedbackController;
use App\Http\Controllers\Api\UnitController;
use App\Http\Controllers\Api\InovasiController;
use App\Http\Controllers\Api\AnalyticsController;

Route::middleware('api')->group(function () {
    // Feedback routes
    Route::get('/feedbacks', [FeedbackController::class, 'index']);
    Route::post('/feedbacks', [FeedbackController::class, 'store']);
    Route::get('/feedbacks/{id}', [FeedbackController::class, 'show']);
    Route::delete('/feedbacks/{id}', [FeedbackController::class, 'destroy']);
    
    // Unit routes
    Route::get('/units', [UnitController::class, 'index']);
    Route::post('/units', [UnitController::class, 'store']);
    
    // Inovasi routes
    Route::get('/inovasis', [InovasiController::class, 'index']);
    Route::post('/inovasis', [InovasiController::class, 'store']);
    
    // Analytics routes
    Route::get('/analytics', [AnalyticsController::class, 'index']);
});