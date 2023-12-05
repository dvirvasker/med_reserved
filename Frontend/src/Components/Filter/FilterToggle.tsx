import { useState } from "preact/hooks";
import { iSelectable, iToggleFilter } from "../../interfaces";
import { Box, Checkbox, FormControlLabel, FormGroup, Typography } from "@mui/material";

const FilterToggle = ({field} : {field: iToggleFilter}) => {
    const [filter, setFilter] = useState<iSelectable[]>(field.defaultValues ?? []);
    const isAllChekced = filter.length === field.options.length;


    const onSelectAll = () => {
      if (isAllChekced){
        const newFilter: iSelectable[] = [];
        setFilter(newFilter);
        field.onClick(newFilter);
      }
      else {
        const newFilter = field.options;
        setFilter(newFilter);
        field.onClick(newFilter);
      }
    };

    const onSelection = (option: iSelectable) => {
      if (filter.some(innerFilter => innerFilter.id === option.id)){
        const newFilter = filter.filter(innerField => innerField.id !== option.id);
        setFilter(newFilter)
        field.onClick(newFilter);        
      }
      else {
        const newFilter = [...filter, option];
        setFilter(newFilter)
        field.onClick(newFilter);        
      }

    };
        return (
          <Box>
            <Typography fontWeight="bold">{field.title}</Typography>
                <FormGroup sx={{display: "flex", flexDirection: field.flexDirection ? field.flexDirection : "column",}}>
                  {field.selectAll && <FormControlLabel control={<Checkbox size="small" checked={filter.length === field.options.length} onChange={onSelectAll}/>} label="בחר הכל" />}
                  {field.options.map(option => (
                  <FormControlLabel key={option.id} control={<Checkbox size="small" checked={filter.some(innerOption => innerOption.id === option.id)} />} onChange={() => onSelection(option)} label={option.value}/>
                ))}
            </FormGroup>
          </Box>
        )
    }

export default FilterToggle;