import Card from "../Components/Card";
import Form from "../Components/Form/Form";
import { iField } from "../interfaces";

const AdminSignInView = () => {
    const fields: iField[] = [
        {
            id: "signInTitle",
            title: "התחברות",
            fieldType: "TITLE"
        },
        {
            id: "pNum",
            title: "מספר אישי",
            fieldType: "TEXT_FIELD",
            // inputType: "password"
        },
        {
            id: "password",
            title: "סיסמת מערכת",
            fieldType: "TEXT_FIELD"
        }
    ];

    return (
        <Card style={{height: "100%"}}>
            <Form onValidated={console.log} fields={fields}/>
        </Card>
    )
};

export default AdminSignInView;