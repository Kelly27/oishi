@extends('layouts.layout')

@section('content')
<div class="container-fluid" style="background-color: white;">
    <div class="container breadcrumb_container">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="#">Home</a></li>
          <li class="breadcrumb-item"><a href="#">About Us</a></li>
          <li class="breadcrumb-item active">News Feed</li>
        </ol>
    </div>
</div>
<div class="container-fluid aboutus-header" style="background-image: url(images/gallery-header.png)">
    <h1>News Feed</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a aliquet orci. Ut interdum mauris sem, non aliquet felis interdum sit amet.</p>
</div>
<div class="container">
    <div class="row">
        <div class="col-sm-9">
            <div class="row">
                @foreach($news_feeds as $news_feed)
                <div class="col-sm-6">
                    <div class="row">
                        <div class="col-sm-3">
                            <img src="{{asset('images/profilepic.png')}}" style="border-radius: 20px; border: solid;"> {{-- user-img --}}
                        </div>
                        <div class="col-sm-5">
                            <h1>{{--username--}}</h1>
                            <p>Rated Restaurant <i class="fa fa-star" style="color: #F6921E"></i><span>5.00</span></p>
                            <p>Rated Food <i class="fa fa-star" style="color: #F6921E"></i><span>5.00</span></p>
                        </div>
                        <div class="col-sm-4">
                            <p>2 hours ago</p>
                        </div>
                    </div>
                    <div class="container sig-dish-img nopadding" style="background-image: url(images/img1.png);">
                    </div>
                    <a href="#">{{$news_feed->food}}</a>
                    <p>Description</p>
                    <div class="row">
                        <div class="col-sm-3">
                            <p>10k</p>
                        </div>
                        <div class="col-sm-3">
                            <p>100</p>
                        </div>
                        <div class="col-sm-3">
                            <a href="#"><i class="fa fa-facebook"></i>Share</a>
                        </div>
                        <div class="col-sm-3">
                            <i class="fa fa-chevron-right"></i>
                        </div>
                    </div>
                </div>
                @endforeach
            </div>

            <div class="text-right">
                {{-- {{$careers->render()}} --}}
            </div>
        </div>
        <div class="col-sm-3">
            <img src="{{asset('images/img5.png')}}">
        </div>
    </div>
</div>

@endsection