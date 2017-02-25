@extends('layouts.layout')

@section('content')
<div class="container">
    <div class="row">
	<div class="col-sm-3">
		<h5>Default</h5>
		<div class="checkbox checkbox-slider--b-flat">
			<label>
				<input type="checkbox"><span>Default</span>
			</label>
		</div>
		<div class="checkbox checkbox-slider--b-flat">
			<label>
				<input type="checkbox" checked=""><span>checked</span>
			</label>
		</div>
		<div class="checkbox checkbox-slider--b-flat">
			<label>
				<input type="checkbox" disabled=""><span>disabled</span>
			</label>
		</div>
		<div class="checkbox checkbox-slider--b-flat">
			<label>
				<input type="checkbox" disabled="" checked=""><span>disabled checked</span>
			</label>
		</div>
	</div>
	<div class="col-sm-3">
		<h5>Small</h5>
		<div class="checkbox checkbox-slider--b-flat checkbox-slider-sm">
			<label>
				<input type="checkbox"><span>small</span>
			</label>
		</div>
		<div class="checkbox checkbox-slider--b-flat checkbox-slider-sm">
			<label>
				<input type="checkbox" checked=""><span>checked</span>
			</label>
		</div>
	</div>
	<div class="col-sm-3">
		<h5>Medium</h5>
		<div class="checkbox checkbox-slider--b-flat checkbox-slider-md">
			<label>
				<input type="checkbox"><span>medium</span>
			</label>
		</div>
		<div class="checkbox checkbox-slider--b-flat checkbox-slider-md">
			<label>
				<input type="checkbox" checked=""><span>checked</span>
			</label>
		</div>
	</div>
	<div class="col-sm-3">
		<h5>Large</h5>
		<div class="checkbox checkbox-slider--b-flat checkbox-slider-lg">
			<label>
				<input type="checkbox"><span>large</span>
			</label>
		</div>
		<div class="checkbox checkbox-slider--b-flat checkbox-slider-lg">
			<label>
				<input type="checkbox" checked=""><span>checked</span>
			</label>
		</div>
	</div>
</div>
</div>

@endsection
<span id="clock"></span>
<script src="{{ asset('js/jquery.countdown.min.js') }}"></script>
<script>
$('#clock').countdown('2020/10/10', function(event) {
  $(this).html(event.strftime('%D days %H:%M:%S'));
});	
</script>