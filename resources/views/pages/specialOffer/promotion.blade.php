@extends('layouts.layout')

@section('content')
<div class="container-fluid" style="background-color: white;">
	<div class="container breadcrumb_container">
	    <ol class="breadcrumb">
	      <li class="breadcrumb-item"><a href="{{URL::to('/')}}">Home</a></li>
	      <li class="breadcrumb-item">Special Offer</li>
	      <li class="breadcrumb-item active">Promotion</li>
	    </ol>
	</div>
</div>
<div class="container-fluid menu1-header hidden-xs" style="background-image: url(<?=asset('images/reward-header.png')?> )">
    <h1>Promotion</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a aliquet orci. Ut interdum mauris sem, non aliquet felis interdum sit amet.</p>
</div>
<div class="container-fluid m-nopadding " style="background-color: white">
	<div class="container m-nopadding" style="margin-top: 2%;">
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

{{-- <div class="col-sm-4 nopadding imagecenter promo">
				<h1 class="text-right">UNLIMITED ROYAL TREAT</h1>
				<p class="text-justify">Dine like a king! Experience the glory of the royal palace pf and ancient Sukhothai Kingdon with exclusive all-you-can eat set menu served at the most authentic Thai cuisine restaurant in town.</p>
				<br>
				<p>Only Rp 149.999.-net per person</p>
				<br>
				<img src="{{ asset('images/promo2.png') }}" class="img-responsive">
				<p class="text-center">Sukhothai Restaurant | 6th floor
				<br>
				+62 21 626 3001 Ext. 4605
				</p>
				<br>
				<h1>THAI MANGO DELIGHT</h1>
				<p class="text-justify" >Experience the most scrumptious creative Thai menu ever! Uniquely made from fresh ripe mango, creatively prepared in authentic Thai style!</p>
				<br>
				<p>Starting form Rp 65.000,-++ per menu</p>
			</div> --}}