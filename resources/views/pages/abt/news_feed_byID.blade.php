<? use Carbon\Carbon; ?>

@extends('layouts.layout')

@section('content')
<div class="container-fluid" style="background-color: white;">
    <div class="container breadcrumb_container">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="{{URL::to('/')}}">Home</a></li>
          <li class="breadcrumb-item">About Us</li>
          <li class="breadcrumb-item"><a href="{{route('news_feed')}}">News Feed</a></li>
          <li class="breadcrumb-item active">{{$news_feed->newsfeedPoster->name}}'s Post</li>
        </ol>
    </div>
</div>
<div class="container-fluid aboutus-header hidden-xs" style="background-image: url(<?= asset('images/newsfeed-header.png') ?>") 
    <h1>News Feed</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a aliquet orci. Ut interdum mauris sem, non aliquet felis interdum sit amet.</p>
</div>
<div class="container-fluid nopadding news-feed" style="background-color: white;">
<div class="container" style="padding-top: 3%; margin-bottom: 3%">
    <div class="row">
        <div class="col-sm-9" style="border: solid; border-width:thin;border-color: #BCBEC0; border-radius: 20px">
            <div class="row row-tb" style="margin: auto;">
                <div class="col-sm-6 m-nopadding">
                    <table style="width: 100%">
                        <tbody>
                            <tr>
                                <td style="text-align: end;"><img src="{{asset('images')}}/{{$news_feed->newsfeedPoster->profilepic}}" style="border-radius: 50px"></td>
                                <td>
                                    <div class="p-smaller" style="padding-left: 10px;">
                                        <h3 class="color4D">{{$news_feed->newsfeedPoster->name}}</h3>
                                        <table class="color4D" style="color: font-size: smaller;">
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
                </div>
                <div class="col-sm-6 news-feed-detail" >
                    <a class="pre" href="#"><img src="{{ asset('images/cutleryicon.png') }}" style="margin-right: 5px;">{{$news_feed->food}}</a>
                    <p class="pre" style=" color: black; margin: 10px 0px 20px 0px; overflow: hidden;display: -webkit-box;-webkit-line-clamp: 3;-webkit-box-orient: vertical;">{{ $news_feed->description }}</p>
                    <p>{{count($news_feed->user)}} likes</p>
                    <button data-target="#adspopup" data-toggle="modal" class="btn fa fa-share-alt btn-style"><span style="font-family: OpenSans;"> Share </span></button>
                </div>
            </div>
            <h3>Recent Comments</h3>
            <hr style="border-color: #BCBEC0">
            <div class="containter comment">
                @foreach ($comments as $comment)
                    <div class="container grey-border">
                        <table style="width: 100%">
                            <tbody>
                                <tr>
                                    <td style="min-width: 30px; width: 90px;"><img src="{{asset('images')}}/{{$comment->user->profilepic}}" style="border-radius: 50px"></td>
                                    <td>
                                        <p style="font-weight: bold; margin: 0px">{{$comment->user->name}}</p>
                                        <p style="font-size: smaller;">2000 <span style="color: #EAAA28; font-size: large;">  •  </span>  0  <span style="color: #797A7A; font-size: large;">  •  </span>  0  <span style="color: #AF571C; font-size: large;">  •  </span>  0  <span style="font-style: italic; color: #808080; margin-left: 6%">{{$comment->created_at->diffForHumans()}}</span></p>
                                        <p>{{$comment->comment}}</p>
                                        <p><a href="#" data-target="#adspopup" data-toggle="modal" style="text-decoration: none; color:initial;"> 1 <img src="{{ asset('images/like_red.png') }}"> 0 <img src="{{ asset('images/dislike.png') }}"></a></p>
                                    </td>
                                    <td style="vertical-align: bottom;">
                                        <a href="{{route('news_feed.reply', [$news_feed->id, $comment->id])}}"><p style="font-family: OpenSans; font-size:smaller; text-align: right;color: initial">{{count($comment->replies)}} Replies</p></a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                @endforeach
                <div class="row">
                    <div class="col-sm-6">
                        <button href="#" data-target="#adspopup" data-toggle="modal" class="btn btn-style" style="color: #58595B; width: 100%; margin-bottom: 3%">WRITE A COMMENT</button>
                    </div>
                    <div class="col-sm-6">
                        <div class="text-right">
                            {{$comments->render()}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-sm-3 hidden-xs">
            @include('pages.abt.ads')
        </div>
    </div>
    @include('partials.adspopup')
</div>


</div>

@endsection
