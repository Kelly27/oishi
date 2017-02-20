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
<div class="container" style="background-color: white">
    <div class="row">
        <div class="col-sm-9">
            <div class="row">
                @foreach($careers as $career)
                <div class="col-sm-6">
                    <h3 style="color: #EE3433; font-weight: normal; padding-left: 10px"><img src="{{ asset('images/careericon.png') }}" style="padding-right: 15px">{{$career->title}}</h3>
                    <p class="text-justify ">{{$career->description}}</p>
                    <a href="#" style="float: right;">Learn more</a>
                </div>
                @endforeach
            </div>
            <div class="text-right">
                {{$careers->render()}}
            </div>
        </div>
        <div class="col-sm-3">
            <img src="{{asset('images/ads.png')}}">
        </div>
    </div>
</div>

@endsection