requirejs(["jquery", "select2"], function ($, Select2) {
  "use strict";
  $("#breed_type_select").select2({
    theme: "bootstrap4",
    placeholder: "-----",
    allowClear: true,
    ajax: {
      url: "/api/breed-types",
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
          obj.text = obj.text || obj.name;
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
