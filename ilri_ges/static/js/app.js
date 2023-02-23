// Common modules for app
"use strict";

require.config({
  baseUrl: "/static/js",
  shim: {
    backbone: {
      //These script dependencies should be loaded before loading
      //backbone.js
      deps: ["underscore", "jquery"],
      //Once loaded, use the global 'Backbone' as the
      //module value.
      exports: "Backbone",
    },
    underscore: {
      exports: "_",
    },
  },
  paths: {
    jquery: "../../../static/js/lib/admin-LTE/plugins/jquery/jquery.min",
    underscore: "../../../static/js/lib/underscorejs/underscore-umd-min",
    backbone: "../../../static/js/lib/backbonejs/backbone-min",
    bootstrap: "../../../static/js/lib/admin-LTE/plugins/jquery/jquery.min",
  },
});
