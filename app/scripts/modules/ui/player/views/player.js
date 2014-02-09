/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'hbs!../templates/player',
], function ($, _, Backbone, PlayerTemplate) {
    'use strict';

    var PlayerView = Backbone.View.extend({

        template: PlayerTemplate,

        // Reference to the video url model
        video_url: null,

        interval: null,

        events: {
            'mousemove':    'onMouseMove'
        },

        initialize: function() {
            this.openControls = _.throttle(this.openControls, 500);

            return this;
        },

        setVideoUrl: function(video_url) {
            this.video_url = video_url;

            return true;
        },

        rewind: function() {
            var player = this.getPlayerElement();

            player.seek(player.playPosition - 60000);
        },

        play: function() {
            this.getPlayerElement().play(1);
        },

        pause: function() {
            this.getPlayerElement().play(0);
        },

        forward: function() {
            var player = this.getPlayerElement();

            player.seek(player.playPosition + 60000);
        },

        openControls: function() {
            this.trigger('controls:open');

            return true;
        },

        onMouseMove: function() {
            this.openControls();

            return true;
        },

        getPlayerElement: function() {
            return this.$("#player").get(0);
        },

        render: function() {
            this.$el.html(this.template(this.video_url.toJSON()));

            return this;
        }

    });

    return PlayerView;
});
