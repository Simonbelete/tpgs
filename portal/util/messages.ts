/**
 * Generic Messages
 */

export default {
  exportError_400: () =>
    "Error: Failed to download data, try changing to the correct farm",
  exportError_500: () =>
    "Failed to Export, please check you network and try again",
  importError_500: () =>
    "Failed to Export, please check you network and try again",
  importError_400: () =>
    "Error: Failed to import data, try changing to the correct farm or check you file",
  importSuccess: () => "Successfully imported",
  csvExportError: () => "Failed to download csv",
  exportFileTypeError: () => "Please select file type either csv or excel",
  fileNotSelected: () => "Please select a file",
  deleteSuccess: () => "Successfully Deleted",
  deleteError: () => "Error deleting",
  duplicateError: () => "Duplicate, Already exists",
};
