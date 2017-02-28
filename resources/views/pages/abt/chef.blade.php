<div class="container text-center">
    <h1>Our Chefs</h1>
    <div class="row">
        @foreach ($chefs as $chef)
            <div class="col-sm-3 chef">
                <img src="{{ asset('images') }}/{{$chef->image}}" class="img-responsive">
                <h5 style="font-weight: bold;">{{$chef->name}}</h5>
                <h6 style="color: #BBBDBF;">{{$chef->position}}</h6>
                <p class="eli-3line" style="color: #6D6E70;">{{$chef->description}}</p>
            </div>
        @endforeach
    </div>
</div>