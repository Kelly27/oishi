<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"> <!--make view for moblie-->

        <!--styles-->
        <link href="{{ asset('css/switch.css') }}" rel="stylesheet">
        <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-switch/3.3.3/js/bootstrap-switch.min.js" rel="stylesheet">
        <link href="http://netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.css" rel="stylesheet">
        <link href="{{asset('css/app.css')}}" rel="stylesheet">
        <link href="{{asset('css/styles.css')}}" rel="stylesheet">
        <script src="{{asset('js/app.js')}}"></script>
        <script src="{{ asset('/js/masonry.pkgd.min.js') }}"></script>
        <link rel="stylesheet" href="{{ asset('css/blueimp-gallery.min.css') }}">
        
        <title>Oishi</title>
        <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png">
        <link rel="icon" href="{{ asset('oishi.png') }}">

    </head>
    <body>
        @include('partials.oishi_nav')
        @if(count(Request::segments()) > 0)
            @include('partials.breadcrumb')
            @include('partials.header')
        @endif
        @yield('content')
        
        <script src="{{ asset('/js/blueimp-gallery.min.js') }}"></script>
        <script>
        document.getElementById('links').onclick = function (event) {
            event = event || window.event;
            var target = event.target || event.srcElement,
                link = target.src ? target.parentNode : target,
                options = {index: link, event: event},
                links = this.getElementsByTagName('a');
            blueimp.Gallery(links, options);
        };
        </script>
        <script>
        blueimp.Gallery(
            document.getElementById('links').getElementsByTagName('a'),
            {
                container: '#blueimp-gallery-carousel',
                carousel: true
            }
        );
        </script>
        @include('partials.footer')
    </body>
</html>
