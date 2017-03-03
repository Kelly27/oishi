@extends('layouts.layout')

@section('content')
<div class="container-fluid nopadding" style="background-color: white;">
		<div class="container">
			<h3 style="font-family: OpenSansBold; color: #414042; margin-left: auto">OUR LOCATION</h3>
		</div>
		<div class="container m-nopadding">
			{{-- googlemap --}}
			<script src='https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyDzb4vXNkqC-224VqRxUdjAmEThWxADVaU'></script><div style='overflow:hidden; margin-right: auto; margin-left: auto;'><div id='gmap_canvas' style='height:300px;width:1140px;'></div><style>#gmap_canvas img{max-width:none!important;background:none!important}</style></div> <a href='https://embed-map.org/'>embed google map</a> <script type='text/javascript' src='https://embedmaps.com/google-maps-authorization/script.js?id=7081c94c61bd171919afe096e5e40aa650cc7e31'></script><script type='text/javascript'>function init_map(){var myOptions = {zoom:12,center:new google.maps.LatLng(38.834479768616994,-76.98485746193847),mapTypeId: google.maps.MapTypeId.ROADMAP};map = new google.maps.Map(document.getElementById('gmap_canvas'), myOptions);marker = new google.maps.Marker({map: map,position: new google.maps.LatLng(38.834479768616994,-76.98485746193847)});infowindow = new google.maps.InfoWindow({content:'<strong>Alexendria, VA22314</strong><br>Alexendria, VA22314<br> <br>'});google.maps.event.addListener(marker, 'click', function(){infowindow.open(map,marker);});infowindow.open(map,marker);}google.maps.event.addDomListener(window, 'load', init_map);</script>
		</div>
	<div class="container">
		<div class="row nopadding" style="margin-bottom: 3%">
			<div class="col-sm-4">
				<h3 style="font-family: OpenSansBold; color: #414042">CONTACT INFO</h3>
				<table border="0" style="width: 100%">
                    <tbody class="borderless contact-info">
                        <tr>
                            <td><img src="{{URL::to('images/home.png')}}"</td>
                            <td>
	                            <p>{!! nl2br($info->address) !!} </p>
                            </td>
                        </tr>
                        <tr>
                            <td><img src="{{URL::to('images/phone2.png')}}"</td>
                            <td><p>{{$info->office_no}}</p></td>
                        </tr>
                        <tr>
                            <td><img src="{{URL::to('images/phone3.png')}}" style="width: 15px;"></td>
                            <td><p>{{$info->mobile_no}}</p></td>
                        </tr>
                        <tr>
                            <td><img src="{{URL::to('images/mail2.png')}}"</td>
                            <td><p>{{$info->email}}</td>
                        </tr>
                    </tbody>
                </table>
			</div>
			<div class="col-sm-8">
				<h3 style="font-family: OpenSansBold; color: #414042">CONTACT US NOW</h3>
				<p style="color: #231F20">To contact us by email, please fill out the form below. Items marked [*] are required information.</p>
				@if(Session::has('message'))
					<p class="alert {{ Session::get('alert-class', 'alert-info') }}">{{ Session::get('message') }}</p>
				@endif
				@if (count($errors->all()))
				    <div class="alert alert-danger">
				        <ul>
				            @foreach ($errors->all() as $error)
				                <li>{{ $error }}</li>
				            @endforeach
				        </ul>
				    </div>
				@endif				
					<form method="POST" action="{{route('store_message')}}" novalidate>
					<div class="row">
						<div class="col-sm-4">
							<div class="form-group">
								<input type="name" id="name" name="name" class="form-control" placeholder="Name*:">
							</div>
						</div>
						<div class="col-sm-4">
							<div class="form-group">
								<input type="email" id="email" name="email" class="form-control" placeholder="Email*:">
							</div>
						</div>
						<div class="col-sm-4">
							<div class="form-group">
								<input type="phone" id="phone" name="phone" class="form-control" placeholder="Phone*:">
							</div>
						</div>
					</div>
					<div class="form-group">
						<input type="subject" id="subject" name="subject" class="form-control" placeholder="Subject*:">
					</div>
					<div class="form-group">
						<textarea rows="7" id="message" name="message" class="form-control" placeholder="Meassage*:"></textarea>
					</div>
					{{csrf_field()}}
					<button type="reset" class="btn">Clear</button>
					<button type="submit" class="btn btn-primary">Submit</button>
				</form>
			</div>
		</div>
	</div>
</div>

@endsection

