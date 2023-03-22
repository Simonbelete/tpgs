"use strict";

requirejs(
  ["jquery", "dropzone", "get_cookie"],
  function ($, dropzone, get_cookie) {
    var myDropzone = new dropzone.Dropzone("#chickens_import", {
      headers: {
        "X-CSRFToken": get_cookie("csrftoken"),
      },
      url:
        "/chickens/import?farm=" +
        $("farm_select").val() +
        "&breed_type=" +
        $("breed_type_select").val(),
      paramName: "file_upload",
    });

    // Update the total progress bar
    myDropzone.on("totaluploadprogress", function (progress) {
      document.querySelector(
        "#chickens_import_progress .progress-bar"
      ).style.width = progress + "%";
      $("#chicken_import_error").append("<h5>Loading...</h5>");
    });

    myDropzone.on("error", function (file, response) {
      // $(file.previewElement).find('.dz-error-message').text(response);
    });

    myDropzone.on("success", function (file, res) {
      var tbl = createTable(res.errors);
      $("#chicken_import_error").empty();
      $("#chicken_import_error").append(tbl);
    });

    function createTable(data) {
      var table = "<table  class='table table-bordered table-striped'>";
      table += `<tr>
                  <th>Row</th>
                  <th>Error</th>
                </tr>`;
      var tr = "";
      for (let i = 0; i < data.length; i++) {
        console.log(data[i]);
        var da = JSON.stringify(data[i].data, null, 4);
        tr += "<tr>";
        tr += `<td>${da}</td>`;
        tr += `<td>${data[i].exception}</td>`;
        tr += "</tr>";
      }
      table += tr + "</table>";

      return table;
    }
  }
);
