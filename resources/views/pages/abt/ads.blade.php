<a href="#" data-target="#adspopup" data-toggle="modal">
	<div class="container text-center" style="display: table; width:inherit; color:#BCBEC0; border: solid; border-width: thin; border-radius: 20px; margin-bottom: 5%; padding: 25px;">
	
	    <p style="color: black; font-size: large;">Download<br>         
	    <span style="font-weight: bold;">Teaspoon Free App</span> <br> and enjoy the full feature today!</p>
	    <div class="container" style="background-image: url(<?= asset('images/ads.png')?>); height: 276px; width: 151px; max-width: 100%; background-position: center; margin-bottom: 15px;"></div>
	    <p style="color: #58595B">AVAILABLE ON</p>
	    <img style="background-image: url(<?= asset('images/google-play-badge.png')?>); width: 128px; height: 38px;border-radius: 8px; margin-bottom: 5px;" href="#">
	    <img style="background-image: url(<?= asset('images/app-store-badge.png')?>); width: 128px; height: 38px;border-radius: 8px;" href="#">
	</div>
</a>
<div id="adspopup" class="modal fade">
	<div class="modal-dialog">
		<div class="modal-content text-center" style="background-image: url(<?= asset('images/adspopup.png')?>); background-repeat: no-repeat; width:84%;">
			<p style="margin-top: 3%;line-height: initial;color: black; font-size: large;">Enjoy Full Features with <br><span style="font-weight: bold">Teaspoon Free App</span><br>Today!</p>
			<img src="{{ asset('images/ads.png') }} " class="img-responsive" style="margin-left: auto; margin-right: auto;">
			<div class="container" style="position:absolute; background-color: white; border-radius: 7px;bottom: 0%;width: 100%;height: 16%;"> 
				<a href="#"> <img style="background-image: url(<?= asset('images/google-play-badge.png')?>); width: 128px; height: 38px;border-radius: 8px; margin-bottom: 5px; margin-top: 3%"></a>
				<a href="#"><img style="background-image: url(<?= asset('images/app-store-badge.png')?>); width: 128px; height: 38px;border-radius: 8px; margin-top: 3%" href="#"></a>
			</div>
		</div>
	</div>
</div>
