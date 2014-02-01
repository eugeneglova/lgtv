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
$environment = !strstr($_SERVER['HTTP_HOST'], 'app.') ? 'dist' : 'app';

// Get file path based on environment
$index_file = __DIR__ . '/../../' . $environment . '/index.html';

// Route group for API versioning
Route::group(array('prefix' => 'api/v1'), function()
{
    Route::resource('videos', 'VideosController');
});

// Push state urls support
Route::get('/', function() use ($index_file)
{
    readfile($index_file);
});
