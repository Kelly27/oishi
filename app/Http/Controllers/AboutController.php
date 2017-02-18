<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Gallery;

class AboutController extends Controller
{
    public function show_gallery()
    {
    	$galleries = DB::table('galleries')->paginate(15);
    	return view('pages.abt.gallery', compact('galleries'));
    }
}
