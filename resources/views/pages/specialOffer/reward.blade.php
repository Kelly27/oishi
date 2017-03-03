@extends('layouts.layout')

@section('content')
<div class="container-fluid m-nopadding" style="background-color: white">
	<div class="container m-nopadding" style="margin-top: 2%;">
		<div class="row nopadding">
			<div class="col-sm-8">
				@if ($rewards->count()===0)
	                <h1 class="alert alert-danger">CURRENTLY THERE IS NO REWARDS AVAILABLE.</h1>
	            @else
				<div class="row">
					@foreach ($rewards as $reward)
						<div class="col-sm-6 m-nopadding imagecenter" id="padding25" style="margin-top: 2%; display: table;margin: auto;">
							<a href="{{route('reward.id', ['id' => $reward->id])}}"><div class="container" style="background-color: #F1F1F2; background-image: url(../images/{{$reward->image}}); height:240px; background-size: cover; max-width: 349px; min-width: 320px; background-repeat: no-repeat;"></div></a>
							<div style="background-color: #F1F1F2; padding: 3% 5% 1%; margin-bottom: 4%">
								<a class="eli-1line" href="{{route('reward.id', ['id' => $reward->id])}}" style="font-weight: bold; color: black;"><img src="{{URL::to('images/hand.png')}}" style="margin: 10px">{{$reward->title}}</a>
							</div>
						</div>
					@endforeach
					<div class="continer">
						<div class="text-right">
							{{$rewards->render()}}
						</div>
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