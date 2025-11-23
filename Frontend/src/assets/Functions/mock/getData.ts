import axios from "axios";
// import { GetDataResponse } from "./mockMiluimPage";

export async function getData() {
    try {
        // 👇️ const data: GetUsersResponse
        const { data, status } = await axios.get(
            `http://localhost:8000/api/reservevisits`,
            {
                headers: {
                    Accept: 'application/json',
                },
            }
        );

        console.log(data);

        // 👇️ "response status is: 200"
        console.log('response status is: ', status);

        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log('error message: ', error.message);
            return error.message;
        } else {
            console.log('unexpected error: ', error);
            return 'An unexpected error occurred';
        }
    }
}
