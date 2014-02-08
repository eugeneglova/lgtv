/*global define*/

define([
    'backbone',
    './views/player'
], function (Backbone, PlayerView) {
    'use strict';

    var Player = Backbone.UIController.extend({

        namespace: 'ui:player',

        listeners: {
            ':open':                'onOpen',
            ':rewind':              'onRewind',
            ':play':                'onPlay',
            ':pause':               'onPause',
            ':forward':             'onForward',
            'data:videos:ready':    'onDataVideosReady'
        },

        el: null,

        views: null,

        is_rendered: null,

        video: null,

        // Reference to the videos collection
        videos: null,

        initialize: function() {
            this.el = $('body');

            this.views = {};

            this.views.player = new PlayerView();

            return this;
        },

        onOpen: function() {
            this.remove();

            this.request('data:state:get', 'video-id', this.onDataStateGetVideoId, this);

            return true;
        },

        onRewind: function() {
            this.views.player.rewind();

            return true;
        },

        onPlay: function() {
            this.views.player.play();

            return true;
        },

        onPause: function() {
            this.views.player.pause();

            return true;
        },

        onForward: function() {
            this.views.player.forward();

            return true;
        },

        isRendered: function() {
            return !!this.is_rendered;
        },

        onDataVideosReady: function() {
            this.request('data:videos:get', this.onDataVideosGet, this);

            return true;
        },

        onDataVideosGet: function(videos) {
            this.videos = videos;

            return true;
        },

        onDataStateGetVideoId: function(video_id) {
            this.video = this.videos.get(video_id);

            if (!this.video) return false;

            this.views.player.setVideo(this.video);

            // this.player.fetch().then(this.render.bind(this));
            this.render();

            return true;
        },

        listenToEvents: function() {
            this.listenTo(this.views.player, 'controls:open', this.requestCallback('ui:controls:open'), this);
        },

        render: function() {
            this.listenToEvents();

            this.views.player.render();

            this.el.append(this.views.player.$el);

            this.request('data:state:set', 'player-element', this.views.player.getPlayerElement());

            this.is_rendered = true;

            return this;
        },

        remove: function() {
            if (!this.isRendered()) return false;

            this.request('data:state:set', 'player-element', null);

            Object.keys(this.views).forEach(function(key) {
                this.views[key].remove();
            }, this);

            this.is_rendered = false;

            return true;
        }

    });

    return Player;
});
