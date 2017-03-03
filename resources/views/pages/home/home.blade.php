@extends('layouts.layout')

@section('content')
<div class="home">
    <div class="container-fluid nopadding">
        @include('pages.home.myCarousel')
        @include('pages.home.details')
        @include('pages.home.sig_dish')
        @include('pages.home.menu_category')
    </div>
    @include('pages.home.voucher')
    @include('pages.home.rewards')
    @include('pages.home.news-event')
</div>
@endsection