<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller{

    public function users() {
        // $user = auth()->user();
 
        // if($user){
            $users = User::all();
            foreach ($users as $user) {
                return response()->json([
                    'status' => 'success',
                    'data' => ['name'=>$user->name, 'email'=>$user->email, 'profile_picture'=>$user->profile_picture],
                ]);
            }
        // }
    }

}

 
