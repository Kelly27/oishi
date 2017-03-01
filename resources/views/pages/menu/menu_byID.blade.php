@extends('layouts.layout')

@section('content')
<?php 
$text = $menu->ice_lvl;
$newtxt = wordwrap($text, 6, "<br>\n");
$text2 = $menu->sugar_lvl;
$newtxt2 = wordwrap($text2, 6, "<br>\n");

if ($menu->menu_type === 'sig') $type = 'Signature Dish';
elseif ($menu->menu_type === 'sta') $type = 'Starters';
?>
<div class="container-fluid" style="background-color: white;">
	<div class="container breadcrumb_container">
	    <ol class="breadcrumb">
	      <li class="breadcrumb-item"><a href="{{ route('home') }}">Home</a></li>
	      <li class="breadcrumb-item "><a href="{{route('menu_home')}}">Menu</a></li>
	      <li class="breadcrumb-item "><a href="{{ route('menu.index', ['menu_type' => $menu->menu_type]) }}">{{$type}}</a></li>
	      <li class="breadcrumb-item active" style="text-transform: uppercase;">{{$menu->menu_name}}</li>
	    </ol>
	</div>
</div>
<div class="container-fluid menu1-header hidden-xs">
    <h1>Menu</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a aliquet orci. Ut interdum mauris sem, non aliquet felis interdum sit amet.</p>
</div>
<div class="container-fluid nopadding" style="background-color: white">
	<div class="container">
		<div class="row">
			<div class="col-sm-8 menu-detail" style="margin-left: auto; margin-right: auto">
				<h1 class="hidden-xs" style="font-family: Arial; font-weight: bolder; color:#58595B">DETAILED INFORMATION</h1>
				<img src="{{ asset('images') }}/{{$menu->menu_img}}" class="img-responsive" style="margin-left: auto; margin-right: auto">
				<div style="margin: 2%">
					<h6 style="text-transform: uppercase;">{{$menu->menu_name}}<span id="price-font">RM {{number_format($menu->price,2)}}</span></h6>

					<button data-target="#adspopup" data-toggle="modal" class="btn fa fa-share-alt"><span style="font-family: OpenSans"> Share </span></button>
					<button data-target="#adspopup" data-toggle="modal" class="btn fa fa-comments"><span style="font-family: OpenSans"> Write a post </span></button>
					<br>
					<h6>Remarks</h6>
					<table class="remark-tb" style="width: 100%">
						<tbody>
							<tr><td style="font-weight: bold;background-color:#F1F1F2">Ice Level</td></tr>
							<tr><td><?php echo $newtxt ?></td></tr>
							<tr><td style="font-weight: bold;background-color:#F1F1F2">Sugar Level</td></tr>
							<tr><td><?php echo $newtxt2 ?></td></tr>
							<tr><td style="font-weight: bold;background-color:#F1F1F2">Hot</td></tr>
							<tr><td>{{$menu->hot}}</td></tr>
						</tbody>
					</table>
					<br>
					<h6>Extra Add On</h6>
					<table class="addOn-tb" style="text-align:center">
						<thead>
							<th style="background-color:#F1F1F2; text-align:center">Title</th>
							<th style="background-color:#F1F1F2; text-align:center">Price(RM)</th>
						</thead>
						<tbody>
							@foreach ($addOns as $addOn)
								<tr>
									<td>{{$addOn->item}}</td>
									<td>{{number_format($addOn->price,2)}}</td>
								</tr>
							@endforeach
						</tbody>
					</table>
					<p style="font-style: italic;">Number of add-on can be selected per dish: All</p>
					<br>
					<p style="font-weight: bolder; font-family: OpenSansBold">AVAILABLE AT</p>
					<table class="location-tb" style="margin-bottom: 3%">
						<tbody>
							@foreach ($locations as $location)
								<tr>
									<td>The G Cafe @ {{$location->location_name}} <a href="#" data-target="#adspopup" data-toggle="modal"><span style="float: right; font-size: x-large; color: #939598" class="fa fa-chevron-right"></span></a></td>
								</tr>
							@endforeach
						</tbody>
					</table>
				</div>
			</div>
			<div class="col-sm-4 nopadding" style='font-family: Arial'>
				<h3 style="font-weight: bold; font-family: OpenSansBold; margin-top: 12%: color:#58595B">News Feed</h3>
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
                                            <td><a href="{{URL::route('news_feed.id', ['id' => $news_feed->id])}}"><img src="{{ asset('images/commenticon.png') }}">100</a></td>
                                            <td><i class="fa fa-facebook" style="font-size: x-large; background: none; vertical-align: bottom; color: #999999"></i><a href="#"></i>Share</a></td>
                                            <td><a href="{{route('news_feed.id', ['id' => $news_feed->id])}}" ><i class="fa fa-chevron-right" style="font-size: x-large; color: #A7A9AC"></i></a></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </a>
                @endforeach
                <a href="{{ route('news_feed') }}"><button class="btn menu-btn" style="width: 100%; margin-bottom: 5%">View all Post ({{count($count_news)}})</button></a>
			</div>
		</div>
	</div>
	@include('partials.adspopup')
</div>

@endsection