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
<div class="container-fluid aboutus-header" style="background-image: url(../images/gallery-header.png)">
    <h1>News Feed</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a aliquet orci. Ut interdum mauris sem, non aliquet felis interdum sit amet.</p>
</div>
<div class="container-fluid" style="background-color: white;">
    <div class="container" style="background-color: white; margin-top: 3%;">
        <div class="row">
            <div class="col-sm-9">
                <div class="row">
                    @foreach($news_feeds as $news_feed)
                    <div class="col-sm-6 nopadding" style="border: solid; border-color: #CCCCCC; margin: 0px 15px 15px; border-width: thin; width: 392px;">
                            <div class="row">
                                <div class="col-sm-3">
                                    <img src="{{asset('images/profilepic.png')}}">
                                </div>
                                <div class="col-sm-5">
                                    <div style="padding-left: 10px">
                                        <h1>name</h1>
                                        <p>Rated Restaurant <i class="fa fa-star" style="color: #F6921E"></i><span>{{$news_feed->rated_restaurant}}</span></p>
                                        <p>Rated Food <i class="fa fa-star" style="color: #F6921E"></i><span>{{$news_feed->rated_food}}</span></p>
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                    <p>2 hours ago</p>
                                </div>
                            </div>
                        <div class="container sig-dish-img nopadding" style="background-image: url(../images/{{$news_feed->image_file}});">
                        </div>
                        <div style="padding-left: 20px">
                            <a href="#">{{$news_feed->food}}</a>
                            <p>{{$news_feed->description}}</p>
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
                    </div>
                    @endforeach
                </div>

                <div class="text-right">
                    {{-- {{$careers->render()}} --}}
                </div>
            </div>
            <div class="col-sm-3">
                <img src="{{asset('images/ads.png')}}">
            </div>
        </div>
    </div>
</div>
@endsection