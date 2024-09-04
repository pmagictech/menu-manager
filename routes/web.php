<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\MenuController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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
    Route::post('/menu/update', [MenuController::class, 'update'])->name('menu.update');
    Route::get('api/menu/{id}', [MenuController::class, 'get'])->name('menu.get');
    Route::get('/menu/{menuId}', function () {
        return Inertia::render('Dashboard', [
            'menuId' => Route::current()->parameter('menuId'),
        ]);
    })->name('menu');
    Route::delete('/menu/update', [MenuController::class, 'destroy'])->name('menu.destroy');
});

require __DIR__.'/auth.php';
