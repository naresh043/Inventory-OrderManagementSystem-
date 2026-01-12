export const validateProduct = (values) => {
  const errors = {};

  if (!values.name) errors.name = "Product name is required";
  if (!values.price || values.price <= 0)
    errors.price = "Valid price required";
  if (!values.stock && values.stock !== 0)
    errors.stock = "Stock is required";

  return errors;
};
