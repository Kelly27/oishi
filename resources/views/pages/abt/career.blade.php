@extends('layouts.layout')

@section('content')
<div class="container-fluid" style="background-color: white;">
    <div class="container breadcrumb_container">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="{{URL::to('/')}}">Home</a></li>
          <li class="breadcrumb-item active">About Us</li>
          <li class="breadcrumb-item active">Career</li>
        </ol>
    </div>
</div>
<div class="container-fluid aboutus-header" style="background-image: url(../images/career-header.png); background-position-y: center;">
    <h1>Career</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a aliquet orci. Ut interdum mauris sem, non aliquet felis interdum sit amet.</p>
</div>
<div class="container-fluid" style="background-color: white">
    <div class="container" style="margin-top: 2%">
        <div class="row">
            <div class="col-sm-9">
                @if($careers->count()===0)
                    <h1 class="alert alert-danger">CURRENTLY THERE IS NO CAREER AVAILABLE.</h1>
                @else
                <div class="row">
                    @foreach($careers as $career)
                    <div class="col-sm-6" style="padding: 10px">
                        <a href="{{ url('about/career/'. $career->id) }}" style="color: #EE3433; font-weight: normal; padding-left: 10px; font-size: large;"><img src="{{ asset('images/careericon.png') }}" style="padding-right: 15px">{{$career->title}}</a>
                        <p class="text-justify" style="margin: 10px 0px 20px 0px; overflow: hidden;display: -webkit-box;-webkit-line-clamp: 4;-webkit-box-orient: vertical; color:initial;">{{$career->short_description}}</p>
                        <a href="#" style="float: right;">Learn more</a>
                    </div>
                    @endforeach
                </div>
                <div class="text-right">
                    {{$careers->render()}}
                </div>
                @endif
            </div>
            <div class="col-sm-3 hidden-xs">
                @include('pages.abt.ads')
            </div>
        </div>
    </div>
</div>


@endsection