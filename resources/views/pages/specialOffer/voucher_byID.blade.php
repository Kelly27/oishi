@extends('layouts.layout')

@section('content')
<div class="container-fluid" style="background-color: white;">
	<div class="container breadcrumb_container">
	    <ol class="breadcrumb">
	      <li class="breadcrumb-item"><a href="{{URL::to('/')}}">Home</a></li>
	      <li class="breadcrumb-item">Special Offer</li>
	      <li class="breadcrumb-item">Voucher</li>
	      <li class="breadcrumb-item active">Voucher</li>
	    </ol>
	</div>
</div>
<div class="container-fluid menu1-header hidden-xs" style="background-image: url(../images/voucher-header.png)">
    <h1>Menu</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a aliquet orci. Ut interdum mauris sem, non aliquet felis interdum sit amet.</p>
</div>
<div class="container-fluid m-nopadding " style="background-color: white">
	<div class="container m-nopadding color4D" style="margin-top: 2%;">
		<div class="row">
			<div class="col-sm-6">
				<img src="{{ asset('images') }}/{{$voucher->image}}">
				<div class="container text-center" style="background-color: #F1F1F2; width: initial; margin-top: 2%">
					<h3 style="color: #333333">{{$voucher->title}}</h3>
					<p style="font-size: x-small;">Now: <span style="color: red; font-size: large;">RM {{number_format($voucher->dis_price,2)}} </span> <span style="text-decoration: line-through;">RM{{number_format($voucher->ori_price,2)}}</span></p>
					<p>Group Voucher ({{$voucher->group_of}} person)</p>
					<p>Expiry Date: {{$voucher->expirydate}}</p>
					<p>{{$voucher->sold}} Bought | <?= $voucher->stock - $voucher->sold ?> left</p>
					<p>Deal is on!</p>
					<p>Time Remain</p>
					<p>Countdown here</p>
					<button class="btn">GRAB THIS VOUCHER</button>
					<button class="btn">INSTAN REDEEM</button>
				</div>
			</div>
			<div class="col-sm-6">
				<p>Also Availavle At:</p>
				<p>Description:</p>
				<p>Redeem Dish:</p>
				<p>Redeem Period:</p>
				<p>Term and Condition:</p>
			</div>
		</div>
	</div>
</div>
@endsection