@extends('layouts.layout')

@section('content')
<div class="home">
    <div class="container-fluid nopadding">
        @include('pages.home.myCarousel')
        <div class="container-fluid" id="home-red">
            <h2 style="font-weight: bolder; font-size: xx-large">We are Offering Loyalty Program</h2>
            <p>Enjoy great dining with us today!</p>
        </div>
        <div class="container" id="dash-red">
            <p style="margin-top: 10px;">PRIVILEGE DISCOUNTS</p>
            <table style="margin: auto;">
                <tbody>
                    <tr>
                        <td >GET  </td>
                        <td id="twentypercent" >20</td>
                        <td><span style="font-size:60px"> % </span><br><span style= "vertical-align: top; font-size: 25px; margin: 0;"> OFF </span></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="container" style="font-family: Arial;">
            <h1>BASIC INFORMATION</h1>
            <div class="row">
                <div class="col-sm-7">
                    <table id="padding">
                        <tbody>
                            <tr>
                                <td><img src="{{URL::to('images/list.png')}}" style="margin-top: -45px;"></td>
                                <td>
                                    <h3>DESCRIPTION</h3>
                                    <p style="text-align: justify;"></p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="col-sm-5">
                    <table id="padding">
                        <tbody>
                            <tr>
                                <td><img src="{{URL::to('images/tag.png')}}"></td>
                                <td><h3>TAGS</h3>
                                    <div class="row">
                                        <div class="col-sm-4" style="width: inherit;">
                                            <p><img src="{{URL::to('images/remove.png')}}">
                                            Air Conditioner </p>
                                        </div>
                                        <div class="col-sm-4" style="width: inherit;">
                                            <p><img src="{{URL::to('images/ok.png')}}">
                                            Wifi </p>
                                        </div>
                                        <div class="col-sm-4" style="width: inherit;">
                                            <p><img src="{{URL::to('images/ok.png')}}">
                                            Delivering</p>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        @include('pages.home.sig_dish')
        {{-- img5 --}}
        <div class="container visible-xs" style="background-color:  #231F20; border-top: solid;border-color: white;border-width: thin;"">
            <h3 style="font-weight: inherit; color: white">CATEGORY</h3>
        </div>
        <div class="container-fluid nopadding" id="img-container-id">
            <div class="container nopadding img-container" style="background-image: url(images/img5.png);">
                <div class="overlay">
                    <a href="#">STARTERS</a>
                </div>
            </div>
            <div class="container nopadding img-container" style="background-image: url(images/img6.png);">
                <div class="overlay">
                    <a href="#">MAIN COURSES</a>
                </div>
            </div>
            <div class="container nopadding img-container" style="background-image: url(images/img7.png);">
                <div class="overlay">
                    <a href="#">DESSERTS</a>
                </div>
            </div>
            <div class="container nopadding img-container" style="background-image: url(images/img8.png);">
                <div class="overlay">
                    <a href="#">DRINKS</a>
                </div>
            </div>
        </div>
    </div>
    @include('pages.home.voucher')
    @include('pages.home.rewards')
    @include('pages.home.news-event')
</div>
@endsection