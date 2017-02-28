<div class="container text-left board-director">
    <h1 class="text-center">Board of directors</h1>
    <div class="row">
        @foreach ($directors as $director)
        <div class="col-sm-6 col-md-4">
            <div class="row" style="display: table">
                <div class="col-xs-5">
                    <img src="{{URL::to('images/profilepic.png')}}" class="img-responsive">
                </div>
                <div class="col-xs-7" style="position: relative; bottom: 14px;">
                    <h3>{{$director->name}}</p>
                    <h4>{{$director->position}}</p>
                    <hr class="nopadding " style="border-color: red; border-width: 10px; width:70px">
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12 paragraph">
                    <p class="eli-4line" style="margin-bottom: 7px">{{$director->description}}</p>
                </div>
            </div>
        </div>
        @endforeach
    </div>
</div>