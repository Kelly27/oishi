<? use Carbon\Carbon; ?>

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
                        <div class="news-feed-item">
                            <table style="width: inherit;">
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
                                        </td>
                                        <td style="vertical-align: bottom; text-align: center; font-size: smaller;">
                                            <p style="font-style: italic;">{{$news_feed->created_at->diffForHumans()}}</p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <a href="{{URL::route('news_feed.id', ['id' => $news_feed->id])}}"><img src="{{ asset('images') }}/{{$news_feed->image_file}}" class="img-responsive" style="margin-left: auto; margin-right: auto;"></a>
                            <div style="padding-left: 20px; margin-top: 15px">
                                <a class="pre" href="#"><img src="{{ asset('images/cutleryicon.png') }}" style="width: 5%; margin-right: 5px">{{$news_feed->food}}</a>
                                <p class="pre" style="margin: 10px 0px 20px 0px; overflow: hidden;display: -webkit-box;-webkit-line-clamp: 3;-webkit-box-orient: vertical;">{{ $news_feed->description }}</p>
                                <table class="comment-table" style="width: 87%; margin-bottom: 5%;margin-left: 5%;">
                                    <tbody>
                                        <tr>
                                            <td><a href="{{route('news_feed.like', ['id' => $news_feed->id])}}"><img src="{{ asset('images/likeicon.png') }}" style="cursor:pointer;vertical-align: sub;">{{count($news_feed->likes)}}</a></td>
                                            <td><a href="{{URL::route('news_feed.id', ['id' => $news_feed->id])}}"><img src="{{ asset('images/commenticon.png') }}">100</a></td>
                                            <td><i class="fa fa-facebook" style="font-size: x-large; background: none; vertical-align: bottom;"></i><a href="#"></i>Share</a></td>
                                            <td><i class="fa fa-chevron-right" style="font-size: x-large; color: #A7A9AC"></i></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    @endforeach
                </div>
                <div class="text-right">
                    {{$news_feeds->render()}}
                </div>
                @endif

            </div>
            <div class="col-sm-3 hidden-xs text-center">
                @include('pages.abt.ads')
                <button class="btn btn-primary" style="min-width: 201px; width: 56%; background-color: white; border-color: #939598; color: #58595B; margin-top: 15px;">WRITE A POST</button>
            </div>
        </div>
    </div>
</div>

@endsection

{{-- mansory grid --}}
{{-- overflow --}}
{{-- linebreak --}}
{{-- 99+ likes --}}
