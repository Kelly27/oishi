<nav class="navbar navbar-inverse" style="border-radius: 0px; margin-bottom: 0px;">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <img src="{{URL::to('images/oishi.png')}}" style="height:50px" href="#">
        </div>
        <div id="navbar" class="navbar-collapse navbar-right collapse">
          <ul class="nav navbar-nav">
            <li class="active"><a href="{{URL::to('/')}}">Home</a></li>
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">About Us<span class="caret"></span></a>
              <ul class="dropdown-menu">
                <li><a href="{{URL::route('our_story')}}">Our Story</a></li>
                <li><a href="{{URL::route('gallery')}}">Photo Gallery</a></li>
                <li><a href="{{URL::route('career')}}">Careers</a></li>
                <li><a href="{{URL::route('news_feed')}}">News Feed</a></li>
                <li><a href="{{URL::route('news_event')}}">News and Event</a></li>
              </ul>
            </li>
            <li><a href="{{URL::route('menu_home')}}">Menu</a></li>
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button">Special Offer<span class="caret"></span></a>
              <ul class="dropdown-menu">
                <li><a href="{{route('voucher')}}">Voucher</a></li>
                <li><a href="#">Reward</a></li>
                <li><a href="#">Promotion</a></li>
              </ul>
            </li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div><!--/.nav-collapse -->
      </div><!--/.container-fluid -->
    </nav>