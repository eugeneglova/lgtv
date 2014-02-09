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
            'click img':    'onClickImage',
            'click a':      'onClickLink'
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

        onClickImage: function(e) {
            e.preventDefault();

            this.parent.trigger('open', this.model.id);

            return true;
        },

        onClickLink: function(e) {
            e.preventDefault();

            this.parent.trigger('play', this.model.id);

            return true;
        }

    });

    return EngineView;
});
