<?php

use App\Http\Controllers\Api\Auth\ {
    LoginController,
    LogoutController
};
use App\Http\Controllers\Api\MenuController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/menu', [MenuController::class, 'menu']);

Route::post('/login', [LoginController::class, 'login']);
Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function (){
    Route::post('/logout', [LogoutController::class, 'logout']);
});