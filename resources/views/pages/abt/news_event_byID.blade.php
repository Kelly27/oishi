@extends('layouts.layout')

@section('content')
<div class="container-fluid" style="background-color: white;">
    <div class="container breadcrumb_container">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="#">Home</a></li>
          <li class="breadcrumb-item"><a href="#">About Us</a></li>
          <li class="breadcrumb-item active">News and Events</li>
          <li class="breadcrumb-item active">{{$news_event->title}}</li>
        </ol>
    </div>
</div>
<div class="container-fluid aboutus-header hidden-xs" style="background-image: url(<?= asset('images/newsfeed-header.png')?> )">
    <h1>NEWS AND EVENT</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a aliquet orci. Ut interdum mauris sem, non aliquet felis interdum sit amet.</p>
</div>
<div class="container-fluid nopadding" style="background-color: white;">
    <div class="container text-justify" style="padding: 3%;">
        <div class="text-center" style="margin-bottom: 20px;"">
            <h1>{{$news_event->title}}</h1>
            <p>{{$news_event->created_at}}</p>
        </div>
        <img src="{{ asset('images') }}/{{$news_event->image}}" class="img-responsive" style="float: left; margin: 20px;">
        <p>{{$news_event->long_description}}</p>
    </div>
    

</div>

@endsection
