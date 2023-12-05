import { Controller, UseFormReturn } from "react-hook-form"
import { iField } from "../../interfaces"
import { DatePicker, LocalizationProvider, heIL } from "@mui/x-date-pickers"
import { getFullFieldId, isFieldConditionMet, registerDependencies } from "../../assets/Functions/FormHandlers"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import "dayjs/locale/he"

interface iFormDateField {
    field: iField,
    parent?: string,
    form: UseFormReturn<any>,
}
const FormDateField: React.FC<iFormDateField> = ({field, parent, form}) => {
    registerDependencies(field, form, parent);
    
    if (!isFieldConditionMet("VISIBILITY", field, form.getValues, parent)) {
        return null;
    };
    return (
    <Controller
        name={getFullFieldId(field, parent)}
        control={form.control}
        defaultValue={null}
        render={({
            field: {onChange, value, ..._field},
            fieldState: { error }
        }) => (
            <LocalizationProvider
            dateAdapter={AdapterDayjs} 
            adapterLocale="he"
            localeText={heIL.components.MuiLocalizationProvider.defaultProps.localeText}>
                <DatePicker 
                    label={field.title}
                    value={value}  
                    format="DD/MM/YYYY"
                    onChange={(event: any) => onChange(event)}
                    {..._field}
                    slotProps={{ textField: { error: !!error, helperText: error?.message, fullWidth: true, size: "small",} }}
                />
            </LocalizationProvider>
        )}
        />
    )
};

export default FormDateField;