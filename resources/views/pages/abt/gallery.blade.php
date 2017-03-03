@extends('layouts.layout')

@section('content')
<div class="container-fluid"  style="background-color: white;"">
	<div class="container" style="padding-top: 2%">
		@if($galleries->count() === 0)
			<h1 class="alert alert-danger">THERE IS NO PHOTO TO BE DISPLAYED.</h1>
		@else
		<div class="row" id="links">
			@foreach($galleries as $gallery)
				<div class="col-sm-2 my-col-2 nopadding imagecenter" id="gallery-col">
					<a href="{{asset('images')}}/{{$gallery->gallery_name}}">
						<img src="{{asset('images')}}/{{$gallery->gallery_name}}" class="img-responsive m-full-width">
					</a>
				</div>
			@endforeach
		</div>
		<div class="text-right" style="margin-top: 3%">
			{{$galleries->render()}}
		</div>
		@endif
	</div>
</div>

<div id="blueimp-gallery" class="blueimp-gallery blueimp-gallery-controls">
    <div class="slides"></div>
    <h3 class="title"></h3>
    <a class="prev" style="border:0px">‹</a>
    <a class="next">›</a>
    <a class="play-pause"></a>
    <ol class="indicator"></ol>
</div>
</script>
@endsection
