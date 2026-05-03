<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::view('/{path?}', 'application')
    ->where('path', '^(?!api|storage).*$');
