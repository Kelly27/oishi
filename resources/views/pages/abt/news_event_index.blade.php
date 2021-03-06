@extends('layouts.layout')

@section('content')
<div class="container-fluid nopadding" style="background-color: white;">
    <div class="container" style="padding-top: 3%;">
        <div class="row">
            <div class="col-sm-12 col-md-9 m-nopadding">
            @if ($news_events->count()===0)
                    <h1 class="alert alert-danger">CURRENTLY THERE IS NO NEWS AND EVENTS AVAILABLE.</h1>
            @else
                <div class="row nopadding">
                    @foreach ($news_events as $news_event)
                    <div class="col-sm-6 m-nopadding">
                        <div class="news-feed-item"> {{-- news-feed-item style is same here --}}
                            <a href="{{ url('about_us/news_event/'. $news_event->id) }}" ><img src="{{ asset('images') }}/{{$news_event->image}}" class="img-responsive" style="margin-left: auto; margin-right: auto; width: 100%; max-height: 241px"></a>
                            <div style="padding-left: 15px; padding-right: 10px; margin-top: 15px">
                                <a href="{{ url('about_us/news_event/'. $news_event->id) }}" style="font-size:large; color: #4D4D4D; margin: 10px 0px 20px 0px; ">{{$news_event->title}}</a>
                                <p style="color: #4D4D4D; font-style: italic;font-size:medium; margin: 10px 0px 0px">{{$news_event->created_at}}</p>
                                <p class="text-justify" style="margin: 10px 0px 20px 0px; overflow: hidden;display: -webkit-box;-webkit-line-clamp: 3;-webkit-box-orient: vertical; color:initial;">{{$news_event->short_description}}</p>
                            </div>
                        </div>
                    </div>
                    @endforeach
                </div>
                <div class="text-right" style="padding-right: 10px;">
                    {{$news_events->render()}}
                </div>
            @endif
            </div>
            <div class="col-md-3 hidden-xs">
                @include('pages.abt.ads')
            </div>
        </div>
    </div>


</div>

@endsection
