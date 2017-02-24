@extends('layouts.layout')

@section('content')
<div class="container-fluid" style="background-color: white;">
	<div class="container breadcrumb_container">
	    <ol class="breadcrumb">
	      <li class="breadcrumb-item"><a href="#">Home</a></li>
	      <li class="breadcrumb-item active"><a style="color: #929497;" href="#">Menu</a></li>
	      <li class="breadcrumb-item active"><a style="color: #929497;" href="#">Signature Dish</a></li>
	      <li class="breadcrumb-item active">{{$menu->menu_name}}</li>
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
				<h1 class="hidden-xs" style="font-family: Arial; font-weight: bolder;">DETAILED INFORMATION</h1>
				<img src="{{ asset('images') }}/{{$menu->menu_img}}" class="img-responsive" style="margin-left: auto; margin-right: auto">
				<h6 style="text-transform: uppercase;">{{$menu->menu_name}}<span id="price-font">RM {{number_format($menu->price,2)}}</span></h6>

				<button class="btn fa fa-share-alt"><span style="font-family: OpenSans"> Share </span></button>
				<button class="btn fa fa-comments"><span style="font-family: OpenSans"> Write a post </span></button>
				<br>
				<h6>Remarks</h6>
				<table class="remark-tb" style="width: 100%">
					<tbody>
						<tr><td id="grey" style="font-weight: bold;">Ice Level</td></tr>
						<tr><td>{{$menu->ice_lvl}}</td></tr>
						<tr><td id="grey" style="font-weight: bold;">Sugar Level</td></tr>
						<tr><td>- 100%</td></tr>
						<tr><td id="grey" style="font-weight: bold;">Hot</td></tr>
						<tr><td>- 100%</td></tr>
					</tbody>
				</table>
				<br>
				<h6>Extra Add On</h6>
				<table class="addOn-tb">
					<thead>
						<th>Title</th>
						<th>Price(RM)</th>
					</thead>
					<tbody>
						<tr>
							<td>Pearl</td>
							<td>1.00</td>
						</tr>
					</tbody>
				</table>
				<p style="font-style: italic;">Number of add-on can be selected per dish: All</p>
				<br>
				<p style="font-weight: bold">AVAILABLE AT</p>
				<table class="cafe-list">
					<tbody>
						<tr><td>The G <span style="float: right; font-size: x-large; color: #939598" class="fa fa-chevron-right"></span></td></tr>
						<tr><td>The G</td></tr>
						<tr><td>The G</td></tr>
					</tbody>
				</table>
			</div>
			<div class="col-sm-4 nopadding">
				<h3 style="font-weight: bold; font-family: OpenSansBold; margin-top: 12%">News Feed</h3>
				@foreach ($news_feeds as $news_feed)
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
                                    </td>
                                    <td style="vertical-align: bottom; text-align: center; font-size: smaller;"><p style="font-style: italic;">{{$news_feed->created_at}}</p></td>
                                </tr>
                            </tbody>
                        </table>
                        <img src="{{ asset('images') }}/{{$news_feed->image_file}}" class="img-responsive" style="margin-left: auto; margin-right: auto;">
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
                <button class="btn menu-btn" style="width: 100%; margin-bottom: 5%">View all Post ({{$news_feeds->count()}})</button>
			</div>
		</div>
	</div>
</div>

@endsection