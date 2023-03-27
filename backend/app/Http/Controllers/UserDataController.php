<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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

    public function saveFile(Request $request) {
        $id = Auth::user()->id;
        $name = $request->input('name');
        $content = $request->input('content');

        $file = File::create([
            'user_id' => $id,
            'name' => $name,
            'content' => $content
        ]);

        return response()->json($file);
    }

    public function deletefile($id){
        $file = File::find( $id);
        if (!$file){
            return response(['error' => 'file is not found']);
        } 
        $file ->delete();
        return response()->json(['message'=>'File deleted succefully']);
    }
    function uploadImage(Request $request, $id){
        $encoded = $request->encoded;
        $decoded = base64_decode($encoded);
    
        $file_path = public_path('images/'. $id . 'op' . '.png');
    
        file_put_contents($file_path,$decoded);
        $image_url = "http://localhost/images" . $id . ".png";
        User::where("id",$id)->update("profile_picture", $image_url);
        
        return response()->json(['message'=>'success', 'image_url'=>$image_url]);
    }
}
