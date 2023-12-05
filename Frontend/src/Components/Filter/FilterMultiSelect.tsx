import { iMultiSelectFilter, iSelectable } from "../../interfaces";
import MultiSelect from "../MultiSelect";

const FilterMultiSelect = ({field} : {field: iMultiSelectFilter}) => {
    return (
        <MultiSelect 
        options={field.options} 
        title={field.title} 
        onChange={(data: iSelectable[]) => field.onChange({id: field.id, value: data})}/>
    );
}

export default FilterMultiSelect;