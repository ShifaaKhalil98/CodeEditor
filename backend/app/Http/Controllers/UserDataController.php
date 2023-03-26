<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Models\File;

class UserDataController extends Controller{

    public function display_user(User $user) {
     
        if($user){
            return response()->json([
                'status' => 'success',
                'name' => $user->name, 
                'profile_picture' => $user->profile_picture,
            ]);
        }
        return 'none';
    }

    public function getFiles(Request $request) {
        $user = $request->user();
        $id = $user->id;

        $files = File::where('user_id', $id)->get();

        return response()->json($files);

    }

    public function user_profile(){}
}
