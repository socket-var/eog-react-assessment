import React, { useState, useCallback } from 'react';

import Chip from './Chip';
import { Input, MenuItem, Select, FormControl, InputLabel, makeStyles } from '@material-ui/core';

/** though this is intended to be a completely reusable component keeping it simple for this task
 */
interface ComponentProps {
  /** list of options to be displayed */
  options: string[];
  label?: string;
  /** an optional handler that is called on change  */
  handleChange?: (values: string[]) => void;
}

const useStyles = makeStyles({
  multiSelectInput: {
    minWidth: '500px',
  },
});

const MultiSelect: React.FC<ComponentProps> = ({ options, label, handleChange: handleChangeOuter }) => {
  const classes = useStyles();

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<{ value: unknown }>) => {
      const values = event.target.value as string[];
      setSelectedOptions(values);
      if (handleChangeOuter) {
        handleChangeOuter(values);
      }
    },
    [handleChangeOuter],
  );

  return (
    <FormControl>
      <InputLabel id="mutiple-chip-label">{label}</InputLabel>
      <Select
        className={classes.multiSelectInput}
        labelId="mutiple-chip-label"
        id="mutiple-chip"
        multiple
        value={selectedOptions}
        onChange={handleChange}
        input={<Input id="select-multiple-chip" />}
        /** material-ui can't infer types here */
        renderValue={(selected: any) => (
          <div>
            {selected.map((value: string, index: number) => (
              <Chip key={index} label={value} />
            ))}
          </div>
        )}
      >
        {options.map((option: string, index: number) => (
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultiSelect;
