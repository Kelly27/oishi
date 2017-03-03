@extends('layouts.layout')

@section('content')
@php
    $data = $news_event;
@endphp
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
