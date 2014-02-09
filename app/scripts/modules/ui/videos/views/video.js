/*global define*/

define([
    'backbone',
    'hbs!../templates/video'
], function (Backbone, VideoTemplate) {
    'use strict';

    var EngineView = Backbone.View.extend({

        template: VideoTemplate,

        tagName: 'li',

        events: {
            'click': 'onClick'
        },

        // Reference to parent view
        parent: null,

        active_class: 'active',

        initialize: function(options) {
            this.parent = options.parent;

            return this;
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));

            return this;
        },

        onClick: function(e) {
            e.preventDefault();

            this.parent.trigger('video:play', this.model.id);

            return true;
        }

    });

    return EngineView;
});
