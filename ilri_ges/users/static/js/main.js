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
  },
});

requirejs(["backbone", "jquery", "views/eg_view"], function (a) {
  console.log("a"); // OK
  // new EgView();
});
