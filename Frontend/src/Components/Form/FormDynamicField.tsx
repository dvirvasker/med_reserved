import { UseFormReturn, useFieldArray } from "react-hook-form";
import { calculateWidth, getFullFieldId, isFieldConditionMet, registerDependencies } from "../../assets/Functions/FormHandlers";
import { iDynamicListField } from "../../interfaces";
import { Button, Grid } from "@mui/material";
import Field from "./Field";

interface iFormDynamicField {
    field: iDynamicListField, 
    parent?: string,
    form: UseFormReturn<any>
}

const FormDynamicField: React.FC<iFormDynamicField> = ({field, parent, form}) => {
    const fullFieldId = getFullFieldId(field, parent);
    const {fields, append} = useFieldArray({control: form.control, name: fullFieldId,});
    const innerFields = field.fields;
    registerDependencies(field, form, parent);
    if (!isFieldConditionMet("VISIBILITY", field, form.getValues, parent)) {
        return null;
    };

    return (
        <Grid item container columnSpacing={1.5} rowSpacing={1} paddingLeft={parent ? 6 : 0}>
            <Grid item xs={12}>
                <Button variant="outlined" onClick={() => append({})}>{field.title}</Button>
            </Grid>
            {fields.map((field, index) => 
                innerFields.map(innerField => (
                    <Grid item key={`${field.id}-${index}-${innerField.id}`} xs={calculateWidth(innerField)}>
                        <Field field={innerField} parent={`${fullFieldId}.${index}`} form={form}/>
                    </Grid>
                ))
            )}
        </Grid>

    );
};

export default FormDynamicField;