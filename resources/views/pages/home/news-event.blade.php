<div class="container-fluid text-center m-nopadding" id="home-red">
        <h3 style="font-family: OpenSans">OUR NEWS AND EVENTS</h3>
        <p style="font-family: OpenSans">We are here to share with you every news and events we organized.</p>
        @if ($newsEvents->count()===0)
            <h1 class="text-center" style="color: white">CURRENTLY THERE IS NO NEWS EVENTS.</h1>
        @else
            <div class="container">
                <div class="row imagecenter">
                    @foreach ($newsEvents as $newsEvent)
                        <div class="col-sm-4 m-nopadding">
                            <a href="{{ url('about/news_event/'. $newsEvent->id) }}"><div class="container m-nopadding" style="background-image: url(images/{{$newsEvent->image}}); max-width: 100%; width: 400px; height: 200px; background-size: cover">
                            </div></a>
                            <a href="{{ url('about/news_event/'. $newsEvent->id) }}"><p style="color: white">{{$newsEvent->title}}</p></a>
                        </div>
                    @endforeach
                </div>
                <div class="row">
                    <div class="col-sm-12 text-right" style="margin: 5px 0px 5px">
                        <a href="{{ route('news_event') }}" style="color: #1B75BB; font-weight: bold; font-family: Arial;">SEE MORE >></a>
                    </div>
                </div>
            </div>
        @endif
    </div>
</div>