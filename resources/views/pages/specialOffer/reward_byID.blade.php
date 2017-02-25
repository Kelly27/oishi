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
	<div class="container m-nopadding " style="margin-top: 2%;">
		<div class="row nopadding">
			<div class="col-sm-6">
				<div class="container img-350px" style="background-image: url(<?= asset('images')?>/{{$reward->image}});"></div>
				<div class="container text-center" id="color4d" style="background-color: #F1F1F2; width: initial; margin-top: 2%; margin-bottom: 3%">
					<p style="font-weight: bold">Expiry Date: {{$reward->expirydate}}</p>
					<img src="{{ asset('images/grab_btn.png') }}" class="img-responsive" style="margin: auto">
					<img src="{{ asset('images/redeem_btn.png') }}" class="img-responsive"  style="margin: auto;margin-bottom: 3%">
				</div>
			</div>
			<div class="col-sm-6 ">
				<div class="container m-nopadding" style="width: initial;">
					<p class="bold-black">Also Availavle At:</p>
					<table class="alt_bg" style="margin-bottom: 3%">
						<tbody>
							@foreach ($locations as $location)
								<tr>
									<td>The G Cafe @ {{$location->location_name}} <span style="float: right; font-size: x-large; color: #939598" class="fa fa-chevron-right"></span></td>
								</tr>
							@endforeach
						</tbody>
					</table>
					<p class="bold-black">Description:</p>
					<div class="container" style="background-color: #F1F1F2; width: 100%; padding: 2%">
						<p style="font-size: small; ">{{$reward->description}}</p>
					</div>
					<p class="bold-black">Related Dishes:</p>

					<p class="bold-black">Redeem Period:</p>
					<p class="bold-black">Term and Condition:</p>
					<div class="container" style="background-color: #F1F1F2; width: 100%; padding: 2%;margin-bottom: 3%; overflow: hidden;">
						<p style="font-size: small; ">{!!nl2br($reward->term_cond)!!}</p>
					</div>
					<div class="container" style="background-color: #F1F1F2; width: 100%; padding: 2%; margin-top: 2%;margin-bottom: 3%">
						<p class="bold-black"><img src="{{ asset('images/file.png') }}" style="margin-right: 3%">See rules that apply to all vouchers & rewards<span style="float: right; font-size: x-large; color: #939598" class="fa fa-chevron-right"></span></p>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
@endsection