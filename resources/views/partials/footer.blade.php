<?php 
use Illuminate\Support\Facades\DB;

$openingHours = DB::table('opening_hours')->get();
$info = DB::table('get_in_touches')->first();
?>

<div class="footer-area">
    <div class="container" >
        <div class="row" style="vertical-align: middle;">
            <div class="col-sm-4">
                <h3>OPENING HOURS</h3>
                <table class="table">
                    <tbody>
                        @foreach ($openingHours as $openingHour)
                        <tr>
                            <td>
                            <?php 
                                $days = explode(", ", $openingHour->day);
                                $i;
                                for ($i =0; $i < sizeof($days); $i++) {
                                    if($days[$i] === '1') $days[$i] = "Monday";
                                    elseif($days[$i] === '2') $days[$i] = "Tuesday";
                                    elseif($days[$i] === '3') $days[$i] = "Wednesday";
                                    elseif($days[$i] === '4') $days[$i] = "Thursday";
                                    elseif($days[$i] === '5') $days[$i] = "Friday";
                                    elseif($days[$i] === '6') $days[$i] = "Saturday";
                                    elseif($days[$i] === '7') $days[$i] = "Sunday";
                                };
                                $days = implode(" \n", $days)
                            ?>
                            {!!nl2br($days)!!}
                            </td>
                            <td>{{$openingHour->time}}</td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
            <div class="col-sm-4">
                <div class="quick-link">
                    <h3>QUICK LINKS</h3>
                        <i class="fa fa-chevron-right"></i><a href="{{URL::route('menu_home')}}">MENU</a>
                        <hr>
                        <i class="fa fa-chevron-right"></i><a href="{{ route('voucher') }}">VOUCHER</a>
                        <hr>
                        <i class="fa fa-chevron-right"></i><a href="{{ route('reward') }}">REWARD</a>
                        <hr>
                        <i class="fa fa-chevron-right"></i><a href="{{ route('promotion') }}">PROMOTION</a>
                        <hr>
                        <i class="fa fa-chevron-right"></i><a href="{{ route('news_feed') }}">NEWS FEED</a>
                </div>
            </div>
            <div class="col-sm-4">
                <h3>GET IN TOUCH</h3>
                <table class="table">
                    <tbody class="borderless">
                        <tr>
                            <td><img src="{{URL::to('images/home.png')}}"</td>
                            <td><p>{!! nl2br($info->address) !!}</p></td>
                        </tr>
                        <tr>
                            <td><img src="{{URL::to('images/phone.png')}}"</td>
                            <td><p>Office No.: {{$info->office_no}} <br>Mobile No.: {{$info->mobile_no}}</p></td>
                        </tr>
                        <tr>
                            <td><img src="{{URL::to('images/mail.png')}}"</td>
                            <td><p>{{$info->email}}</td>
                        </tr>
                    </tbody>
                </table>
                <div class="row">
                    <div class="btn-social-icon" >
                    <ul>
                        <li><a href="http://facebook.com/"><i class="fa fa-facebook"></i></a></li>
                        <li><a href="http://plus.google.com/"><i class="fa fa-google-plus"></i> </a></li>
                        <li><a href="http://instagram.com/"><i class="fa fa-instagram"></i></a></li>
                        <li><a href="http://twitter.com/"><i class="fa fa-twitter"></i></a></li>
                    </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
