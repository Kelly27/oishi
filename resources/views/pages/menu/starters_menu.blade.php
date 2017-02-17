@extends('layouts.layout')

@section('content')
<div class="container-fluid" style="background-color: white;">
	<div class="container breadcrumb_container">
	    <ol class="breadcrumb nomarginbottom">
	      <li class="breadcrumb-item"><a href="#">Home</a></li>
	      <li class="breadcrumb-item active"><a style="color: #929497;" href="#">Menu</a></li>
	      <li class="breadcrumb-item active">Starter</li>
	    </ol>
	</div>
</div>
<div class="container-fluid menu1-header">
    <h1>Menu</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a aliquet orci. Ut interdum mauris sem, non aliquet felis interdum sit amet.</p>
</div>
<div class="container">
	<h1>STARTERS</h1>
	<div class="row" style="display: table;">
		@foreach ($menus as $menu)
		<div class="col-sm-6">
			<div class="container menu-cont">
				<div class="row" style="margin-bottom: 20px;">
					<div class="col-sm-7">
				<img src="{{URL::to('images/img20.png')}}"" class="img-responsive">
					</div>
					<div class="col-sm-5">
						<h4 style="color: red; padding-top: 15px;">{{$menu->menu_name}}</h4>
					    <p>RM{{number_format($menu->price,2)}}</p>
					    <p style="font-size: x-small"><i class="fa fa-star" style="color: #F6921E"></i>{{number_format($menu->star,2)}}</p>
					    <p style="font-size: x-small">{{$menu->new_feed_point}} new feed posts</p>
					</div>
				</div>
			</div>
		</div>
		@endforeach
	</div>
	<div class="text-right">
		{{$menus->render()}}
	</div>
</div>
@endsection