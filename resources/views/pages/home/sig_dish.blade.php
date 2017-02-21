<div class="container-fluid nopadding" style="background-color: #231F20;">
    <div class="row nopadding">
        <div class="col-sm-4 nopadding">
            <a href="{{URL::route('sig_menu')}}" style="color: white; font-size: xx-large; display: block; margin-top: 17%; margin-left: 12%;">SIGNATURE DISH >></a>
        </div>
        <div class="col-sm-3 nopadding">
            <div class="container sig-dish-img nopadding" style="background-image: url(<?= asset('images/img1.png')?>);">
                <a href="#" id="menu-style">IKA MARU/TERIYAKI</a>
            </div>
        </div>
        <div class="col-sm-3 nopadding">
            <div class="container sig-dish-img nopadding" style="background-image: url(<?= asset('images/img2.png')?>);">
                <a href="#" id="menu-style">CHICKEN TERIYAKI</a>
            </div>
        </div>
        <div class="col-sm-1">
            <a  href="{{URL::route('sig_menu')}}" id="seemore" style="margin-bottom: 15px">SEE MORE</a>
        </div>
    </div>
</div>