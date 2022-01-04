import cookie from "cookie";
export const validateForm = (formFields) => {
  let validForm = true;
  Object.values(formFields).forEach((formField: any) => {
    if (validForm && !formField.validate()) validForm = false;
  });
  return validForm;
};

export function parseCookies(req) {
  return cookie.parse(req ? (req.headers ? req.headers.cookie || "" : "") : "");
}
