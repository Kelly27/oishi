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
{{-- <div class="container-fluid aboutus-header hidden-xs" style="background-image: url(<?= asset('images/newsfeed-header.png') ?>") --}}
    <h1>News Feed</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a aliquet orci. Ut interdum mauris sem, non aliquet felis interdum sit amet.</p>
</div>
<div class="container-fluid nopadding news-feed" style="background-color: white;">
<div class="container" style="padding-top: 3%;">
    <div class="row">
        <div class="col-sm-9" style="border: solid; border-width:thin;border-color: #BCBEC0; border-radius: 20px">
            <div class="row">
                <div class="col-sm-6">
                    <table>
                        <tbody>
                            <tr>
                                <td style="text-align: end;"><img src="{{asset('images')}}/{{$news_feed->user->profilepic}}" style="border-radius: 50px"></td>
                                <td>
                                    <div class="p-smaller" style="padding-left: 10px;">
                                        <h3>{{$news_feed->user->name}}</h3>
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
                                    <p style="font-style: italic;">{{$news_feed->created_at->diffForHumans()}}</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <a href="{{URL::route('news_feed.id', ['id' => $news_feed->id])}}"><img src="{{ asset('images') }}/{{$news_feed->image_file}}" class="img-responsive" style="margin-left: auto; margin-right: auto;"></a>
                </div>
                <div class="col-sm-6  menu-detail" style="top: 150px">
                    <a class="pre" href="#"><img src="{{ asset('images/cutleryicon.png') }}" style="width: 5%; margin-right: 5px">{{$news_feed->food}}</a>
                    <p class="pre" style=" color: black; margin: 10px 0px 20px 0px; overflow: hidden;display: -webkit-box;-webkit-line-clamp: 3;-webkit-box-orient: vertical;">{{ $news_feed->description }}</p>
                    <p>likes</p>
                    <button class="btn fa fa-share-alt"><span style="font-family: OpenSans;"> Share </span></button>
                </div>
            </div>
            <h3>Recent Comments</h3>
            <hr class="nopadding" style="border-color: #BCBEC0">
            <div class="containter">
                <div class="container" style="border: solid; border-width:thin;border-color: #BCBEC0; border-radius: 20px">
                    <p>comments here</p>
                </div>
            </div>   
        </div>
        <div class="col-sm-3 hidden-xs">
            @include('pages.abt.ads')
        </div>
    </div>
</div>
    

</div>

@endsection
