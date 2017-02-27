<div class="container-fluid" style="background-color: #F1F1F2">
    <div class="container m-nopadding">
        <h4 style="font-weight:bold; text-align: center">VOUCHERS</h2>
        <div class="row">
            @foreach ($vouchers as $voucher)
                <div class="col-sm-4 m-nopadding">
                    <div class="container" id="voucher-cont">
                    <div style="max-height: 244px; overflow: hidden;">
                        <img src="{{ asset('images') }}/{{$voucher->image}}" class="img-responsive">
                    </div>
                    
                        <h6 style="font-weight:bold; margin-bottom:0px;text-transform: uppercase;">{{$voucher->title}}</h6>
                        @if ($voucher->tag === 1)
                            <h5 id="red-tag">FREE</h5>
                        @elseif($voucher->tag === 2)
                            <h5 id="red-tag" style="display: -webkit-inline-box; font-size: 18px;">50 <span style="color: white;font-size: 9px; display: table-caption;padding-left: 12%"> % OFF</span></h5>
                        @endif
                        
                        <p class="nopadding" style="font-size:x-small;">{{$voucher->sold}} Bought | {{$voucher->availability}}</p>
                        <p class="nopadding text-right" style="font-size: x-small;text-decoration: line-through; color: #6D6E71">RM{{number_format($voucher->ori_price,2)}}</p>
                        <p style="color: #EC1C24; font-weight: bold; margin-top: 0px; text-align: right;">
                        @if ($voucher->from === 1)
                            <span style="font-size: x-small;">From </span>
                        @endif 
                        RM{{number_format($voucher->dis_price,2)}}</p>
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
</div>