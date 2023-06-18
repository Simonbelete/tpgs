const errorToForm = (errors: any, setter: any) => {
  for (const property in errors) {
    setter(
      property,
      { message: String(errors[property][0]) },
      { shouldFocus: true }
    );
  }
};

export default errorToForm;
