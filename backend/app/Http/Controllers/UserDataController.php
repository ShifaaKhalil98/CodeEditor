<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\Models\File;

class UserDataController extends Controller{

    public function displayUser() {
     
        $user = auth()->user();

        if($user){
            return response()->json($user);
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
        $file_id = $request->input('id');

        if ($file_id) {
            $file = File::where('id', $file_id)
                    ->update(['content' => $content]);
        } else {
            $file = File::create([
            'user_id' => $id,
            'name' => $name,
            'content' => $content
        ]);
        }

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

function uploadImage(Request $request) {
    $user = Auth::user();

    if ($request->hasFile('image')) {
        
        $file = $request->file('image');
        $fileName = $user->id . '_' . time() . '.' . $file->getClientOriginalExtension();
        $file->storeAs('public/profile-pictures', $fileName);
        $imageUrl = url(Storage::url('public/profile-pictures/' . $fileName));
        $user->profile_picture = $imageUrl;
        $user->save();

        return response()->json(['success' => true, 'message' => 'Profile picture uploaded successfully.']);
    } else {
        return response()->json(['success' => false, 'message' => 'No file uploaded.']);
    }
}

}
