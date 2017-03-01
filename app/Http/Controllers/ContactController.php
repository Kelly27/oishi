<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Session;
use Illuminate\Validation\Factory;
use App\Mailers\AppMailer;
use Illuminate\Support\Facades\Auth;

use App\ContactUs;

class ContactController extends Controller{
    public function show_contact()
    {  
        $info = DB::table('get_in_touches')->where('id', 2)->first();
        return view('pages.contact', compact('info'));
    }

    public function store_message(Request $request, Factory $validator, AppMailer $mailer)
    {
        $validation=$validator->make($request->all(), [
            'name' =>'required',
            'email' =>'required | email',
            'phone' =>'required',
            'subject' =>'required',
            'message' =>'required',
        ]);
        if($validation->fails()){
            return redirect()->back()->withErrors($validation);

        }
        else{
            $message = new ContactUs([
                'name' => $request->input('name'),
                'email' => $request->input('email'),
                'phone' => $request->input('phone'),
                'subject' => $request->input('subject'),
                'message' => $request->input('message')
            ]);
            $message->save();
            $mailer->sendTicketInformation($message);
            Session::flash('message', 'Successfully created message!');
        }

        return redirect()->back();
    }

    public function messages()
    {
        return [
            'email.E-mail' => 'A '/@' is required in the E-mail field.',
        ];
    }
}
