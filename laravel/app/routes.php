<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

// Get environment name
$environment = strstr($_SERVER['HTTP_HOST'], 'app.') ? 'app' : 'dist';

// Get file path based on environment
$index_file = __DIR__ . '/../../' . $environment . '/index.html';

// Push state urls support
Route::get('/', function() use ($index_file)
{
    readfile($index_file);
});
