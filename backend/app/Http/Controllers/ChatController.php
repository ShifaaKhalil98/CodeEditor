<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Chat;
use App\Models\Message;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller{

    public function chats(){

        // $chats = Auth::user()->chats;
        $chats = Chat::all();
        
        // Return the messages view, passing in the messages variable
        return response()->json(['data' => $chats]);
    }

    public function single_chat(Request $request){
        $chat = Chat::find($request->chat_id);

        $messages = Message::where($request->chat_id)->get();
        return response()->json(['chat' => $chat, 'messages'=>$messages]);

    }

    public function send_message(Request $request, Chat $chat){

       $message = new Message();
        $message->chat_id = $chat->id;
        // $message->user_id = Auth::id();
        $message->content = $request->content;
        $message->save();

        // return response()->json(['status' => 'success']);
        return redirect()->back();
    }
}

