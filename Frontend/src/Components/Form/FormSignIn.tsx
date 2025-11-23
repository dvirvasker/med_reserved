import { useForm } from "react-hook-form";
import { Button, Grid } from "@mui/material";
import { iField } from "../../interfaces";
import Field from "./Field";
import { calculateWidth } from "../../assets/Functions/FormHandlers";

interface iForm {
    fields: iField[],
    onValidated: (formData: any) => void
}

const Form: React.FC<iForm> = ({ fields, onValidated }) => {
    const form = useForm({ reValidateMode: "onSubmit" });
    const handleSubmit = form.handleSubmit;

    return (
        <form onSubmit={handleSubmit(data => onValidated(data))}>
            <Grid container columnSpacing={1.5} rowSpacing={2}>
                {fields.map(field => (
                    <Grid item xs={calculateWidth(field)} key={field.id}>
                        <Field field={field} form={form} />
                    </Grid>
                ))}
            </Grid>
            <Button style={{ marginRight: "25%" }} sx={{ mt: 4 }} href="/signup" variant="contained">הרשם</Button>
            <Button style={{ marginRight: "25%" }} sx={{ mt: 4 }} type="submit" variant="contained">התחבר</Button>
        </form>
    )
};

export default Form;