<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller{

    public function users() {
        // $admin = auth()->user();
 
        // if($admin){

            $users = User::withCount('files')->get();

            $response = [];

            foreach ($users as $user) {
                $response[] = [
                    'status' => 'success',
                    'name' => $user->name,
                    'email' => $user->email,
                    'profile_picture' => $user->profile_picture,
                    'files_count' => $user->files_count,
                ];
            }
            
            return response()->json($response);
    }

    public function getAdmin(){
        $admin = User::where('user_type' ,'admin')->get();

        return response()->json($admin);
    }

}

 
