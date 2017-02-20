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
<div class="container-fluid aboutus-header hidden-xs" style="background-image: url(../images/newsfeed-header.png)">
    <h1>News Feed</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a aliquet orci. Ut interdum mauris sem, non aliquet felis interdum sit amet.</p>
</div>
<div class="container-fluid nopadding news-feed" style="background-color: white;">
    <div class="container" style="background-color: white; margin-top: 3%; padding: 0px;">
        <div class="row">
            <div class="col-sm-9">
                <div class="row">
                    @foreach($news_feeds as $news_feed)
                    <div class="col-sm-6 nopadding news-feed-col">
                            <table style="width: inherit;">
                                <tbody>
                                    <tr>
                                        <td style="text-align: end;"><img src="{{asset('images')}}/{{$users->profilepic}}" style="border-radius: 50px"></td>
                                        <td>
                                            <div class="p-smaller" style="padding-left: 10px;">
                                                <h3>{{$users->name}}</h3>
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
                                        <td style="vertical-align: bottom; text-align: center; font-size: smaller;"><p style="font-style: italic;">2 hours ago</p></td>
                                    </tr>
                                </tbody>
                            </table>
                        <div class="container sig-dish-img nopadding" style="background-image: url(../images/{{$news_feed->image_file}});"></div>
                        <div style="padding-left: 20px; margin-top: 15px">
                            <a class="pre" href="#"><img src="{{ asset('images/cutleryicon.png') }}" style="width: 5%; margin-right: 5px">{{$news_feed->food}}</a>
                            <p class="pre" style="margin: 10px 0px 20px 0px; ">{{$news_feed->description}}</p>
                            <table class="comment-table" style="width: 87%; margin-bottom: 5%;margin-left: 5%;">
                                <tbody>
                                    <tr>
                                        <td><img src="{{ asset('images/likeicon.png') }}" style="vertical-align: sub;"><a>10k</a></td>
                                        <td><img src="{{ asset('images/commenticon.png') }}"><a>100</a></td>
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
            </div>
            <div class="col-sm-3 hidden-xs">
                <img src="{{asset('images/ads.png')}}">
                <button class="btn btn-primary" style="background-color: white; border-color: #939598; color: #58595B; margin-top: 15px; width: 220px;">WRITE A POST</button>
            </div>
        </div>
    </div>
</div>
@endsection

{{-- mansory grid --}}
{{-- overflow --}}
{{-- linebreak --}}
{{-- 99+ likes --}}