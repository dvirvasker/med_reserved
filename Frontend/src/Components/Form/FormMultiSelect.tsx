import { Controller, UseFormReturn } from "react-hook-form";
import { getFullDependantId, getFullFieldId, isFieldConditionMet, registerDependencies } from "../../assets/Functions/FormHandlers";
import { iMultipleSelectField, iSelectable } from "../../interfaces";
import MultiSelect from "../MultiSelect";

interface iFormMultiSelect {
    field: iMultipleSelectField, 
    parent?: string,
    form: UseFormReturn<any>
}

const FormMultiSelect: React.FC<iFormMultiSelect> = ({field, parent, form}) => {
    const fullFieldId = getFullFieldId(field, parent);
    const dependsOnId = getFullDependantId(field, parent);
    registerDependencies(field, form, parent);

    if (!isFieldConditionMet("VISIBILITY", field, form.getValues, parent)) {
        return null;
    };
    let displayedOptions: iSelectable[] = [];
    if (Array.isArray(field.options)){
        displayedOptions = field.options;
    }
    else {
        const selectedValue = form.getValues(dependsOnId!);
        if (selectedValue && field.options[selectedValue]){
            displayedOptions = field.options[selectedValue]
        }
    }

    return (
        <Controller
            name={fullFieldId}
            control={form.control}
            render={({ field: { onChange, value, ..._field } }) => (
                <MultiSelect
                    title={field.title}
                    options={displayedOptions}
                    onChange={(data: iSelectable[]) => onChange(data)}
                    defaultSelectedValues={[...(value ? value : []), ...(field.defaultSelectedValues ? field.defaultSelectedValues : [])]}
                    {..._field}
                />
        )}
    />
)};

export default FormMultiSelect;