import React from "react";
import { getNumbersFromString, validateForm } from "../functions/functions";

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

const useForm = (
  type: string,
  required: boolean,
  initialValue: string = ""
) => {
  const [value, setValue] = React.useState(
    type === "money" ? initialValue.replace(".", ",") : initialValue
  );
  const [error, setError] = React.useState(null);

  function validate(value) {
    if (!type) return true;
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
    if (type === "money") {
      target.value = getNumbersFromString(target.value);
      if (target.value.length >= 3) {
        target.value =
          target.value.substr(0, target.value.length - 2) +
          "," +
          target.value.substr(target.value.length - 2);
        if (
          target.value.substr(0, 2) !== "0," &&
          target.value.substr(0, 1) === "0"
        ) {
          target.value = target.value.substr(1);
        }
      } else {
        target.value =
          "0," + "0".repeat(2 - target.value.length) + target.value;
      }
    }

    setValue(target.value);
  }

  return {
    value,
    moneyValue: value.replace(",", "."),
    setValue,
    onChange,
    error,
    validate: () => validate(value),
    onBlur: () => validate(value),
  };
};

export default useForm;
