import moment from "moment";
import insertStringAtIndex from "./insertStringAtIndex";

export default (data: BlobPart, filename: string) => {
  // create file link in browser's memory
  const href = window.URL.createObjectURL(new Blob([data]));

  const fullFilename = insertStringAtIndex(
    filename,
    moment().format("DD_MM_YYYY"),
    filename.lastIndexOf(".")
  );

  // create "a" HTML element with href to file & click
  const link = document.createElement("a");
  link.href = href;
  link.setAttribute("download", fullFilename);
  document.body.appendChild(link);
  link.click();

  // clean up "a" element & remove ObjectURL
  document.body.removeChild(link);
  URL.revokeObjectURL(href);
};
