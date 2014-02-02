/*global define*/

define([
    'backbone',
    './views/controls'
], function (Backbone, ControlsView) {
    'use strict';

    var Controls = Backbone.UIController.extend({

        namespace: 'ui:controls',

        listeners: {
            ':open':    'onOpen',
            ':close':   'remove'
        },

        el: null,

        views: null,

        is_rendered: null,

        video_info: null,

        initialize: function() {
            this.el = $('body');

            this.views = {};

            this.views.controls = new ControlsView();

            return this;
        },

        isRendered: function() {
            return !!this.is_rendered;
        },

        onOpen: function(video_info) {
            this.video_info = video_info;

            this.views.controls.setVideoInfo(this.video_info);

            this.render();

            return true;
        },

        listenToEvents: function() {
            this.listenTo(this.views.controls, 'rewind', this.requestCallback('ui:video:rewind'), this);
            this.listenTo(this.views.controls, 'play', this.requestCallback('ui:video:play'), this);
            this.listenTo(this.views.controls, 'pause', this.requestCallback('ui:video:pause'), this);
            this.listenTo(this.views.controls, 'forward', this.requestCallback('ui:video:forward'), this);
        },

        render: function() {
            if (this.isRendered()) return false;

            this.listenToEvents();

            this.views.controls.render();

            this.el.append(this.views.controls.$el);

            this.is_rendered = true;

            return this;
        },

        remove: function() {
            if (!this.isRendered()) return false;

            this.stopListening();

            Object.keys(this.views).forEach(function(key) {
                this.views[key].remove();
            }, this);

            this.is_rendered = false;

            return true;
        }

    });

    return Controls;
});
