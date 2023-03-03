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
    // "datatables.net": {
    //   deps: [
    //     "datatables.net-bs4",
    //     "datatables.net-responsive",
    //     "datatablesResponsiveBs4",
    //     "datatables.net-buttons",
    //     "datatablesButtonsBs4",
    //     "jszip",
    //     "pdfmake",
    //     "pdfmake_fonts",
    //   ],
    // },
    underscore: {
      exports: "_",
    },
  },
  paths: {
    jquery: "../../../static/js/lib/admin-LTE/plugins/jquery/jquery.min",
    underscore: "../../../static/js/lib/underscorejs/underscore-umd-min",
    backbone: "../../../static/js/lib/backbonejs/backbone-min",
    bootstrap:
      "../../../static/js/lib/admin-LTE/plugins/bootstrap/js/bootstrap.bundle.min",
    adminLTE: "../../../static/js/lib/admin-LTE/dist/js/adminlte.min",
    dropzone:
      "../../../static/js/lib/admin-LTE/plugins/dropzone/min/dropzone.min",
    select2:
      "../../../static/js/lib/admin-LTE/plugins/select2/js/select2.full.min",
    "datatables.net":
      "../../../static/js/lib/admin-LTE/plugins/datatables/jquery.dataTables.min",
    "datatables.net-bs4":
      "../../../static/js/lib/admin-LTE/plugins/datatables-bs4/js/dataTables.bootstrap4.min",
    "datatables.net-responsive":
      "../../../static/js/lib/admin-LTE/plugins/datatables-responsive/js/dataTables.responsive.min",
    datatablesResponsiveBs4:
      "../../../static/js/lib/admin-LTE/plugins/datatables-responsive/js/responsive.bootstrap4.min",
    "datatables.net-buttons":
      "../../../static/js/lib/admin-LTE/plugins/datatables-buttons/js/dataTables.buttons.min",
    datatablesButtonsBs4:
      "../../../static/js/lib/admin-LTE/plugins/datatables-buttons/js/buttons.bootstrap4.min",
    jszip: "../../../static/js/lib/admin-LTE/plugins/jszip/jszip.min",
    pdfmake: "../../../static/js/lib/admin-LTE/plugins/pdfmake/pdfmake.min",
    pdfmake_fonts: "../../../static/js/lib/admin-LTE/plugins/pdfmake/vfs_fonts",
    datatables_buttons_html5:
      "../../../static/js/lib/admin-LTE/plugins/datatables-buttons/js/buttons.html5.min",
    datatables_buttons_print:
      "../../../static/js/lib/admin-LTE/plugins/datatables-buttons/js/buttons.print.min",
    datatables_buttons_colVis:
      "../../../static/js/lib/admin-LTE/plugins/datatables-buttons/js/buttons.colVis.min",
    d3js: "https://d3js.org/d3.v7.min",
    d3_hierarchy: "../../../static/js/lib/d3-hierarchy/d3-hierarchy@3",
    "d3-color": "../../../static/js/lib/d3-zoom/d3-color",
    "d3-dispatch": "../../../static/js/lib/d3-zoom/d3-dispatch",
    "d3-drag": "../../../static/js/lib/d3-zoom/d3-drag",
    "d3-ease": "../../../static/js/lib/d3-zoom/d3-ease",
    "d3-interpolate": "../../../static/js/lib/d3-zoom/d3-interpolate",
    "d3-selection": "../../../static/js/lib/d3-zoom/d3-selection",
    "d3-timer": "../../../static/js/lib/d3-zoom/d3-timer",
    "d3-transition": "../../../static/js/lib/d3-zoom/d3-transition",
    "d3-zoom": "../../../static/js/lib/d3-zoom/d3-zoom",
    chartjs: "../../../static/js/lib/admin-LTE/plugins/chart.js/Chart.min",
  },
});