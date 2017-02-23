@extends('layouts.layout')

@section('content')
<div class="container-fluid" style="background-color: white;">
	<div class="container breadcrumb_container">
	    <ol class="breadcrumb">
	      <li class="breadcrumb-item"><a href="{{URL::to('/')}}">Home</a></li>
	      <li class="breadcrumb-item active">Special Offer</li>
	      <li class="breadcrumb-item active">Voucher</li>
	    </ol>
	</div>
</div>
<div class="container-fluid menu1-header hidden-xs" style="background-image: url(../images/voucher-header.png)">
    <h1>Menu</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a aliquet orci. Ut interdum mauris sem, non aliquet felis interdum sit amet.</p>
</div>
<div class="container-fluid m-nopadding" style="background-color: white">
	<div class="container m-nopadding" style="margin-top: 2%;">
		<div class="row">
			<div class="col-sm-8">
			<div class="row">
				@foreach ($vouchers as $voucher)
					<div class="col-sm-6 m-nopadding imagecenter" style="margin-top: 2%;">
						<img src="{{ asset('images') }}/{{$voucher->image}}" class="img-responsive">
						<div style="background-color: #F1F1F2; padding: 3% 5% 1%">
							<h6 style="font-weight:bold; margin:0px;">{{$voucher->title}}</h6>
			                <p style="font-size:x-small; ">{{$voucher->sold}} Bought | {{$voucher->availability}}</p>
			                <p class="nopadding text-right" style="font-size: x-small;text-decoration: line-through; color: #6D6E71">RM{{number_format($voucher->ori_price, 2)}}</p>
			                <p style="color: #EC1C24; font-weight: bold; margin-top: 0px; text-align: right;"><span style="font-size: x-small;">From </span> RM{{number_format($voucher->dis_price,2)}}</p>
						</div>
					</div>
				@endforeach
				<div class="text-right">
					{{$vouchers->render()}}
				</div>
			</div>
			</div>
			<div class="col-sm-4">
				@include('pages.abt.ads')
			</div>
		</div>
	</div>
</div>
@endsection