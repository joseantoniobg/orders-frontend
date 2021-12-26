export const validateForm = (formFields) => {
  let validForm = true;
  Object.values(formFields).forEach((formField: any) => {
    if (validForm && !formField.validate()) validForm = false;
  });
  return validForm;
};
