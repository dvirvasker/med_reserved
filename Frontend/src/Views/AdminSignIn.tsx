import CardSignInUp from "../Components/CardSignInUp";
import FormSignIn from "../Components/Form/FormSignIn";
import { iField } from "../interfaces";
import mgm from "../assets/Images/mgm.png";
import axios from "axios";
import { signin, authenticate, isAuthenticated } from "../auth/index";


const AdminSignInView = () => {
    const fields: iField[] = [
        {
            id: "signInTitle",
            title: "התחברות",
            fieldType: "TITLE"
        },
        {
            id: "personalnumber",
            title: "מספר אישי",
            fieldType: "TEXT_FIELD",
            // inputType: "password"
        },
        // {
        //     id: "password",
        //     title: "סיסמת מערכת",
        //     fieldType: "TEXT_FIELD"
        // }
    ];

    const clickSubmit = (personalnumber: string) => {
        //event.preventDefault()
        // setValues({ ...values, loading: true, successmsg: false, error: false });
        axios
            .post(`http://localhost:8000/api/signin`, personalnumber)
            .then((res) => {
                authenticate(res.data);
                // let url = location.href;
                // location.href = "/dashboard/";
                // window.open("/dashboard/")
                console.log(res.data);
                if (res.data.user.role === "0") {
                    location.href = "/dashboard/";
                }
                if (res.data.user.role === "1") {
                    location.href = "/miluimpage";
                }
                if (res.data.user.role === "2") {
                    location.href = "/dashboard/";
                }
                // setValues({
                // 	...values,
                // 	loading: false,
                // 	error: false,
                // 	redirectToReferrer: true,
                // });
            })
            .catch((error) => {
                console.log(error);
                // setValues({
                // 	...values,
                // 	errortype: error.error,
                // 	loading: false,
                // 	error: true,
                // });
            });
    };

    return (
        <CardSignInUp style={{ height: "100%" }}>
            <img src={mgm} alt="mgm" style={{
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
                width: "50%",
            }}></img>
            <FormSignIn onValidated={clickSubmit} fields={fields} />
        </CardSignInUp>
    )
};

export default AdminSignInView;