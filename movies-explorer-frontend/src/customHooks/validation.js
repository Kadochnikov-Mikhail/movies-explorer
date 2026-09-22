import { useCallback, useState } from 'react';

export function useForm() {
  const [values, setValues] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;

    setValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));
  }

  return {
    values,
    handleChange,
    setValues,
  };
}

export function useFormWithValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  function handleChange(event) {
    const { name, value, validationMessage } = event.target;

    setValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: validationMessage,
    }));

    setIsValid(event.target.closest('form').checkValidity());
  }

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    []
  );

  return {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
  };
}
