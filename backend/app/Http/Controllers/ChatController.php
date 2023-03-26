<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Chat;
use App\Models\Message;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller{

    public function getChats(){

        $sender_id = 4;
        // $sender_id = auth()->user()->id;

        $chats = Chat::with(['user'])->where('sender_id', $sender_id)->get();
            
            return response()->json($chats);
    }
    
    public function getSingleChat(Request $request){
        
        $chat_id = $request->chat_id;
        $chat = Chat::find($chat_id);
        $receiver_id = $chat->receiver_id;
        $receiver = User::find($receiver_id);

        $messages = Message::with(['chat'])->where('chat_id', $chat_id)->get();

        // $response = [
        //     'receiver'=> $receiver,
        //     'messages'=> $messages,
        // ];


        // $receiver = User::with(['chat'])->where('id', $receiver_id)->get();

        return response()->json($messages);
    }

    public function getReceiver(){

        $chat_id = 5;
        $chat = Chat::find($chat_id);
        $receiver_id = $chat->receiver_id;
        $receiver = User::where('id', $receiver_id)->first();

        return response()->json($receiver);
    } 
    
    public function sendMessage(Request $request){

        $message = new Message();
        $message->chat_id = $request->chat_id;;
        $message->sender_id = $request->sender_id;
        // $message->sender_id = Auth::id();
        $message->content = $request->content;
        $message->save();

        // return response()->json(['status' => 'success']);
        return redirect()->back();
    }
}













// public function getConvo(Request $request)
// {
    
//     $user = $request->user();
//     $id = $user->id;
//     $newconvo = null;

//     if($request->query('convo_id') == null) {
//         $target_user = $request->query('target_user');
//         $convo = Conversation::where('user_one_id', $id)->where('user_two_id', $target_user)->first();
//         if($convo) {
//             $convo_id = $convo->id;
//             $messages = Message::with('User')->where('conversation_id', $convo_id)->orderBy('created_at', 'ASC')->get();
//             $newconvo = $convo;
//         } else {
//             $messages = [];
//             $newconvo = Conversation::Create([
//                 'user_one_id' => $id,
//                 'user_two_id' => $target_user
//             ]);
//         };
//         return response()->json([
//             'messages' => $messages,
//             'convo_id' => $newconvo->id
//         ]);
//     } else {
//         $convo_id = $request->query('convo_id');
//         $messages = Message::with('User')->where('conversation_id', $convo_id)->orderBy('created_at', 'ASC')->get();
//         return response()->json([
//             'messages' => $messages
//         ]);
//     }
// }