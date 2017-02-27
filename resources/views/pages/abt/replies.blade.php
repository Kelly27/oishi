<? use Carbon\Carbon; ?>

@extends('layouts.layout')

@section('content')
<div class="container-fluid" style="background-color: white;">
    <div class="container breadcrumb_container">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="{{URL::to('/')}}">Home</a></li>
          <li class="breadcrumb-item">About Us</li>
          <li class="breadcrumb-item">News Feed</li>
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
        <h3>Recent Comments</h3>
        <div class="col-sm-9" >
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
                                <p style="font-family: OpenSans; font-size:smaller; text-align: right">{{count($comment->replies)}} Replies</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <hr style="border: solid;border-color: #BCBEC0; border-width: thin;">
            @foreach($replies as $reply)
                <div class="container grey-border">
                    <table style="width: 100%">
                        <tbody>
                            <tr>
                                <td style="min-width: 30px; width: 90px;"><img src="{{asset('images')}}/{{$reply->users->profilepic}}" style="border-radius: 50px"></td>
                                <td>
                                    <p style="font-weight: bold; margin: 0px">{{$reply->users->name}}</p>
                                    <p style="font-size: smaller;">2000 <span style="color: #EAAA28; font-size: large;">  •  </span>  0  <span style="color: #797A7A; font-size: large;">  •  </span>  0  <span style="color: #AF571C; font-size: large;">  •  </span>  0  <span style="font-style: italic; color: #808080; margin-left: 6%">{{$reply->created_at->diffForHumans()}}</span></p>
                                    <p>{{$reply->reply}}</p>
                                    <p><a href="#" data-target="#adspopup" data-toggle="modal" style="text-decoration: none; color:initial;"> 1 <img src="{{ asset('images/like_red.png') }}"> 0 <img src="{{ asset('images/dislike.png') }}"></a></p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            @endforeach
            <div class="row">
                <div class="col-sm-6">
                    <button data-target="#adspopup" data-toggle="modal" class="btn btn-primary btn-style" style="color: #58595B; width: 100%; margin-bottom: 3%">WRITE A REPLY</button>
                </div>
                <div class="col-sm-6">
                    <div class="text-right">
                        {{$replies->render()}}
                    </div>
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
