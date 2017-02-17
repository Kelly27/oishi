<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"> <!--make view for moblie-->

        <!--styles-->

        <link href="http://netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.css" rel="stylesheet">
        <link href="<?=asset('/css/app.css')?>" rel="stylesheet">
        <script src="<?=asset('/js/app.js')?>"></script>
        <link href="<?=asset('/css/styles.css')?>" rel="stylesheet">




    </head>
    <body>
        @include('partials.oishi_header')
        @yield('content')
        @include('partials.footer')


    </body>
</html>
