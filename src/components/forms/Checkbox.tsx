import React from 'react';
import { FormControl, FormControlLabel, Checkbox as MuiCheckbox } from '@material-ui/core';

interface ConvertToDefEventPara {
  (name: any, value: any): {
    target: { name: any; value: any };
  };
}

interface CheckboxProps {
  htmlFor: string;
  name: string;
  label: string;
  value: boolean | undefined;
  onChange: (param: any) => void;
}

const CheckboxComponent: React.FunctionComponent<CheckboxProps> = (props: CheckboxProps): JSX.Element => {
  const { name, label, value, onChange } = props;

  const convertToDefEventPara: ConvertToDefEventPara = (name: string, value: boolean | undefined) => ({
    target: {
      name,
      value,
    },
  });

  return (
    <FormControl>
      <FormControlLabel
        control={
          <MuiCheckbox name={name} color="primary" checked={value} onChange={(e) => onChange(convertToDefEventPara(name, e.target.checked))} />
        }
        label={label}
      />
    </FormControl>
  );
};

export default CheckboxComponent;
