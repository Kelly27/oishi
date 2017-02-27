@extends('layouts.layout')

@section('content')
<div class="container-fluid" style="background-color: white;">
	<div class="container breadcrumb_container">
	    <ol class="breadcrumb">
	      <li class="breadcrumb-item"><a href="{{URL::to('/')}}">Home</a></li>
	      <li class="breadcrumb-item">Special Offer</li>
	      <li class="breadcrumb-item active">Reward</li>
	    </ol>
	</div>
</div>
<div class="container-fluid menu1-header hidden-xs" style="background-image: url(../images/reward-header.png)">
    <h1>Reward</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a aliquet orci. Ut interdum mauris sem, non aliquet felis interdum sit amet.</p>
</div>
<div class="container-fluid m-nopadding" style="background-color: white">
	<div class="container m-nopadding" style="margin-top: 2%;">
		<div class="row nopadding">
			<div class="col-sm-8">
				@if ($rewards->count()===0)
	                <h1 class="alert alert-danger">CURRENTLY THERE IS NO REWARDS AVAILABLE.</h1>
	            @else
				<div class="row">
					@foreach ($rewards as $reward)
						<div class="col-sm-6 m-nopadding imagecenter" style="margin-top: 2%; display: table;margin: auto;">
							<div style="max-height: 262px; overflow: hidden;">
								<a href="{{route('reward.id', ['id' => $reward->id])}}">
								<img src="{{ asset('images') }}/{{$reward->image}}" class="img-responsive" style="height: 100%"></a>
							</div>
							<div style="background-color: #F1F1F2; padding: 3% 5% 1%; margin-bottom: 4%">
								<a href="{{route('reward.id', ['id' => $reward->id])}}" style="font-weight: bold; color: black;"><img src="{{URL::to('images/hand.png')}}" style="margin: 10px">{{$reward->title}}</a>
							</div>
						</div>
					@endforeach
					<div class="text-right">
						{{$rewards->render()}}
					</div>
				</div>
				@endif
			</div>
			<div class="col-sm-4 hidden-xs">
				@include('pages.abt.ads')
			</div>
		</div>
	</div>
</div>
@endsection