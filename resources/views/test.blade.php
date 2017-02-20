@extends('layouts.layout')

@section('content')
<div id="masonry-grid">
	
	<div class="grid-item">
		<img src="{{ asset('images/img5.png') }}">
	</div>
	<div class="grid-item">
		<img src="{{ asset('images/img1.png') }}">
	</div>
	<div class="grid-item">
		<img src="{{ asset('images/img1.png') }}">
	</div>
	<div class="grid-item">
		<img src="{{ asset('images/img5.png') }}">
	</div>
	<div class="grid-item">
		<img src="{{ asset('images/img1.png') }}">
	</div>
</div>

<script>
var container = document.querySelector('#masonry-grid');
var msnry = new Masonry( container, {
  // options
  columnWidth: 200,
  itemSelector: '.grid-item'
});
</script>

@endsection


@foreach($news_feeds as $news_feed)
    <table style="width: inherit;">
        <tbody>
            <tr>
                <td style="text-align: end;"><img src="{{asset('images')}}/{{$users->profilepic}}" class="img-responsive" style="border-radius: 50px"></td>
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
    <img src="{{ asset('images') }}/{{$news_feed->image_file}}" class="img-responsive">
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
@endforeach




<div class="row">
            <div class="col-sm-9">
                
                <div class="text-right">
                    {{$news_feeds->render()}}
                </div>
            </div>
            <div class="col-sm-3 hidden-xs">
                <img src="{{asset('images/ads.png')}}">
                <button class="btn btn-primary" style="background-color: white; border-color: #939598; color: #58595B; margin-top: 15px; width: 220px;">WRITE A POST</button>
            </div>
        </div>