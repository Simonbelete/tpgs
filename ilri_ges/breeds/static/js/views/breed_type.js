define(["jquery", "underscore", "backbone"], function ($, _, Backbone) {
  "use strict";

  var BreedTypeView = Backbone.View.extend({
    el: "#breed_type_table",

    initialize: function () {
      console.log("init");
    },
  });

  return BreedTypeView;
});
