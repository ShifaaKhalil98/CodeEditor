<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\CodeController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\UserDataController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\AuthController;

Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');

});
// Route::group(['middleware' => 'auth:api'], function(){
    Route::get('/users', [AdminController::class, 'users']);
    Route::get('/getChats', [ChatController::class, 'getChats']);
    Route::get('/getSingleChat/{chat_id}', [ChatController::class, 'getSingleChat']);
    Route::get('/sendMessage/{chat_id}/{content}/{sender_id}', [ChatController::class, 'sendMessage']);
// });


Route::controller(UserDataController::class)->group(function(){
    Route::get('/display_user/{id}','display_user');
    Route::get('/user_profile','user_profile');
    Route::middleware('auth:api')->get('/getfiles', 'getFiles');
});

Route::controller(UsersController::class)->group(function(){
    Route::get('/search','searchUsers');
});

Route::controller(CodeController::class)->group(function () {
    Route::post('/compile', 'compileCode');
});