@extends('layouts.layout')

@section('content')
<div class="container-fluid" style="background-color: white;">
	<div class="container breadcrumb_container">
	    <ol class="breadcrumb">
	      <li class="breadcrumb-item"><a href="{{URL::to('/')}}">Home</a></li>
	      <li class="breadcrumb-item">About Us</li>
	      <li class="breadcrumb-item active">Photo Gallery</li>
	    </ol>
	</div>
</div>
<div class="container-fluid aboutus-header" style="background-image: url(../images/gallery-header.png)">
    <h1>Photo Gallery</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a aliquet orci. Ut interdum mauris sem, non aliquet felis interdum sit amet.</p>
</div>
<div class="container-fluid"  style="background-color: white;"">
	<div class="container" style="padding-top: 2%">
		@if($galleries->count() === 0)
			<h1 class="alert alert-danger">THERE IS NO PHOTO TO BE DISPLAYED.</h1>
		@else
		<div class="row">
			@foreach($galleries as $gallery)
				<div class="col-sm-2 my-col-2 nopadding imagecenter" id="gallery-col" >
					<a href="#lightbox" data-toggle="modal" data-slide-to="{{$gallery->id}}" ><img src="{{asset('images')}}/{{$gallery->gallery_name}}" class="active img-responsive" style="height:207px;" ></a>
				</div>
			@endforeach
		</div>
		<div class="text-right">
			{{$galleries->render()}}
		</div>
		@endif
	</div>
</div>
<div class="modal fade and carousel slide" id="lightbox">
    <div class="modal-dialog">
	    <div class="modal-body">
	      <ol class="carousel-indicators">
	      	@foreach($galleries as $gallery)
	        	<li data-target="#lightbox" data-slide-to="{{$gallery->id}}"></li>
	        @endforeach
	      </ol>
	      <div class="carousel-inner">
	      	@foreach ($galleries as $gallery)
	            @if ($gallery->id == 2)
	            	<div class="item active">
		              <img src="{{asset('images')}}/{{$gallery->gallery_name}}">
		            </div>
		        @else
		        	<div class="item active">
		              <img src="{{asset('images')}}/{{$gallery->gallery_name}}">
		            </div>
	            @endif
	      	@endforeach
	      </div><!-- /.carousel-inner -->
	      <a class="left carousel-control" href="#lightbox" role="button" data-slide="prev">
	        <span class="fa fa-chevron-left"></span>
	      </a>
	      <a class="right carousel-control" href="#lightbox" role="button" data-slide="next">
	        <span class="fa fa-chevron-right"></span>
	      </a>
	    </div><!-- /.modal-body -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
@endsection
