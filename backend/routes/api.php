<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group(['middleware' => 'auth:api'], function(){
    Route::get('/users', [AdminController::class, 'get_users']);
});

