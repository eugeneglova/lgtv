<?php

class VideosController extends \BaseController {

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        //
        return Response::json(array(
            array('id' => 1, 'video_url' => 'http://brb.to/get/play/2dbgee4y2zx18_hd.mp4'),
            array('id' => 2, 'video_url' => 'http://brb.to/get/play/2dbgefx2l5m0c_hd.mp4'),
            array('id' => 3, 'video_url' => 'http://brb.to/get/play/2dbgemwrjcmfw_hd.mp4'),
            array(
                'id' => 'i109uoOHk3tDAFgJNvjxx6',
                'title' => 'Дом войны',
                'original_title' => 'Warhouse',
                'description' => 'Моряк Эй Джи Бад просыпается в незнакомом доме, из которого нельзя выйти. Каждый день в одно и то же время появляется чудовище, которое пытается его убить. Не в силах найти объяснения происходящему, Бад обыскивает дом и находит дневник бывшего узника этой страшной тюрьмы',
                'genre' => array('ужасы', 'триллер'),
                'year' => '2013',
                'country' => array('Великобритания'),
                'director' => array('Люк Мэсси'),
                'actors' => array('Джозеф Морган', 'Мэтт Райан', 'Уильям Тротон', 'Аль Уивер'),
                'cover_image' => 'http://s3.dotua.org/fsua_items/cover/00/28/00/10/00280087.jpg',
                'video_url' => 'http://brb.to/get/play/2dbgxbinfw4xo_hd.mp4'
            ),
        ), 200);

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store()
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {
        //
        $row = Video::getById($id)->get()->first();
        return Response::json($row, $row ? 200 : 404);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function update($id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        //
    }

}
