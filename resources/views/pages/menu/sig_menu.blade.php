@extends('layouts.layout')

@section('content')
<div class="container-fluid" style="background-color: white;">
	<div class="container breadcrumb_container">
	    <ol class="breadcrumb nomarginbottom">
	      <li class="breadcrumb-item"><a href="#">Home</a></li>
	      <li class="breadcrumb-item active"><a style="color: #929497;" href="#">Menu</a></li>
	      <li class="breadcrumb-item active">Signature Dish</li>
	    </ol>
	</div>
</div>
<div class="container-fluid menu1-header">
    <h1>Menu</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a aliquet orci. Ut interdum mauris sem, non aliquet felis interdum sit amet.</p>
</div>
<div class="container">
	<h1>SIGNATURE DISH</h1>
	<div class="row" style="display: table;">
		@foreach ($menus as $menu)
		<div class="col-sm-6">
			<div class="container menu-cont">
				<div class="row">
					<div class="col-sm-7">
				<img src="{{URL::to('images/img1.png')}}"" class="img-responsive">
					</div>
					<div class="col-sm-5">
						<h6>{{$menu->menu_name}}</h6>
					    <p>RM{{$menu->price}}</p>
					    <p>5.00</p>
					    <p>{{$menu->new_feed_point}} new feed posts</p>
					</div>
				</div>
			</div>
		</div>
		@endforeach
	</div>
</div>
<nav aria-label="Page navi">
  <ul class="pagination text-right">
    <li class="disabled"><a href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>
    <li class="active"><a href="#">1 <span class="sr-only">(current)</span></a></li>
  </ul>
</nav>
@endsection