@extends('errors::minimal')

@section('title', __('Verboten'))
@section('code', '403')
@section('message', __($exception->getMessage() ?: 'Du darfst diesen Bereich der Website nicht besuchen'))
