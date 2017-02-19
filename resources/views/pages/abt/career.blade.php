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
<div class="container-fluid aboutus-header" style="background-image: url(images/gallery-header.png)">
    <h1>Career</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a aliquet orci. Ut interdum mauris sem, non aliquet felis interdum sit amet.</p>
</div>
<div class="container">
    <div class="row">
        <div class="col-sm-9">
            <div class="row">
                @foreach($careers as $career)
                <div class="col-sm-6">
                    {{-- <img>  --}}
                    <h1>{{$career->title}}</h1>
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
            <img src="{{asset('images/img5.png')}}">
        </div>
    </div>
</div>

@endsection