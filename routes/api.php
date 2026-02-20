<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoriesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProjectsController;
use App\Http\Middleware\ApiKey;

Route::middleware(ApiKey::class)->group(function () {
    Route::get('/projects', [ProjectsController::class, 'index']);
    Route::get('/projects/{slug}', [ProjectsController::class, 'show']);
    Route::get('/projects/category/{slug}', [ProjectsController::class, 'filterByCategory']);
    Route::get('/projects/keypoint/{keypoint}', [ProjectsController::class, 'filterByKeypoint']);

    Route::get('/categories', [CategoriesController::class, 'index']);
    Route::get('/categories/{slug}', [CategoriesController::class, 'show']);
});

// Route::post('/login', [AuthController::class, 'login']);

// Route::middleware('auth:sanctum')->group(function () {
//     Route::post('/logout', [AuthController::class, 'logout']);
//     Route::get('/projects', [ProjectsController::class, 'index']);
// });
