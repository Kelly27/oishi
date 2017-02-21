@extends('layouts.layout')

@section('content')
<div class="container-fluid" style="background-color: white;">
    <div class="container breadcrumb_container">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="#">Home</a></li>
          <li class="breadcrumb-item"><a href="#">About Us</a></li>
          <li class="breadcrumb-item active">News and Events</li>
        </ol>
    </div>
</div>
<div class="container-fluid aboutus-header hidden-xs" style="background-image: url(../images/newsfeed-header.png)">
    <h1>NEWS AND EVENT</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a aliquet orci. Ut interdum mauris sem, non aliquet felis interdum sit amet.</p>
</div>
<div class="container-fluid nopadding" style="background-color: white;">
    <div class="container" style="padding-top: 3%;">
        <div class="row">
            <div class="col-sm-12 col-md-9 m-nopadding">
                <div class="row nopadding">
                    @foreach ($news_events as $news_event)
                    <div class="col-sm-6 m-nopadding">
                        <div class="news-feed-item"> {{-- news-feed-item style is same here --}}
                            <img src="{{ asset('images') }}/{{$news_event->image}}" class="img-responsive" style="margin-left: auto; margin-right: auto; width: 100%; max-height: 241px">
                            <div style="padding-left: 20px; padding-right: 20px; margin-top: 15px">
                                <a href"#" class="pre" style="font-size:large; color: #4D4D4D; margin: 10px 0px 20px 0px; ">{{$news_event->title}}</a>
                                <p style="color: #4D4D4D; font-style: italic;font-size:medium; margin: 10px 0px 0px">{{$news_event->created_at}}</p>
                                <p class="text-justify">{{$news_event->short_description}}</p>
                            </div>
                        </div>
                    </div>
                    @endforeach
                </div>
                <div class="text-right" style="padding-right: 10px;">
                    {{$news_events->render()}}
                </div>
            </div>
            <div class="col-md-3 hidden-xs">
                @include('pages.abt.ads')
            </div>
        </div>
    </div>
    

</div>

@endsection
