<div class="container">
    <h4 style="font-weight:bold; text-align: center">REWARDS</h2>
    <div class="row">
        @foreach ($rewards as $reward)
            <div class="col-sm-4 m-nopadding">
                <div class="container reward-cont" >
                    <div style="max-height: 240px; overflow: hidden;">
                        <img src="{{ asset('images') }}/{{$reward->image}}" class="img-responsive">
                        @if ($reward->tag === 1)
                            <h5 id="red-tag">FREE</h5>
                        @elseif($reward->tag === 2)
                            <h5 id="red-tag" style="display: -webkit-inline-box; font-size: 18px;">50 <span style="color: white;font-size: 9px; display: table-caption;padding-left: 12%"> % OFF</span></h5>
                        @endif
                    </div>
                    <a href="#" style="font-weight: bold; color: black;"><img src="{{URL::to('images/hand.png')}}" style="margin: 10px"> {{$reward->title}}</a>
                </div>
            </div>
        @endforeach
    </div>
    <div class="row">
        <div class="col-sm-12 text-right" style="margin: 5px 0px 5px">
            <a href="#" style="color: #1B75BB; font-weight: bold; font-family: Arial;">SEE MORE >></a>
        </div>
    </div>
</div>