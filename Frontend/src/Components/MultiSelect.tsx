import { Autocomplete, TextField } from "@mui/material";
import { iSelectable } from "../interfaces";
import { useSignal } from "@preact/signals";

interface iMultiSelect {
  options: iSelectable[];
  defaultSelectedValues?: iSelectable[];
  title: string;
  onChange: (data: iSelectable[]) => void; 
}

const MultiSelect: React.FC<iMultiSelect> = ({
  options,
  defaultSelectedValues,
  onChange,
  title,
  ...rest
}) => {
  
  const selected = useSignal<iSelectable[]>(defaultSelectedValues ?? []);

  const _internalOnChange = (data: iSelectable[]) => {
    if (data.some(item => item.id === "selectAll")){
      selected.value = options;
      onChange(options)
    }
    else {
      selected.value = data;
      onChange(data);
    }
  };
  const newOptionsList = options.length === selected.value.length ? [] : [{id: "selectAll", value: "בחר הכל"}, ...options];
  return (
    <Autocomplete
      multiple
      disableCloseOnSelect
      forcePopupIcon
      filterSelectedOptions
      freeSolo
      options={newOptionsList}
      onChange={(_, data) => _internalOnChange(data as iSelectable[])}
      getOptionLabel={(option) =>  typeof option === "string" ? option : option.value}
      renderInput={(params) => (
        <TextField
          {...params}
          label={title}
          inputProps={{ ...params.inputProps, readOnly: true, }}
        />
      )}
      value={selected.value}
      size="small"
      {...rest}
    />
  );
};

export default MultiSelect;
