import { iFileField } from "../../interfaces";
import {  getFullFieldId, isFieldConditionMet, registerDependencies } from "../../assets/Functions/FormHandlers";
import { UseFormReturn, useWatch } from "react-hook-form";
import { Box, Button, Typography } from "@mui/material";
import { FilePresent } from "@mui/icons-material";
import { useRef } from "preact/hooks";

interface iFormFileField {
    field: iFileField, 
    parent?: string,
    // register: UseFormRegister<any>,
    // form: useFormReturn<any>,
    // errors: FieldErrors<any>
    form: UseFormReturn<any>,

} 
const FormFileField: React.FC<iFormFileField> = ({ field, parent, form}) => {
    const fileInput = useRef<HTMLInputElement | null>(null);
    const fullFieldId = getFullFieldId(field, parent);
    const fieldRef = form.register(fullFieldId, field.registerOptions);
    const fieldValue = useWatch({name: fullFieldId, control: form.control});
    registerDependencies(field, form, parent);
    
    if (!isFieldConditionMet("VISIBILITY", field, form.getValues, parent)) {
      return null;
  };
    return (
      <Box sx={{ backgroundColor: "background.default", borderRadius: 3, display: "flex", alignItems: "center" }}>
        <Button
          sx={{ width: "25%", borderRadius: 3 }}
          color="primary"
          onClick={() => fileInput.current?.click()}
          startIcon= {<FilePresent />}
        >
          {field.title}
        </Button>
        <input
        {...fieldRef}
        ref={(e) => {
            fieldRef.ref(e);
            fileInput.current = e;
        }}
        type="file"
        style={{ display: 'none' }}
        />
        <Typography sx={{color:  form.formState.errors[fullFieldId]?.message ? "error.main" : "inherit"}} marginLeft={3}>{fieldValue && fieldValue[0] && fieldValue[0]?.name ? fieldValue[0].name : "אנא בחר קובץ"}</Typography>
      </Box>
    );
  };


export default FormFileField;