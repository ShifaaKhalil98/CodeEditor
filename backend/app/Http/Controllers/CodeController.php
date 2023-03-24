<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class CodeController extends Controller{

    public function compileCode(Request $request) {
        $code = $request->input('code');

        $response = Http::post('https://api.anayak.com.np/compile/v2', [
            'LanguageChoice' => '5',
            'Program' => $code
        ]);
        $data = $response->json();

        return response()->json($data);
    }

}
