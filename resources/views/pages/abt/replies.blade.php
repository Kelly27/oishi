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
{{-- <div class="container-fluid aboutus-header hidden-xs" style="background-image: url(<?= asset('images/newsfeed-header.png') ?>") --}}
    <h1>News Feed</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a aliquet orci. Ut interdum mauris sem, non aliquet felis interdum sit amet.</p>
</div>
<div class="container-fluid nopadding news-feed" style="background-color: white;">
<div class="container" style="padding-top: 3%; margin-bottom: 3%">
    <div class="row">
        <div class="col-sm-9" style="border: solid; border-width:thin;border-color: #BCBEC0; border-radius: 20px">
            <h3 class="color4D">Recent Comments</h3>
            <hr class="nopadding" style="border-color: #BCBEC0">
            <div class="containter comment">
                @foreach ($comments as $comment)
                    <div class="container" style="border: solid; border-width:thin;border-color: #BCBEC0; border-radius: 20px; width: inherit; margin: 2% 0% 2% ">
                        <table style="width: 100%">
                            <tbody>
                                <tr>
                                    <td style="min-width: 30px; width: 90px;"><img src="{{asset('images')}}/{{$comment->user->profilepic}}" style="border-radius: 50px"></td>
                                    <td>
                                        <p style="font-weight: bold; margin: 0px">{{$comment->user->name}}</p>
                                        <p style="font-size: smaller;">2000 <span style="font-style: italic; color: #808080">{{$comment->created_at->diffForHumans()}}</span></p>
                                        <p>{{$comment->comment}}</p>
                                        <p style="text-align: ">like</p>
                                    </td>
                                    <td style="vertical-align: bottom;">
                                        <p style="font-family: OpenSans; font-size:smaller; text-align: right">Replies</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                @endforeach
                <div class="row">
                    <div class="col-sm-6">
                        <button class="btn btn-primary btn-style" style="color: #58595B; width: 100%; margin-bottom: 3%">WRITE A COMMENT</button>
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
</div>
    

</div>

@endsection
