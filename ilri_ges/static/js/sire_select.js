requirejs(["jquery", "select2"], function ($, Select2) {
  "use strict";
  $("#sire_select").select2({
    theme: "bootstrap4",
    placeholder: "Select a Sire Tag",
    ajax: {
      url: "/api/chickens?sex=M",
      data: function (params) {
        var query = {
          search: params.term,
          page: params.page || 1,
        };
        return query;
      },
      processResults: function (data, params) {
        params.page = params.page || 1;
        var transform = $.map(data.results, function (obj) {
          obj.id = obj.id || obj.id;
          obj.text = obj.text || obj.tag;
          return obj;
        });
        return {
          results: transform,
          pagination: {
            more: params.page * 30 < data.count,
          },
        };
      },
    },
  });
});
