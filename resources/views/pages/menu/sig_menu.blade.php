@extends('layouts.layout')

@section('content')
<div class="container-fluid" style="background-color: white;">
	<div class="container breadcrumb_container">
	    <ol class="breadcrumb">
	      <li class="breadcrumb-item"><a href="#">Home</a></li>
	      <li class="breadcrumb-item active"><a style="color: #929497;" href="#">Menu</a></li>
	      <li class="breadcrumb-item active">Signature Dish</li>
	    </ol>
	</div>
</div>
<div class="container-fluid menu1-header hidden-xs">
    <h1>Menu</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a aliquet orci. Ut interdum mauris sem, non aliquet felis interdum sit amet.</p>
</div>
<div class="container">
	<h1 class="hidden-xs">SIGNATURE DISH</h1>
	<div class="row"">
		@foreach ($menus as $menu)
		<div class="col-sm-6 nopadding">
			<div class="container menu-cont">
				<div class="row hidden-xs" style="margin-bottom: 20px;">
					<div class="col-sm-7">
						<div class="container img-responsive img-200px" style="background-image: url(../images/{{$menu->menu_img}}); max-width: 100%; width: 400px; height: 200px; background-size: cover;">
						</div>
					</div>
					<div class="col-sm-5">
						<h4 style="color: red; vertical-align: middle;">{{$menu->menu_name}}</h4>
					    <p>RM{{number_format($menu->price,2)}}</p>
					    <p style="font-size: x-small"><i class="fa fa-star" style="color: #F6921E"></i>{{number_format($menu->star,2)}}</p>
					    <p style="font-size: x-small">{{$menu->new_feed_point}} new feed posts</p>
					</div>
				</div>
			</div>
			<div class="container menu-cont visible-xs" style="margin: 0px auto 0px auto; width: 356px; max-width: 100%; background-color: white" >
				<div class="container img-responsive img-200px" style="background-image: url(../images/{{$menu->menu_img}}); max-width: 100%; width: 400px; height: 200px; background-size: cover">
				</div>	
				<h4 style="color: red; vertical-align: middle;">{{$menu->menu_name}}</h4>
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
</div>
@endsection