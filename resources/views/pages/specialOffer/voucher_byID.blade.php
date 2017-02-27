@extends('layouts.layout')

@section('content')
<div class="container-fluid" style="background-color: white;">
	<div class="container breadcrumb_container">
	    <ol class="breadcrumb">
	      <li class="breadcrumb-item"><a href="{{URL::to('/')}}">Home</a></li>
	      <li class="breadcrumb-item">Special Offer</li>
	      <li class="breadcrumb-item">Voucher</li>
	      <li class="breadcrumb-item active">{{$voucher->title}}</li>
	    </ol>
	</div>
</div>
<div class="container-fluid menu1-header hidden-xs" style="background-image: url(<?=asset('images/voucher-header.png')?> )">
    <h1>Vocuher</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a aliquet orci. Ut interdum mauris sem, non aliquet felis interdum sit amet.</p>
</div>
<div class="container-fluid m-nopadding " style="background-color: white">
	<div class="container m-nopadding " style="margin-top: 2%;">
		<div class="row nopadding">
			<div class="col-sm-6 m-nopadding">
				<div class="container nopadding" style="width:initial;">
					<img src="{{ asset('images') }}/{{$voucher->image}}" class="img-responsive" style="margin-right:auto; margin-left:auto; width:100%">
					@if($voucher->tag===1)
						<p id="free">FREE</p>
					@elseif ($voucher->tag===2)
						<p id="free">50%<span> OFF</span></p>
					
					@endif
				</div>
				<div class="container text-center" id="color4d" style="background-color: #F1F1F2; width: initial; margin-top: 2%; margin-bottom: 3%">
					<h3 style="color: #333333">{{$voucher->title}}</h3>
					@if ($voucher->is_cv === 1)
						<p style="font-size: small;">Worth: <span style="color: #C1272D; font-size: x-large;">RM {{number_format($voucher->ori_price,2)}}</p>
					@else
						<p style="font-size: small;">Now: <span style="color: #C1272D; font-size: x-large;">RM {{number_format($voucher->dis_price,2)}} </span> <span style="text-decoration: line-through;">RM{{number_format($voucher->ori_price,2)}}</span></p>
					@endif
					<p style="font-weight: bold">Group Voucher ({{$voucher->group_of}} person)</p>
					<p style="font-weight: bold">Expiry Date: {{$voucher->expirydate}}</p>
					<div class="checkbox checkbox-slider--b-flat" style="width: 150px;margin-left: auto;margin-right: auto;">
						<label>
							<input type="checkbox" checked=""><span>Deal is on!</span>
						</label>
					</div>
					<p>Time Remain</p>
					<p><span id="clock" style="color: red; font-size:x-large;"></span></p>
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
									<td>The G Cafe @ {{$location->location_name}} <a href="#" data-target="#adspopup" data-toggle="modal"<span style="float: right; font-size: x-large; color: #939598" class="fa fa-chevron-right"></span></a></td>
								</tr>
							@endforeach
						</tbody>
					</table>
					<p class="bold-black">Description:</p>
					<div class="container" style="background-color: #F1F1F2; width: 100%; padding: 2%">
						<p style="font-size: small; ">{{$voucher->description}}</p>
					</div>
					<p class="bold-black">Redeem Dish:</p>
					<div class="container" style="background-color: #F1F1F2; width: 100%; padding: 2%;margin-bottom: 3%">
						<p style="font-size: small; ">{{$voucher->redeem_dish}}<a href="#" data-target="#adspopup" data-toggle="modal"<span style="float: right; font-size: x-large; color: #939598" class="fa fa-chevron-right"></span></a></p>
					</div>
					<p class="bold-black">Redeem Period:</p>
					<p class="bold-black">Term and Condition:</p>
					<div class="container" style="background-color: #F1F1F2; width: 100%; padding: 2%;margin-bottom: 3%; overflow: hidden;">
						<p style="font-size: small; ">{{$voucher->term_cond}}</p>
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

<script src="{{ asset('js/jquery.countdown.min.js') }}"></script>
<script>
var date ={!!json_encode($voucher->expirydate)!!}
date.replace(/-/g, "/");
console.log(date);
$('#clock').countdown(date, function(event) {
  $(this).html(event.strftime('%D days %H:%M:%S'));
});
</script>

@endsection


