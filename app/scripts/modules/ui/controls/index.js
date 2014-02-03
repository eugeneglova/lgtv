/*global define*/

define([
    'backbone',
    './views/controls'
], function (Backbone, ControlsView) {
    'use strict';

    var Controls = Backbone.UIController.extend({

        namespace: 'ui:controls',

        listeners: {
            ':open':                            'render',
            ':close':                           'remove',
            'data:state:changed:video-element': 'onVideoElementChanged'
        },

        el: null,

        views: null,

        is_rendered: null,

        timeout_id: null,

        initialize: function() {
            this.el = $('body');

            this.views = {};

            this.views.controls = new ControlsView();

            return this;
        },

        isRendered: function() {
            return !!this.is_rendered;
        },

        onVideoElementChanged: function(video) {
            this.request('data:state:get', 'video-element', this.views.controls.setVideoElement.bind(this.views.controls));
        },

        listenToEvents: function() {
            this.listenTo(this.views.controls, 'rewind', this.requestCallback('ui:video:rewind'), this);
            this.listenTo(this.views.controls, 'play', this.requestCallback('ui:video:play'), this);
            this.listenTo(this.views.controls, 'pause', this.requestCallback('ui:video:pause'), this);
            this.listenTo(this.views.controls, 'forward', this.requestCallback('ui:video:forward'), this);
            this.listenTo(this.views.controls, 'clear-timeout', this.clearTimeout, this);
        },

        render: function() {
            if (this.isRendered()) return false;

            this.listenToEvents();

            this.views.controls.render();

            this.el.append(this.views.controls.$el);

            this.is_rendered = true;

            this.clearTimeout();

            return this;
        },

        clearTimeout: function() {
            clearTimeout(this.timeout_id);

            this.timeout_id = setTimeout(function() {
                this.remove();
            }.bind(this), 5000);

            return true;
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
