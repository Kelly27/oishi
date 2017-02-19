@extends('layouts.layout')

@section('content')
<div class="container-fluid" style="background-color: white;">
    <div class="container breadcrumb_container">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="#">Home</a></li>
          <li class="breadcrumb-item active">Menu</li>
        </ol>
    </div>
</div>
@include('pages.home.sig_dish')
@include('pages.home.menu_category')
@endsection
