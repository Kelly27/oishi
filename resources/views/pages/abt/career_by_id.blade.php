@extends('layouts.layout')

@section('content')
<div class="container-fluid" style="background-color: white;">
    <div class="container breadcrumb_container">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="{{URL::to('/')}}">Home</a></li>
          <li class="breadcrumb-item">About Us</li>
          <li class="breadcrumb-item active">Career</li>
        </ol>
    </div>
</div>
<div class="container-fluid aboutus-header" style="background-image: url(../../images/career-header.png);">
    <h1>Career</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a aliquet orci. Ut interdum mauris sem, non aliquet felis interdum sit amet.</p>
</div>
<div class="container-fluid" style="background-color: white">
    <div class="container" style="margin-top: 3%;">
        <div class="row">
            <div class="col-sm-9">
                <h3 style="color: #EE3433; font-weight: normal; padding-left: 10px"><img src="{{ asset('images/careericon.png') }}" style="padding-right: 15px">{{$career->title}}</h3>
                <p>{{$career->short_description}}</p>
                <img src="{{asset('images')}}/{{$career->image}}" class="img-responsive">
                <p style="margin-top: 20px;">{{$career->long_description}}</p>
                <p style="color: red; font-weight: bold;">{{$career->contact_info}}</p>
            </div>
            <div class="col-sm-3 hidden-xs">
                @include('pages.abt.ads')
            </div>
        </div>
    </div>
</div>

@endsection