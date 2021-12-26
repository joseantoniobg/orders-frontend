import React from "react";

const validations = {
  email: {
    // eslint-disable-next-line no-useless-escape
    regex: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    message: "Preencha um e-mail válido",
  },
  // password: {
  //   regex:
  //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  //   message:
  //     "A senha precisa ter ao menos um caracter minúsculo, um maiúsculo um dígito, e ao menos outro caracteres de comprimento",
  // },
};

const useForm = (type, required) => {
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState(null);

  function validate(value) {
    if (type === false) return true;
    if (value.length === 0 && required) {
      setError("Preencha um valor");
      return false;
    } else if (validations[type] && !validations[type].regex.test(value)) {
      setError(validations[type].message);
      return false;
    } else {
      setError(null);
      return true;
    }
  }

  function onChange({ target }) {
    if (error) validate(target.value);
    setValue(target.value);
  }

  return {
    value,
    setValue,
    onChange,
    error,
    validate: () => validate(value),
    onBlur: () => validate(value),
  };
};

export default useForm;
