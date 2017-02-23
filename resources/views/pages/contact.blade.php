@extends('layouts.layout')

@section('content')
<div class="container-fluid" style="background-color: white;">
	<div class="container breadcrumb_container">
	    <ol class="breadcrumb">
	      <li class="breadcrumb-item"><a href="{{URL::to('/')}}">Home</a></li>
	      <li class="breadcrumb-item active">Contact Us</li>
	    </ol>
	</div>
	<div class="container-fluid menu1-header hidden-xs" style="background-image: url(images/contact-header.png )">
	    <h1>Contact Us</h1>
	    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a aliquet orci. Ut interdum mauris sem, non aliquet felis interdum sit amet.</p>
	</div>
	<div class="container">
		<h3 style="font-family: OpenSansBold; color: #414042">OUR LOCATION</h3>
		{{-- googlemap --}}
		<script src='https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyDzb4vXNkqC-224VqRxUdjAmEThWxADVaU'></script><div style='overflow:hidden;height:300px;width:1140px;'><div id='gmap_canvas' style='height:300px;width:1140px;'></div><style>#gmap_canvas img{max-width:none!important;background:none!important}</style></div> <a href='https://embed-map.org/'>embed google map</a> <script type='text/javascript' src='https://embedmaps.com/google-maps-authorization/script.js?id=7081c94c61bd171919afe096e5e40aa650cc7e31'></script><script type='text/javascript'>function init_map(){var myOptions = {zoom:12,center:new google.maps.LatLng(38.834479768616994,-76.98485746193847),mapTypeId: google.maps.MapTypeId.ROADMAP};map = new google.maps.Map(document.getElementById('gmap_canvas'), myOptions);marker = new google.maps.Marker({map: map,position: new google.maps.LatLng(38.834479768616994,-76.98485746193847)});infowindow = new google.maps.InfoWindow({content:'<strong>Alexendria, VA22314</strong><br>Alexendria, VA22314<br> <br>'});google.maps.event.addListener(marker, 'click', function(){infowindow.open(map,marker);});infowindow.open(map,marker);}google.maps.event.addDomListener(window, 'load', init_map);</script>
		<div class="row">
			<div class="col-sm-4">
				<h3 style="font-family: OpenSansBold; color: #414042">CONTACT INFO</h3>
				<table border="0" style="width: 100%">
                    <tbody class="borderless contact-info">
                        <tr>
                            <td><img src="{{URL::to('images/home.png')}}"</td>
                            <td>
	                            <p>66 South Street, <br>Window 6 WonderLand, xxxx <br>xxxxx, xxxxxxxxxxxxxx </p>
                            </td>
                        </tr>
                        <tr>
                            <td><img src="{{URL::to('images/phone2.png')}}"</td>
                            <td><p>082-577168</p></td>
                        </tr>
                        <tr>
                            <td><img src="{{URL::to('images/phone3.png')}}" style="width: 15px;"></td>
                            <td><p>082-462569</p></td>
                        </tr>
                        <tr>
                            <td><img src="{{URL::to('images/mail2.png')}}"</td>
                            <td><p>oishi@gmail.com</td>
                        </tr>
                    </tbody>
                </table>
			</div>
			<div class="col-sm-8">
				<h3 style="font-family: OpenSansBold; color: #414042">CONTACT US NOW</h3>
				<p style="color: #231F20">To contact us by email, please fill out the form below. Items marked [*] are required information.</p>
				<form method="POST">
					<div class="row">
						<div class="col-sm-4" style="padding-left: 0px">
							<div class="form-group">
								<input type="name" id="name" name="name" class="form-control" placeholder="Name*:">
							</div>
						</div>
						<div class="col-sm-4">
							<div class="form-group">
								<input type="email" id="email" name="email" class="form-control" placeholder="Email*:">
							</div>
						</div>
						<div class="col-sm-4" style="padding-right: 0px">
							<div class="form-group">
								<input type="phone" id="phone" name="phone" class="form-control" placeholder="Phone*:">
							</div>
						</div>
						<div class="form-group">
							<input type="subject" id="subject" name="subject" class="form-control" placeholder="Subject*:">
						</div>
						<div class="form-group">
							<input type="text" id="message" name="message" class="form-control" placeholder="Meassage*:">
						</div>
					</div>
					
				</form>
			</div>
		</div>
	</div>
</div>

@endsection

