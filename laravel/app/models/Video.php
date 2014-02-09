<?php

class Video {

    public static function getList() {
        $videos = array();

        $data = json_decode(file_get_contents('http://brb.to/video/films/?scrollload=1&view=list&start=0&length=15'));

        if (preg_match_all('/<a class="subject-link" href="\/video\/films\/(?P<id>[^-]+)[^"]+"[^>]*>\s*<img src="(?P<cover_image>[^"]+)"\s*alt=\'(?P<title>[^\']+)\'[^>]*>.*<span>(?P=title)<p>(?<original_title>[^>]+)<\/p><p>\((?<year>[^>]+)\)<\/p><\/span>/s', $data->content, $matches)) {
            foreach ($matches['id'] as $index => $id) {
                $video = array(
                    'id'                => $id,
                    'cover_image'       => $matches['cover_image'][$index],
                    'title'             => $matches['title'][$index],
                    'original_title'    => $matches['original_title'][$index],
                    'year'              => $matches['year'][$index],
                );
                $videos[] = $video;
            }
        }

        return $videos;
    }

    public static function getById($id) {
        $video = array(
            'id' => $id
        );

        $content = file_get_contents('http://brb.to/video/films/' . $id);

        if (preg_match('/<span itemprop="name">([^<]+)/', $content, $matches)) {
            $video['title'] = trim($matches[1]);
        }

        if (preg_match('/<span itemprop="alternativeHeadline">([^<]+)/', $content, $matches)) {
            $video['original_title'] = trim($matches[1]);
        }

        if (preg_match('/<a class="images-show[^>]+>\s*<img src="([^"]+)/', $content, $matches)) {
            $video['cover_image'] = trim($matches[1]);
        }

        if (preg_match_all('/<span itemprop="genre"><a[^>]*><span>([^<]+)/', $content, $matches)) {
            $video['genre'] = array();
            foreach ($matches[1] as $key => $value) {
                $video['genre'][] = trim($value);
            }
        }

        if (preg_match('/<a href="\/video\/films\/year\/[^<]+><span>([^<]+)/', $content, $matches)) {
            $video['year'] = trim($matches[1]);
        }

        if (preg_match('/<span class="tag-country-flag"[^<]+><\/span>&nbsp;([^<]+)/', $content, $matches)) {
            $video['country'] = trim($matches[1]);
        }

        if (preg_match('/<span itemprop="director"[^<]+><span itemprop="name">([^<]+)/', $content, $matches)) {
            $video['director'] = trim($matches[1]);
        }

        if (preg_match_all('/<span itemprop="actor"[^<]+><a[^<]+><span itemprop="name">([^<]+)/', $content, $matches)) {
            $video['actors'] = array();
            foreach ($matches[1] as $key => $value) {
                $video['actors'][] = trim($value);
            }
        }

        if (preg_match('/<p class="item-decription[^<]+>([^<]+)/', $content, $matches)) {
            $video['description'] = trim($matches[1]);
        }

        return $video;
    }

    public static function getVideoUrlById($id) {
        $content = file_get_contents('http://brb.to/video/films/view/' . $id);

        if (!preg_match('/url: \'(?P<video_url>\/get\/play\/[^\']+)/', $content, $matches)) return false;

        return array(
            'id'            => $id,
            'video_url'     => 'http://brb.to' . $matches['video_url']
        );
    }

}