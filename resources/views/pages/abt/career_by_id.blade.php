@extends('layouts.layout')

@section('content')
<div class="container-fluid" style="background-color: white;">
    <div class="container breadcrumb_container">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="#">Home</a></li>
          <li class="breadcrumb-item"><a href="#">About Us</a></li>
          <li class="breadcrumb-item active">Career</li>
        </ol>
    </div>
</div>
<div class="container-fluid aboutus-header" style="background-image: url(../images/career-header.png); background-position-y: -780px;">
    <h1>Career</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a aliquet orci. Ut interdum mauris sem, non aliquet felis interdum sit amet.</p>
</div>
<div class="container-fluid" style="background-color: white">
    <div class="container">
        <h3 style="color: #EE3433; font-weight: normal; padding-left: 10px"><img src="{{ asset('images/careericon.png') }}" style="padding-right: 15px">{{$career->title}}</h3>
        <p>{{$career->short_description}}</p>
        <img src="{{asset('images')}}/{{$career->career_image}}">
        <p>{{$career->long_description}}</p>
        <p style="color: red">Interested candidates can email to XXX@gmail.com or called to 032-345678 (Mr. Lim). </p>
    </div>
</div>

@endsection