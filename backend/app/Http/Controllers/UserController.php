<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller{

    public function display_user(User $user) {
     
        if($user){
            return response()->json([
                'status' => 'success',
                'data' => ['name' => $user->name, 'profile_picture' => $user->profile_picture],
            ]);
        }
        return 'none';
    }

    public function search(){}

    public function user_profile(){}
}
