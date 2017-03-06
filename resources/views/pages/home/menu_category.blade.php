<div class="visible-xs">
    <h3>Category</h3>
</div>
<div class="container-fluid nopadding" id="img-container-id">
    <div class="container nopadding img-700px" style="background-image: url(<?= asset('images/img5.png')?>);">
        <div class="overlay">
            <a href="{{URL::route('menu.index',['menu_type' => 'starters'])}}">STARTERS</a>
        </div>
    </div>
    <div class="container nopadding img-700px" style="background-image: url(<?= asset('images/img6.png')?>);">
        <div class="overlay">
            <a href="{{URL::route('menu.index',['menu_type' => 'starters'])}}">MAIN COURSES</a>
        </div>
    </div>
    <div class="container nopadding img-700px" style="background-image: url(<?= asset('images/img7.png')?>);">
        <div class="overlay">
            <a href="#">DESSERTS</a>
        </div>
    </div>
    <div class="container nopadding img-700px" style="background-image: url(<?= asset('images/img8.png')?>);">
        <div class="overlay">
            <a href="#">DRINKS</a>
        </div>
    </div>
</div>