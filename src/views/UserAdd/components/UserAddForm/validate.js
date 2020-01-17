export default function(values) {
  const errors = {};
  const requiredFields = [
    'residentName',
    'phoneNumber'
  ];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  if (
    values.phoneNumber &&
    !/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/i.test(values.phoneNumber)
  ) {
    errors.phoneNumber = 'Invalid phone number';
  }
  return errors;
}
