import { UseFormReturn } from "react-hook-form";
import { iSelectField, iSelectable } from "../../interfaces";
import { getFullDependantId, getFullFieldId, isFieldConditionMet, registerDependencies } from "../../assets/Functions/FormHandlers";
import { MenuItem, TextField } from "@mui/material";

interface iFormSelectField {
    field: iSelectField, 
    parent?: string,
    form: UseFormReturn<any>,
    
}

const FormSelectField: React.FC<iFormSelectField> = ({field, parent, form})  => {
    const fullFieldId = getFullFieldId(field, parent);
    const dependsOnId = getFullDependantId(field, parent);
    let existingValue = form.getValues(fullFieldId);

    registerDependencies(field, form, parent);
    
    if (!isFieldConditionMet("VISIBILITY", field, form.getValues, parent)) {
        return null;
    };
    
    const displayedOptions: iSelectable[] = Array.isArray(field.options)
        ? field.options : field.options[form.getValues(dependsOnId!)] || [];
    
    return (
        <TextField 
        select 
        fullWidth 
        size="small" 
        defaultValue={field.defaultValue ? field.defaultValue.id : existingValue ? existingValue : ''}
        label={field.title} 
        disabled={!form.getValues(dependsOnId!)}
        inputProps={form.register(fullFieldId, field.registerOptions)}>
            {displayedOptions.map(selectable => (<MenuItem key={selectable.id} value={selectable.id}>{selectable.value}</MenuItem>))}
        </TextField>
    )
};


export default FormSelectField;