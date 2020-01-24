import React, { PureComponent } from 'react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker } from 'react-dates';
import enLocale from 'moment/locale/en-au';
import moment from 'moment';

class DatePicker extends PureComponent {
  constructor(props) {
    super(props);
    moment.locale('en', enLocale);
  }

  state = {
    focused: false,
  };

  onFocusChange = value => {
    this.setState({ focused: !this.state.focused });
    const { input } = this.props;
    input.onFocus(value);
  };

  render() {
    const {
      input,
      meta: { touched, error, warning },
      placeholder,
      disabled,
      required,
    } = this.props;
    const { focused } = this.state;
    const invalid = error !== undefined && error !== null;

    return (
      <React.Fragment>
        <SingleDatePicker
          showClearDate={true}
          showDefaultInputIcon={true}
          displayFormat="YYYY-MM-DD"
          numberOfMonths={1}
          disabled={disabled}
          placeholder={placeholder}
          date={input.value}
          onDateChange={input.onChange}
          focused={focused}
          onFocusChange={this.onFocusChange}
          id={input.name}
        />
        {error && touched && <span>{error}</span>}
      </React.Fragment>
    );
  }
}

export const formatDates = value => (value ? moment(value) : null);

export const normalizeDates = value =>
  value ? value.format('YYYY-MM-DD') : null;


export default DatePicker;
