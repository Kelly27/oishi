@extends('layouts.layout')

@section('content')
<div class="container-fluid" style="background-color: white;">
	<div class="container breadcrumb_container">
	    <ol class="breadcrumb">
	      <li class="breadcrumb-item"><a href="{{URL::to('/')}}">Home</a></li>
	      <li class="breadcrumb-item">Special Offer</li>
	      <li class="breadcrumb-item"><a href="{{route('reward')}}"> Reward</li></a>
	      <li class="breadcrumb-item active">{{$reward->title}}</li>
	    </ol>
	</div>
</div>
<div class="container-fluid menu1-header hidden-xs" style="background-image: url(<?=asset('images/reward-header.png')?> )">
    <h1>Reward</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a aliquet orci. Ut interdum mauris sem, non aliquet felis interdum sit amet.</p>
</div>
<div class="container-fluid m-nopadding " style="background-color: white">
	<div class="container m-nopadding " style="margin-top: 2%;">
		<div class="row nopadding">
			<div class="col-sm-6">
				<div class="container nopadding" style="width:initial;">
					<img src="{{ asset('images') }}/{{$reward->image}}" class="img-responsive" style="margin-right:auto; margin-left:auto; width:100%">
					<p id="free">50%<span> OFF</span></p>
					</div>
				<div class="container text-center" id="color4d" style="background-color: #F1F1F2; width: initial; margin-top: 2%; margin-bottom: 3%;">
					<h3>{{$reward->title}}</h3>
					<p style="font-weight: bold">Expiry Date: {{$reward->expirydate}}</p>
					<div class="row">
						<button data-target="#adspopup" data-toggle="modal" class="btn btn-font" style="color: white; background-color: #D10000; padding:0px"><img class="btn" src="{{ asset('images/hand2.png') }}" style="background-color:#A50000"><span style="padding:3%"> GRAB THIS VOUCHER </span></button>
					</div>

					<button data-target="#adspopup" data-toggle="modal" class="btn btn-font"  style="color: #58595B; background-color: #F8F8F8; padding:0px; margin-bottom: 5%"><img class="btn" src="{{ asset('images/import.png') }}" style="background-color:#DADADA"><span style="padding:3%; margin: 0% 5% 0% 7%"> INSTANT REDEEM </span></button>
				</div>
			</div>
			<div class="col-sm-6 ">
				<div class="container m-nopadding" style="width: initial;">
					<p class="bold-black">Also Availavle At:</p>
					<table class="alt_bg" style="margin-bottom: 3%">
						<tbody>
							@foreach ($locations as $location)
								<tr>
									<td>The G Cafe @ {{$location->location_name}} <a href="#" data-target="#adspopup" data-toggle="modal" ><span style="float: right; font-size: x-large; color: #939598" class="fa fa-chevron-right"></span></a></td>
								</tr>
							@endforeach
						</tbody>
					</table>
					<p class="bold-black">Description:</p>
					<div class="container" style="background-color: #F1F1F2; width: 100%; padding: 2%; margin-bottom: 3%">
						<p style="font-size: small; ">{{$reward->description}}</p>
					</div>
					<p class="bold-black">Related Dishes:</p>
					<div class="container" style="background-color: #F1F1F2; width: 100%; padding: 2%; margin-bottom: 3%">
						@foreach ($menus as $menu)
							<p>{{$menu->menu_name}} <a href="#" data-target="#adspopup" data-toggle="modal"><span style="float: right; font-size: x-large; color: #939598" class="fa fa-chevron-right"></span></a></p>
						@endforeach
					</div>
					<p class="bold-black">Redeem Period:</p>
					<table cellspacing="5" style="border-spacing: 5px; border-collapse: separate; min-width:60%">
					    <tbody>
					        @foreach ($periods as $period)
					        <tr>
								<?php
									$days = explode(", ", $period->day);
									$i;
									for ($i =0; $i < sizeof($days); $i++) {
										if($days[$i] === '1') $days[$i] = "Monday";
										elseif($days[$i] === '2') $days[$i] = "Tuesday";
										elseif($days[$i] === '3') $days[$i] = "Wednesday";
										elseif($days[$i] === '4') $days[$i] = "Thursday";
										elseif($days[$i] === '5') $days[$i] = "Friday";
										elseif($days[$i] === '6') $days[$i] = "Saturday";
										elseif($days[$i] === '7') $days[$i] = "Sunday";
									};
									$days = implode(" \n", $days)
								?>
					            <td style="background-color:#F1F1F2; padding:7px;">{!!nl2br($days)!!}</td>
					            <td style="background-color:#F1F1F2; padding:7px; text-align: center;">{{$period->time}}</td>
					        </tr>
							@endforeach
					    </tbody>
					</table>

					<p class="bold-black">Term and Condition:</p>
					<div class="container" style="background-color: #F1F1F2; width: 100%; padding: 2%;margin-bottom: 3%; overflow: hidden;">
						<p style="font-size: small; ">{!!nl2br($reward->term_cond)!!}</p>
					</div>
					<div class="container" style="background-color: #F1F1F2; width: 100%; padding: 2%; margin-top: 2%;margin-bottom: 3%">
						<a href="#" data-target="#adspopup" data-toggle="modal"><p class="bold-black"><img src="{{ asset('images/file.png') }}" style="margin-right: 3%">See rules that apply to all vouchers & rewards<span style="float: right; font-size: x-large; color: #939598" class="fa fa-chevron-right"></span></p></a>
					</div>
				</div>
			</div>
		</div>
	</div>
	@include('partials.adspopup')
</div>
@endsection