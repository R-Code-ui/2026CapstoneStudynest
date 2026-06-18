<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Principal\DashboardController;

Route::inertia('/', 'welcome')->name('home');

// Generic fallback dashboard (rarely hit, but keeps Breeze's default route alive)
Route::middleware(['auth'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

// ========== PRINCIPAL ==========
Route::middleware(['auth', 'role:principal'])
    ->prefix('principal')
    ->name('principal.')
    ->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    });

// ========== TEACHER ==========
Route::middleware(['auth', 'role:teacher'])
    ->prefix('teacher')
    ->name('teacher.')
    ->group(function () {
        Route::inertia('/dashboard', 'teacher/dashboard')->name('dashboard');
    });

// ========== STUDENT ==========
Route::middleware(['auth', 'role:student'])
    ->prefix('student')
    ->name('student.')
    ->group(function () {
        Route::inertia('/dashboard', 'student/dashboard')->name('dashboard');
    });

require __DIR__.'/settings.php';
