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

        events: {
            'click .play':  'onPlay',
            'click .pause': 'onPause'
        },

        onPlay: function() {
            this.trigger('play');

            return true;
        },

        onPause: function() {
            this.trigger('pause');

            return true;
        },

        render: function() {
            this.$el.html(this.template());

            return this;
        }

    });

    return ControlsView;
});