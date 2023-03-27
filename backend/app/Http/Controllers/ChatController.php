<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Chat;
use App\Models\Message;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ChatController extends Controller{

    public function getChats(){

        $sender_id = auth()->user()->id;

        $chats = Chat::with(['user'])->where('sender_id', $sender_id)->get();
            
        return response()->json($chats);
    }
    
    public function getSingleChat(Request $request){
        
        $chat_id = $request->chat_id;
        $chat = Chat::find($chat_id);
        $receiver_id = $chat->receiver_id;
        $receiver = User::find($receiver_id);

        $messages = Message::with(['chat'])->where('chat_id', $chat_id)->get();

        return response()->json($messages);
    }

    public function getReceiver(Request $request){

        $chat_id = $request->chat_id;
        $chat = Chat::find($chat_id);
        $receiver_id = $chat->receiver_id;
        $receiver = User::where('id', $receiver_id)->first();

        return response()->json($receiver);
    } 
    
    public function sendMessage(Request $request){
        $validator = Validator::make($request->all(), [
            'chat_id' => 'required',
            'content' => 'required',
        ]);
    
        if ($validator->fails()) {
            return response()->json(['status' => 'error', 'message' => $validator->errors()]);
        }
    
        $message = new Message();
        $message->chat_id = $request->chat_id;
        $message->sender_id = Auth::id();
        $message->content = $request->content;
    
        if (!$message->save()) {
            return response()->json(['status' => 'error', 'message' => 'Failed to save message.']);
        }
    
        return response()->json(['status' => 'success', 'message' => $message]);
    }
    
}