@extends('layouts.layout')

@section('content')
<div class="container-fluid" style="background-color: white;">
	<div class="container breadcrumb_container">
	    <ol class="breadcrumb">
	      <li class="breadcrumb-item"><a href="{{URL::to('/')}}">Home</a></li>
	      <li class="breadcrumb-item active">Special Offer</li>
	      <li class="breadcrumb-item active">Promotion</li>
	    </ol>
	</div>
</div>
<div class="container-fluid menu1-header hidden-xs" style="background-image: url(<?=asset('images/reward-header.png')?> )">
    <h1>Promotion</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a aliquet orci. Ut interdum mauris sem, non aliquet felis interdum sit amet.</p>
</div>
<div class="container-fluid m-nopadding " style="background-color: white; ">
	<div class="container m-nopadding" style="margin-top: 2%;margin-bottom: 3%">
		<div class="row promo-row">
			<div class="col-sm-4 nopadding imagecenter">
				<img src="{{ asset('images/promo1.png') }}" class="img-responsive" style="width: 100%">
			</div>
			<div class="col-sm-4 nopadding imagecenter">
				<img src="{{ asset('images/promo4.png') }}" class="img-responsive">
			</div>
			<div class="col-sm-4 nopadding imagecenter">
				<img src="{{ asset('images/promo3.png') }}" class="img-responsive" style="width: 100%">
			</div>
			</div>
		</div>
	</div>
</div>
@endsection
