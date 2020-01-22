export default function(values) {
  const errors = {};
  const requiredFields = [
    'description',
    'assignedResident',
    'dateStart',
    'dateEnd',
  ];
  const start=new Date(values.dateStart);
  const end=new Date(values.dateEnd);
  if(start.getTime()>end.getTime()){
    errors['dateEnd'] = 'Invalid dates.';
  }
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  return errors;
}
