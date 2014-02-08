/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'hbs!../templates/controls',
], function ($, _, Backbone, ControlsTemplate) {
    'use strict';

    var ControlsView = Backbone.View.extend({

        className: 'controls',

        template: ControlsTemplate,

        player: null,

        events: {
            'click .rewind':    'onRewind',
            'click .play':      'onPlay',
            'click .pause':     'onPause',
            'click .forward':   'onForward',
            'mousemove':        'onMouseMove'
        },

        initialize: function() {
            this.onMouseMove = _.throttle(this.onMouseMove, 500);

            return this;
        },

        setPlayerElement: function(player) {
            this.player = player;
        },

        onRewind: function() {
            this.trigger('rewind');

            return true;
        },

        onPlay: function() {
            this.trigger('play');

            return true;
        },

        onPause: function() {
            this.trigger('pause');

            return true;
        },

        onForward: function() {
            this.trigger('forward');

            return true;
        },

        onMouseMove: function() {
            this.trigger('clear-timeout');

            return true;
        },

        getDurationByMilliseconds: function (milliseconds) {
            var hours, minutes, seconds;

            hours = Math.floor(milliseconds / 1000 / 3600);
            minutes = Math.floor(milliseconds / 1000 % 3600 / 60);
            seconds = Math.floor(milliseconds / 1000 % 3600 % 60);

            hours = hours > 0 ? hours + ':' : '';
            minutes = minutes > 0 ? (hours !== '' && minutes < 10 ? '0' : '') + minutes + ':' : '0:';
            seconds = (seconds < 10 ? "0" : "") + seconds;

            return hours + minutes + seconds;
        },

        render: function() {
            var format = this.player.playTime < 60 * 60 * 1000 ? 'mm:ss' : 'H:mm:ss';

            this.delegateEvents();

            this.$el.html(this.template({
                position: this.getDurationByMilliseconds(this.player.playPosition),
                duration: this.getDurationByMilliseconds(this.player.playTime)
            }));

            return this;
        }

    });

    return ControlsView;
});
