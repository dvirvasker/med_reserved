import Card from "../Components/Card";
import Form from "../Components/Form/Form";
import { iField } from "../interfaces";

const SignUpView = () => {

    const signUpForm: iField[] = [
        {
            fieldType: "TITLE",
            id: "personalHeader",
            title: "פרטים אישיים"
        },
        {
            fieldType: "TEXT_FIELD",
            id: "fName",
            title: "שם פרטי",
            width: 6,
            registerOptions: {
                required: "שם פרטי דרוש להרשמה"
            }
        },
        {
            fieldType: "TEXT_FIELD",
            id: "lName",
            title: "שם משפחה",
            width: 6,
            registerOptions: {
                required: "שם משפחה דרוש להרשמה"
            }
        },
        {
            fieldType: "TEXT_FIELD",
            id: "pNum",
            title: "מספר אישי",
            width: 6,
            registerOptions: {
                required: "מספר אישי דרוש להרשמה",
                minLength: {
                    value: 8,
                    message: "מספר אישי חייב להיות בדיוק 7 תווים"
                },
                maxLength: {
                    value: 8,
                    message: "מספר אישי חייב להיות בדיוק 8 תווים כולל מזהה חוגר"
                },
                pattern: {
                    value: /^(c|s).*/,
                    message: "מספר אישי חייב להתחיל עם מזהה חוגר, כגון s, c וכו'"
                }
            }
        },
        {
            fieldType: "TITLE",
            id: "permissionTitle",
            title: "סוג הרשאה"
        },
        {
            fieldType: "SELECT",
            id: "permissionType",
            title: "סוג הרשאה",
            options: [
                {id: "gdod", value: "גדוד"},
                {id: "hativa", value: "חטיבה"},
                {id: "ogda", value: "אוגדה"},
                {id: "pikod", value: "פיקוד"},
                {id: "all", value: "כלל צהל"},
                {id: "manager", value: "מנהל"}
            ],
        },
        {
            fieldType: "SELECT",
            id: "selectPermissionValue",
            title: "יחידה",
            enabledWhen: ["permissionType"],
            unvisibleWhen: [
                {key: "permissionType", value: "all"},
                {key: "permissionType", value:"manager"}
            ],
            options: {
                "gdod": [
                    {id: "gdod-4", value: "גדוד 4"},
                    {id: "gdod-12", value: "גדוד 12"},
                    {id: "gdod-7", value: "גדוד 7"},
                    {id: "gdod-15", value: "גדוד 15"}
                ],
                "hativa": [
                    {id: "hativa3", value: "חטיבה 3"},
                    {id: "hativa5", value: "חטיבה 5"},
                    // Additional options for hativa
                    {id: "hativa2", value: "חטיבה 2"},
                    {id: "hativa7", value: "חטיבה 7"}
                ],
                "ogda": [
                    {id: "ogda2", value: "אוגדה 2"},
                    {id: "ogda8", value: "אוגדה 8"},
                    // Additional options for ogda
                    {id: "ogda5", value: "אוגדה 5"},
                    {id: "ogda10", value: "אוגדה 10"}
                ],
                "pikod": [
                    {id: "pikod1", value: "פיקוד 1"},
                    {id: "pikod6", value: "פיקוד 6"},
                    // Additional options for pikod
                    {id: "pikod3", value: "פיקוד 3"},
                    {id: "pikod8", value: "פיקוד 8"}
                ],
            }
        },
        {
            fieldType: "SELECT",
            id: "permissions",
            title: "הרשאות עריכה וצפייה",
            options: [
                { id: "editAndView", value: "צפייה ועריכה"},
                { id: "justView", value: "צפייה בלבד"}
            ],
            defaultValue: { id: "justView", value: "צפייה בלבד"}
        },
        // {
        //     fieldType: "DATE",
        //     id: "signUpDate",
        //     title: "תאריך הרשמה (בדיקת דייט פיקר)"
        // }
    ];

    return (
        <Card>
            <Form fields={signUpForm}
            onValidated={console.log} />
        </Card>
    )

};

export default SignUpView;