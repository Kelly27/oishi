@extends('layouts.layout')

@section('content')
<div class="container-fluid" style="background-color: white;">
    <div class="container breadcrumb_container">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="{{URL::to('/')}}">Home</a></li>
          <li class="breadcrumb-item">About Us</li>
          <li class="breadcrumb-item active">News Feed</li>
        </ol>
    </div>
</div>
<div class="container-fluid aboutus-header hidden-xs" style="background-image: url(<?= asset('images/newsfeed-header.png') ?>)
    <h1>News Feed</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a aliquet orci. Ut interdum mauris sem, non aliquet felis interdum sit amet.</p>
</div>
<div class="container-fluid nopadding news-feed" style="background-color: white;">
<div class="container" style="padding-top: 3%;">
    <div class="row">
        <div class="col-sm-9">
            
        </div>
        <div class="col-sm-3 hidden-xs">
            @include('pages.abt.ads')
        </div>
    </div>
</div>
    

</div>

@endsection
