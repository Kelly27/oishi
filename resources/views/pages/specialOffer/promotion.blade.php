@extends('layouts.layout')

@section('content')
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
