<? use Carbon\Carbon; ?>

@extends('layouts.layout')

@section('content')
<div class="container-fluid" style="background-color: white;">
    <div class="container breadcrumb_container">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="{{URL::to('/')}}">Home</a></li>
          <li class="breadcrumb-item active">About Us</li>
          <li class="breadcrumb-item active">News Feed</li>
        </ol>
    </div>
</div>
<div class="container-fluid aboutus-header hidden-xs" style="background-image: url(../images/newsfeed-header.png)">
    <h1>NEWS FEED</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a aliquet orci. Ut interdum mauris sem, non aliquet felis interdum sit amet.</p>
</div>
<div class="container-fluid nopadding news-feed" style="background-color: white;">
    <div class="container" style="padding-top: 3%;">
        <div class="row">
            <div class="col-sm-9 m-nopadding" >
                @if ($news_feeds->count()===0)
                    <h1 class="alert alert-danger">CURRENTLY THERE IS NO NEWS AVAILABLE.</h1>
                @else
                <div class="masonry">
                    @foreach ($news_feeds as $news_feed)
                        <a href="{{URL::route('news_feed.id', ['id' => $news_feed->id])}}" style="color: inherit;width: inherit; text-decoration: inherit;">
                            <div class="news-feed-item">
                                <table style="width: inherit;">
                                    <tbody>
                                        <tr>
                                            <td style="text-align: end;"><img src="{{asset('images')}}/{{$news_feed->newsfeedPoster->profilepic}}" style="border-radius: 50px"></td>
                                            <td>
                                                <div class="p-smaller" style="padding-left: 10px;">
                                                    <h3>{{$news_feed->newsfeedPoster->name}}</h3>
                                                    <table  style="font-size: smaller;">
                                                        <tbody>
                                                            <tr>
                                                                <td><p class="nopadding">Rated Restaurant</p></td>
                                                                <td><p class="nopadding" style="padding-left: 10px;"><i class="fa fa-star" style="color: #F6921E"></i>{{number_format($news_feed->rated_restaurant,2)}}</p></td>
                                                            </tr>
                                                            <tr>
                                                                <td><p class="nopadding">Rated Food</p></td>
                                                                <td><p class="nopadding" style="padding-left: 10px;"><i class="fa fa-star" style="color: #F6921E"></i>{{number_format($news_feed->rated_food,2)}}</p></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            <td style="vertical-align: bottom; text-align: center; font-size: smaller;">
                                                <p style="font-style: italic; color:#808080">{{$news_feed->created_at->diffForHumans()}}</p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <a href="{{URL::route('news_feed.id', ['id' => $news_feed->id])}}"><img src="{{ asset('images') }}/{{$news_feed->image_file}}" class="img-responsive" style="margin-left: auto; margin-right: auto;"></a>
                                <div style="padding-left: 20px; margin-top: 15px">
                                    <a class="pre" href="#"><img src="{{ asset('images/cutleryicon.png') }}" style="width: 5%; margin-right: 5px">{{$news_feed->food}}</a>

                                    <p class="pre" style="margin: 10px 0px 20px 0px; overflow: hidden;display: -webkit-box;-webkit-line-clamp: 3;-webkit-box-orient: vertical; color:initial;"> {{ $news_feed->description }}  @if($news_feed->posterFriends->count() > 0)- @endif  <?php $i = 0; ?>@foreach($news_feed->posterFriends as $friend)<a href="#" data-target="#adspopup" data-toggle="modal">{{$friend->name}}<?php $i++; ?></a>@if($i < $news_feed->posterFriends->count()), @else   @endif @endforeach</p>
                                    <table class="comment-table" style="width: 87%; margin-bottom: 5%;margin-left: 5%;">
                                        <tbody>
                                            <tr>
                                                <td><a href="#" data-target="#adspopup" data-toggle="modal"><img src="{{ asset('images/likeicon.png') }}" style="cursor:pointer;vertical-align: sub;">{{count($news_feed->user)}}</a></td>
                                                <td><a href="#" data-target="#adspopup" data-toggle="modal"><img src="{{ asset('images/commenticon.png') }}">100</a></td>
                                                <td><i class="fa fa-facebook" style="font-size: x-large; background: none; vertical-align: bottom; color: #999999" ></i><a href="#"></i>Share</a></td>
                                                <td><a href="{{route('news_feed.id', ['id' => $news_feed->id])}}"><i class="fa fa-chevron-right" style="font-size: x-large; color: #A7A9AC"></i></a></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </a>
                    @endforeach
                </div>
                <div class="text-right">
                    {{$news_feeds->render()}}
                </div>
                @endif

            </div>
            <div class="col-sm-3 hidden-xs text-center">
                <div class="container text-center" style="display: table; width:inherit; color:#BCBEC0; border: solid; border-width: thin; border-radius: 20px; margin-bottom: 5%; padding: 25px;">
                    <p style="color: black; font-size: large;">Download<br>
                    <span style="font-weight: bold;">Teaspoon Free App</span> <br> and enjoy the full feature today!</p>
                    <a href="#" data-target="#adspopup" data-toggle="modal"><div class="container" style="background-image: url(<?= asset('images/ads.png')?>); height: 276px; width: 151px; max-width: 100%; background-position: center; margin-bottom: 15px;"></div></a>
                    <p style="color: #58595B">AVAILABLE ON</p>
                    <img style="background-image: url(<?= asset('images/google-play-badge.png')?>); width: 128px; height: 38px;border-radius: 8px; margin-bottom: 5px;" href="#"></button>
                    <img style="background-image: url(<?= asset('images/app-store-badge.png')?>); width: 128px; height: 38px;border-radius: 8px;" href="#"></button>
                </div>
                <button data-target="#adspopup" data-toggle="modal" class="btn btn-primary" style="min-width: 201px; width: 56%; background-color: white; border-color: #939598; color: #58595B; margin-top: 15px;">WRITE A POST</button>
                <div id="adspopup" class="modal fade">
                    <div class="modal-dialog">
                        <div class="modal-content text-center" style="background-image: url(<?= asset('images/adspopup.png')?> );background-repeat: no-repeat; width:84%;">
                            <p>Enjoy Full Features with <br><span style="font-weight: bold">Teaspoon Free App</span><br>Today!</p>
                            <img src="{{ asset('images/ads.png') }} " class="img-responsive" style="margin-left: auto; margin-right: auto;">
                            <div class="container" style="position:absolute; background-color: white; border-radius: 7px;bottom: 0%;width: 100%;height: 16%;">
                                <a href="#"><img style="background-image: url(<?= asset('images/google-play-badge.png')?>); width: 128px; height: 38px;border-radius: 8px; margin-bottom: 5px; margin-top: 3%" href="#"></a>
                                <a href="#"><img style="background-image: url(<?= asset('images/app-store-badge.png')?>); width: 128px; height: 38px;border-radius: 8px; margin-top: 3%" href="#"></a>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    </div>
</div>

@endsection
