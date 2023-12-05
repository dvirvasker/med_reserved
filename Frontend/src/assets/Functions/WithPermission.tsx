// a function to take user permission from context and redirect base of it 

import { Navigate } from "react-router-dom";

const WithPermission = (component: React.ReactNode, neededPermission: number) => {
    const userPermission = 5; // just an abritary number

    if (userPermission < 0) {
        // that means user is not signed in 
        return <Navigate to="sign_in" />
    }

    return userPermission >= neededPermission ? component : <Navigate to="/" />
};

export default WithPermission;