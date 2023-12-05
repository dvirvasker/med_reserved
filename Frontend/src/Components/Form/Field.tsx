import { Divider } from "@mui/material";
import { iDynamicListField, iField, iMultipleSelectField, iSelectField, iTextField } from "../../interfaces";
import FormFileField from "./FormFileField";
import FormSelectField from "./FormSelectField";
import FormDynamicField from "./FormDynamicField";
import { UseFormReturn } from "react-hook-form";
import { lazy, Suspense } from "preact/compat";
const FormMultiSelect = lazy(() => import("./FormMultiSelect"));
const FormTextField = lazy(() => import("./FormTextField"));
const FormDateField = lazy(() => import("./FormDateField"));

interface iGeneralField {
    field: iField, 
    parent?: string,
    form: UseFormReturn<any>

}

const Field: React.FC<iGeneralField> = ({field, parent, form}) => {
    switch (field.fieldType) {
        case "TEXT_FIELD":
            return (
                <Suspense fallback="טוען שדה טקסט...">
                    <FormTextField field={field as iTextField} form={form} />
                </Suspense>
            )
        case "SELECT": return <FormSelectField field={field as iSelectField} form={form} parent={parent} />
        case "TITLE": return <Divider>{field.title}</Divider>
        case "DYNAMIC_LIST": return <FormDynamicField field={field as iDynamicListField} parent={parent} form={form} />;
        case "MULTI_SELECT":
            return (
            <Suspense fallback="טוען שדה בחירה מרובה...">
                <FormMultiSelect field={field as iMultipleSelectField} parent={parent} form={form} />
            </Suspense>
        );
        case "DATE":
            return (
                <Suspense fallback="טוען שדה בחירת תאריך...">
                    <FormDateField field={field as iField} parent={parent} form={form} />
                </Suspense>
            );        case "FILE": return <FormFileField field={field} parent={parent} form={form}/>
        default: return null;
    }
};

export default Field;