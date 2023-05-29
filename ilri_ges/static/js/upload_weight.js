requirejs(
  ["jquery", "dropzone", "get_cookie"],
  function ($, dropzone, get_cookie) {
    var myDropzone = new dropzone.Dropzone("#weight_import", {
      headers: {
        "X-CSRFToken": get_cookie("csrftoken"),
      },
      url: "/weights/import",
      paramName: "file_upload",
    });

    // Update the total progress bar
    myDropzone.on("totaluploadprogress", function (progress) {
      document.querySelector(
        "#weight_import_progress .progress-bar"
      ).style.width = progress + "%";
    });
  }
);
