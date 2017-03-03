@extends('layouts.layout')

@section('content')
@php
    $data = $career;
@endphp

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