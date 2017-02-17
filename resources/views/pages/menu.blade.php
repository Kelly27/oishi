@extends('layouts.layout')

@section('content')
<div class="container breadcrumb_container">
    <ol class="breadcrumb">
      <li class="breadcrumb-item"><a href="#">Home</a></li>
      <li class="breadcrumb-item active" style="color: #929497;"><a href="#">Menu</a></li>
      <li class="breadcrumb-item active">Signature Dish</li>
    </ol>
</div>
<div class="container-fluid menu1-header">
    <h1>Menu</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a aliquet orci. Ut interdum mauris sem, non aliquet felis interdum sit amet.</p>
</div>
<div class="container">
	<h1>SIGNATURE DISH</h1>
</div>
<nav aria-label="Page navi">
  <ul class="pagination text-right">
    <li class="disabled"><a href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>
    <li class="active"><a href="#">1 <span class="sr-only">(current)</span></a></li>
  </ul>
</nav>
@endsection