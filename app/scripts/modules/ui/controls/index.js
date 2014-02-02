/*global define*/

define([
    'backbone',
    './views/controls'
], function (Backbone, ControlsView) {
    'use strict';

    var Controls = Backbone.UIController.extend({

        namespace: 'ui:controls',

        listeners: {
            ':open':    'render',
            ':close':   'remove'
        },

        el: null,

        views: null,

        is_rendered: null,

        initialize: function() {
            this.el = $('body');

            this.views = {};

            this.views.controls = new ControlsView();

            return this;
        },

        isRendered: function() {
            return !!this.is_rendered;
        },

        listenToEvents: function() {
            this.listenTo(this.views.controls, 'rewind', this.requestCallback('ui:video:rewind'), this);
            this.listenTo(this.views.controls, 'play', this.requestCallback('ui:video:play'), this);
            this.listenTo(this.views.controls, 'pause', this.requestCallback('ui:video:pause'), this);
            this.listenTo(this.views.controls, 'forward', this.requestCallback('ui:video:forward'), this);
        },

        render: function() {
            this.listenToEvents();

            this.views.controls.render();

            this.el.append(this.views.controls.$el);

            this.is_rendered = true;

            return this;
        },

        remove: function() {
            if (!this.isRendered()) return false;

            Object.keys(this.views).forEach(function(key) {
                this.views[key].remove();
            }, this);

            this.is_rendered = false;

            return true;
        }

    });

    return Controls;
});
