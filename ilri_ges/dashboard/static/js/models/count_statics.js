define(["underscore", "backbone"], function (_, Backbone) {
  "use strict";

  var CountStatics = Backbone.Model.extend({
    url: "",
    defaults: {
      users_count: 0,
      flocks_count: 0,
      farms_count: 0,
      chicken_count: 0,
      eggs_count: 0,
    },
  });

  return CountStatics;
});
