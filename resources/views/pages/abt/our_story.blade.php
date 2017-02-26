@extends('layouts.layout')

@section('content')
<div class="container-fluid" style="background-color: white;">
	<div class="container breadcrumb_container">
	    <ol class="breadcrumb nomarginbottom">
	      <li class="breadcrumb-item"><a href="{{URL::to('/')}}">Home</a></li>
	      <li class="breadcrumb-item active">About Us</li>
	      <li class="breadcrumb-item active">Our Story</li>
	    </ol>
	</div>
</div>
<div class="container-fluid aboutus-header" style="background-image: url(../images/aboutus-header.png)">
    <h1>OUR STORY</h1>
    <p>Oishi Japanese Restaurant is the most complete and trusted coporate and business on the market.</p>
</div>
<div class="container-fluid" style="background-color: white;">
	@include('pages.abt.board-director')
</div>
@include('pages.abt.chef')

@endsection