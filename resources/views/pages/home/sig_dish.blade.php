<div class="container-fluid nopadding" style="background-color: #231F20;">
    <div class="row nopadding">
        <div class="col-sm-4 nopadding">
            <a href="{{URL::route('sig_menu')}}" style="color: white; font-size: xx-large; display: block; margin-top: 17%; margin-left: 12%;">SIGNATURE DISH >></a>
        </div>
        <div class="col-sm-3 nopadding">
            <div class="container sig-dish-img nopadding" style="background-image:  url(<?= asset('images')?>/{{$menu1->menu_img}});">
                <a style="text-transform: uppercase; -webkit-line-clamp: 1; overflow: hidden;"href="{{ url('menu/'. $menu1->id) }}" id="menu-style">{{$menu1->menu_name}}</a>
            </div>
        </div>
        <div class="col-sm-3 nopadding">
            <div class="container sig-dish-img nopadding" style="background-image: url(<?= asset('images')?>/{{$menu2->menu_img}}); ">
                <a style="text-transform: uppercase; -webkit-line-clamp: 1; overflow: hidden;" href="{{ url('menu/'. $menu2->id) }}" id="menu-style">{{$menu2->menu_name}}</a>
            </div>
        </div>
        <div class="col-sm-1">
            <a  href="{{URL::route('sig_menu')}}" id="seemore" style="margin-bottom: 15px">SEE MORE</a>
        </div>
    </div>
</div>