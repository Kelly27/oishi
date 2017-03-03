@extends('layouts.layout')

@section('content')
<div style="margin-top: 20px;">
	@include('pages.home.sig_dish')
</div>
<div style="margin-bottom: 20px">
	@include('pages.home.menu_category')
</div>
@endsection
