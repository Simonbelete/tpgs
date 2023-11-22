const errorToHtml = (errors: any) => {
  let html = "";
  for (const property in errors) {
    html += String(errors[property][0]);
  }

  return html;
};

export default errorToHtml;
