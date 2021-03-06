@extends('layouts.layout')

@section('content')
<div class="container-fluid m-nopadding" style="background-color: white">
	<div class="container m-nopadding" style="margin-top: 2%;">
		<div class="row nopadding">
			<div class="col-sm-8">
				@if ($vouchers->count()===0)
	                <h1 class="alert alert-danger">CURRENTLY THERE IS NO VOUCHER AVAILABLE.</h1>
	            @else
				<div class="row">
					@foreach ($vouchers as $voucher)
						<div class="col-sm-6 m-nopadding imagecenter" id="padding25" style="margin-top: 2%; display: table;margin: auto; max-height: 326px; overflow: hidden;">
							<a href="{{route('voucher.id', ['id' => $voucher->id])}}"><div class="container" style="background-color: #F1F1F2; background-image: url(../images/{{$voucher->image}}); height:240px; background-size: cover; max-width: 349px; min-width: 320px; background-repeat: no-repeat; "></div></a>
							<div style="background-color: #F1F1F2; padding: 3% 5% 1%; margin-bottom: 4%">
								<a href="{{route('voucher.id', ['id' => $voucher->id])}}"><h6 class="eli-1line" style="color: initial;font-weight:bold; margin:0px;">{{$voucher->title}}</h6></a>
				                <p style="font-size:x-small; ">{{$voucher->sold}} Bought | {{$voucher->availability}}</p>
				                <p class="nopadding text-right" style="font-size: x-small;text-decoration: line-through; color: #6D6E71">RM{{number_format($voucher->ori_price, 2)}}</p>
				                <p style="color: #EC1C24; font-weight: bold; margin-top: 0px; text-align: right;">
		                        @if ($voucher->from === 1)
		                            <span style="font-size: x-small;">From </span>
		                        @endif 
		                        RM{{number_format($voucher->dis_price,2)}}</p>
							</div>
						</div>
					@endforeach
					<div class="col-sm-12">
						<div class="text-right">
							{{$vouchers->render()}}
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