@extends('errors::minimal')

@section('title', __('Nicht authorisiert'))
@section('code', '401')
@section('message', __('Du bist nicht authorisiert, diesen Bereich der Website zu besuchen'))
