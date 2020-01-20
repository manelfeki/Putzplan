import { Select } from '@material-ui/core';
import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText'

const renderFromHelper = ({ touched, error }) => {
  if (!(touched && error)) {
    return
  } else {
    return <FormHelperText>{touched && error}</FormHelperText>
  }
}

export const renderSelectField = props => {
  const { input, label, meta: { touched, error }, children, options, ...custom } = props;
  return (
    <FormControl error={touched && error}>
      <InputLabel htmlFor="age-native-simple">Resident</InputLabel>
      <Select
        label={label}
        helperText={touched && error}
        {...input}
        onChange={(event, index, value) => {input.onChange(value); console.log(index.props.value)}}
        children={children}
        {...custom}
      >
        <MenuItem value="" disabled={true} selected={true} >Choose a resident</MenuItem>

        {input.value.map(option => (
          <MenuItem key={option.label} value={option.value}>
            {option.value}
          </MenuItem>
        ))}
      </Select>
      {renderFromHelper({ touched, error })}
    </FormControl>
  );
};
