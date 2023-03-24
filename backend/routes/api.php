<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\CodeController;
use App\Http\Controllers\ChatController;

// Route::group(['middleware' => 'auth:api'], function(){
    Route::get('/users', [AdminController::class, 'users']);
    Route::get('/chats', [ChatController::class, 'chats']);
    Route::get('/single_chat', [ChatController::class, 'single_chat']);
// });

Route::controller(CodeController::class)->group(function () {
    Route::post('/compile', 'compileCode');
});