/*
must include:
1. parent support
2. depends on support
3. invisibleWhen\visibleWhen
*/

import { UseFormReturn } from "react-hook-form";
import { getFullFieldId, isFieldConditionMet, registerDependencies } from "../../assets/Functions/FormHandlers";
import { iTextField } from "../../interfaces";
import { Box, Button, TextField } from "@mui/material";

interface iFormTextField {
    field: iTextField, 
    parent?: string, 
    form: UseFormReturn
}

const FormTextField: React.FC<iFormTextField> = ({field, parent, form}) => {
    const fullFieldId = getFullFieldId(field, parent);
    registerDependencies(field, form, parent);

    if (!isFieldConditionMet("VISIBILITY", field, form.getValues, parent)) {
        return null;
    };

    if (!field.button){
        return (
            <TextField size="small" 
            fullWidth 
            helperText={form.formState.errors[fullFieldId]?.message?.toString()}
            error={Boolean(form.formState.errors[fullFieldId]?.message)} 
            type={field.inputType} 
            label={field.title}  
            {...form.register(fullFieldId, {...field.registerOptions})} />
        )
    }
    const onButtonClick = async () => {
        await form.trigger(fullFieldId)
        .then(() => field.button?.onAction(form.getValues(fullFieldId)))
    };

    return (
            <Box display="flex" gap={2} height="100%" >
            <TextField size="small" 
                fullWidth 
                helperText={form.formState.errors[fullFieldId]?.message?.toString()}
                error={Boolean(form.formState.errors[fullFieldId]?.message)} 
                type={field.inputType} 
                label={field.title}  
                {...form.register(fullFieldId, {...field.registerOptions})} />

                {field.button && (
                    <Button 
                    size="small" 
                    fullWidth 
                    style={{height: "100%"}} 
                    type="button" 
                    variant="outlined" 
                    onClick={onButtonClick}>
                        {field.button.title}
                    </Button>
                    )}
            </Box>
    )
};

export default FormTextField;