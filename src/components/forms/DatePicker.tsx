import React from 'react';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

interface DatePickerProps {
  className?: string;
  isError?: boolean | undefined;
  isRequired?: boolean | undefined;
  defaultValue?: string | number;
  hint?: string;
  htmlFor?: string;
  inputProps?: any;
  onChange: (event: Date | null) => void;
  inputType?: string;
  label?: string;
  helperText?: any;
  placeHolder?: any;
  disabled?: boolean;
  value?: any;
}

const DatePickerComponent: React.FunctionComponent<DatePickerProps> = (props: DatePickerProps): JSX.Element => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container>
        <KeyboardDatePicker
          variant="inline"
          inputVariant="outlined"
          format="MM/dd/yyyy"
          margin="normal"
          id={props.htmlFor}
          label={props.label}
          value={props.value}
          onChange={props.onChange}
          KeyboardButtonProps={{
            'aria-label': 'Date picker',
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
};

export default DatePickerComponent;
