// src/hooks/useValidation.js
import { useState, useCallback } from 'react';

export const useValidation = (schema) => {
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(true);

  const validate = useCallback(async (data) => {
    try {
      await schema.validate(data, { abortEarly: false });
      setErrors({});
      setIsValid(true);
      return true;
    } catch (validationErrors) {
      const errorObject = {};
      validationErrors.inner.forEach((error) => {
        errorObject[error.path] = error.message;
      });
      setErrors(errorObject);
      setIsValid(false);
      return false;
    }
  }, [schema]);

  const validateField = useCallback(async (fieldName, value) => {
    try {
      await schema.validateAt(fieldName, { [fieldName]: value });
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
      return true;
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        [fieldName]: error.message,
      }));
      return false;
    }
  }, [schema]);

  const clearErrors = useCallback(() => {
    setErrors({});
    setIsValid(true);
  }, []);

  return {
    errors,
    isValid,
    validate,
    validateField,
    clearErrors,
  };
};