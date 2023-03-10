"use strict";

requirejs(
  ["jquery", "dropzone", "get_cookie", "breed_type_select"],
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
    });

    myDropzone.on("error", function (file, response) {
      // $(file.previewElement).find('.dz-error-message').text(response);
      console.log("error");
    });
  }
);
