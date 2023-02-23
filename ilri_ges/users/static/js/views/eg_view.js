define(["jquery", "backbone"], function ($, Backbone) {
  var EgView = Backbone.View.extend({
    tagName: "li",

    initialize: function () {
      console.log("Hellow init eg");
    },
  });

  return EgView;
});
