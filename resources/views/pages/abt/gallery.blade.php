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
					<img src="{{asset('images')}}/{{$gallery->gallery_name}}" class="img-responsive" style="height:207px;">
				</div>
			@endforeach
		</div>
		<div class="text-right">
			{{$galleries->render()}}
		</div>
		@endif
	</div>
</div>
@endsection