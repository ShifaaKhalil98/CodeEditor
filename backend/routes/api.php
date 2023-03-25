<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\CodeController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\UserController;

// Route::group(['middleware' => 'auth:api'], function(){
    Route::get('/users', [AdminController::class, 'users']);
    Route::get('/chats', [ChatController::class, 'chats']);
    Route::get('/single_chat', [ChatController::class, 'single_chat']);
// });

Route::controller(UserController::class)->group(function(){
    Route::get('/display_user/{id}','display_user');
    Route::get('/search','search');
    Route::get('/user_profile','user_profile');

});

Route::controller(CodeController::class)->group(function () {
    Route::post('/compile', 'compileCode');
});