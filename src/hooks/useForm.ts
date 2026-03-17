import { useState, ChangeEvent, FormEvent } from "react";

// T representa el tipo de datos de tu formulario (ej. Libro)
export const useForm = <T>(
  initialState: T,
  validate: (values: T) => Partial<Record<keyof T, string>>,
) => {
  const [values, setValues] = useState<T>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Limpiar error específico al escribir
    if (errors[name as keyof T]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: FormEvent, callback: (values: T) => void) => {
    e.preventDefault();
    setIsSubmitting(true);

    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      callback(values);
    }

    setIsSubmitting(false);
  };

  const resetForm = () => setValues(initialState);

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    resetForm,
    setValues,
    isSubmitting,
  };
};
