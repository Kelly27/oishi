@extends('layouts.layout')

@section('content')
{!! Form::open(['url' => '/']) !!}
{!! Form::text('name', '', ['placeholder' => 'Name']) !!}
{!! Form::submit('Register') !!}
{!! Form::close() !!}

@endsection
