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
    datatables: {
      deps: [
        "datatablesBs4",
        "datatablesresponsive",
        "datatablesResponsiveBs4",
        "datatablesButtons",
        "datatablesButtonsBs4",
        "jszip",
        "pdfmake",
        "pdfmake_fonts",
      ],
    },
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
    datatablesBs4:
      "../../../static/js/lib/admin-LTE/plugins/datatables-bs4/js/dataTables.bootstrap4.min",
    datatablesresponsive:
      "../../../static/js/lib/admin-LTE/plugins/datatables-responsive/js/dataTables.responsive.min",
    datatablesResponsiveBs4:
      "../../../static/js/lib/admin-LTE/plugins/datatables-responsive/js/responsive.bootstrap4.min",
    datatablesButtons:
      "../../../static/js/lib/admin-LTE/plugins/datatables-buttons/js/dataTables.buttons.min",
    datatablesButtonsBs4:
      "../../../static/js/lib/admin-LTE/plugins/datatables-buttons/js/buttons.bootstrap4.min",
    jszip: "../../../static/js/lib/admin-LTE/plugins/jszip/jszip.min",
    pdfmake: "../../../static/js/lib/admin-LTE/plugins/pdfmake/pdfmake.min",
    pdfmake_fonts: "../../../static/js/lib/admin-LTE/plugins/pdfmake/vfs_fonts",
  },
});
