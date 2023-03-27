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

Route::controller(AdminController::class)->group(function(){
    Route::middleware('auth:api')->get('/users', [AdminController::class, 'users']);
    Route::middleware('auth:api')->get('/getAdmin', [AdminController::class, 'getAdmin']);
});

Route::controller(ChatController::class)->group(function(){
    Route::middleware('auth:api')->get('/getChats', [ChatController::class, 'getChats']);
    Route::middleware('auth:api')->get('/getSingleChat/{chat_id}', [ChatController::class, 'getSingleChat']);
    Route::middleware('auth:api')->get('/getReceiver/{chat_id}', [ChatController::class, 'getReceiver']);
    Route::middleware('auth:api')->post('/sendMessage', [ChatController::class, 'sendMessage']);
});

Route::controller(UserDataController::class)->group(function(){
    Route::get('/display_user/{id}','display_user');
    Route::middleware('auth:api')->get('/user_profile','user_profile');
    Route::middleware('auth:api')->get('/getfiles', 'getFiles');
    Route::middleware('auth:api')->post('/savefile', 'saveFile');
    Route::middleware('auth:api')->delete('/deletefile', 'deletefile');
    Route::middleware('auth:api')->post('/uploadImage', 'uploadImage');
});

Route::controller(UsersController::class)->group(function(){
    Route::get('/search','searchUsers');
});

Route::controller(CodeController::class)->group(function () {
    Route::post('/compile', 'compileCode');
});