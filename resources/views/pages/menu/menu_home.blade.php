@extends('layouts.layout')

@section('content')
<div class="container-fluid" style="background-color: white;">
    <div class="container breadcrumb_container">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="{{ route('home') }}">Home</a></li>
          <li class="breadcrumb-item active">Menu</li>
        </ol>
    </div>
</div>
<div class="container-fluid menu1-header hidden-xs" style="margin-bottom: 20px">
    <h1>Menu</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a aliquet orci. Ut interdum mauris sem, non aliquet felis interdum sit amet.</p>
</div>
@include('pages.home.sig_dish')
<div style="margin-bottom: 20px">
	@include('pages.home.menu_category')
</div>
@endsection
