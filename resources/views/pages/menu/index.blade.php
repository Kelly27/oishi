@extends('layouts.layout')

@section('content')
<div class="container">
	<h1 class="hidden-xs" style="text-transform: capitalize;">{{Request::segment(2)}}</h1>
	@if ($menus->count()===0)
		<h2 class="alert alert-danger">THERE IS NO SIGNATURE DISH TO BE DISPLAY.</h2>
	@else
		<div class="row"">
			@foreach ($menus as $menu)
			<div class="col-sm-6 nopadding">
				<div class="container menu-cont">
					<div class="row hidden-xs" style="margin-bottom: 20px;">
						<div class="col-sm-7">
							<a href="{{ url('menu/'.$menu->menu_type.'/'. $menu->id) }}" ><div class="container img-responsive img-200px" style="background-image: url(../images/{{$menu->menu_img}}); max-width: 100%; width: 400px; height: 200px; background-size: cover;">
							</div></a>
						</div>
						<div class="col-sm-5">
							<a class="eli-1line" href="{{ url('menu/'.$menu->menu_type.'/'. $menu->id) }}" style="font-size: large; color: red; vertical-align: middle;">{{$menu->title}}</a>
						    <p>RM{{number_format($menu->price,2)}}</p>
						    <p style="font-size: x-small"><i class="fa fa-star" style="color: #F6921E"></i>{{number_format($menu->star,2)}}</p>
						    <p style="font-size: x-small">{{$menu->new_feed_point}} new feed posts</p>
						</div>
					</div>
				</div>
				<div class="container menu-cont visible-xs" style="margin: 0px auto 0px auto; width: 356px; max-width: 100%; background-color: white" >
					<div class="container img-responsive img-200px" style="background-image: url(../images/{{$menu->menu_img}}); max-width: 100%; width: 400px; height: 200px; background-size: cover">
					</div>
					<a href="{{ url('menu/'. $menu->id) }}" style="color: red; vertical-align: middle;">{{$menu->title}}</a>
				    <p>RM{{number_format($menu->price,2)}}</p>
				    <p style="font-size: x-small"><i class="fa fa-star" style="color: #F6921E"></i>{{number_format($menu->star,2)}}</p>
				    <p style="font-size: x-small">{{$menu->new_feed_point}} new feed posts</p>
				</div>
			</div>
			@endforeach
		</div>
		<div class="text-right">
			{{$menus->render()}}
		</div>
	@endif

</div>
@endsection