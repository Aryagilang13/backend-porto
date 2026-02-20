<?php

use App\Http\Controllers\Api\CategoriesController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\MediaController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Api\ProjectsController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Middleware\ApiKey;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('categories', CategoryController::class);
    Route::resource('projects', ProjectController::class);
    Route::prefix('projects/{project}')->group(function () {
        Route::get('/media', [MediaController::class, 'create'])
            ->name('projects.media.create');

        Route::post('/media', [MediaController::class, 'store'])
            ->name('projects.media.store');

        Route::delete('/media/{media}', [MediaController::class, 'destroy'])
            ->name('projects.media.destroy');
    });
});

require __DIR__ . '/auth.php';
