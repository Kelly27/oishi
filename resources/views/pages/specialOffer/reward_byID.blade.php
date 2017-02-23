@extends('layouts.layout')

@section('content')
<div class="container-fluid" style="background-color: white;">
	<div class="container breadcrumb_container">
	    <ol class="breadcrumb">
	      <li class="breadcrumb-item"><a href="{{URL::to('/')}}">Home</a></li>
	      <li class="breadcrumb-item">Special Offer</li>
	      <li class="breadcrumb-item">Voucher</li>
	      <li class="breadcrumb-item active">{{$reward->title}}</li>
	    </ol>
	</div>
</div>
<div class="container-fluid menu1-header hidden-xs" style="background-image: url(<?=asset('images/reward-header.png')?> )">
    <h1>Reward</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a aliquet orci. Ut interdum mauris sem, non aliquet felis interdum sit amet.</p>
</div>
<div class="container-fluid m-nopadding " style="background-color: white">
	<div class="container m-nopadding color4D" style="margin-top: 2%;">
		<div class="row">
			<div class="col-sm-6">
				<img src="{{ asset('images') }}/{{$reward->image}}">
				<div class="container text-center" style="background-color: #F1F1F2; width: initial; margin-top: 2%">
					<h3 style="color: #333333">{{$reward->title}}</h3>
					<p>Expiry Date: {{$reward->expirydate}}</p>
					<button class="btn">GRAB THIS REWARD</button>
					<button class="btn">INSTAN REDEEM</button>
				</div>
			</div>
			<div class="col-sm-6">
				<p>Also Availavle At:</p>
				<p>Description:</p>
				<p>Relatd Dish:</p>
				<p>Redeem Period:</p>
				<p>Term and Condition:</p>
			</div>
		</div>
	</div>
</div>
@endsection