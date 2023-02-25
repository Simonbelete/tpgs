"use strict";

requirejs(
  ["jquery", "dropzone", "get_cookie"],
  function ($, dropzone, get_cookie) {
    var myDropzone = new dropzone.Dropzone("#chickens_import", {
      headers: {
        "X-CSRFToken": get_cookie("csrftoken"),
      },
      url: "/chickens/import",
      paramName: "file_upload",
    });

    // Update the total progress bar
    myDropzone.on("totaluploadprogress", function (progress) {
      document.querySelector(
        "#chickens_import_progress .progress-bar"
      ).style.width = progress + "%";
    });
  }
);
