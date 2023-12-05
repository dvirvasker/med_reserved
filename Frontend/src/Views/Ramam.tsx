import { Box, Grid, Modal } from "@mui/material";
import Card from "../Components/Card"
import RamamCard from "../Components/RamamCard"
import { iField } from "../interfaces";
import Form from "../Components/Form/Form";
import { DefaultNavbar } from "../Components/Navbar";
import { useSignal } from "@preact/signals";

const RamamView = () => {
    const currentEditRamamId = useSignal<boolean>(false);
    const fields: iField[] = [
        {
            title: "יחידה",
            id: "unit",
            fieldType: "SELECT",
            width: 6,
            options: [
                { id: "ogda-2-1", value: "אוגדה 2-1" },
                { id: "ogda-2-2", value: "אוגדה 2-2" },
                { id: "ogda-2-3", value: "אוגדה 2-3" },
                { id: "ogda-2-4", value: "אוגדה 2-4" },
                { id: "ogda-2-5", value: "אוגדה 2-5" },
                { id: "ogda-2-6", value: "אוגדה 2-6" },
            ],
            defaultValue:{ id: "ogda-2-6", value: "אוגדה 2-6" },
            registerOptions: {
                required: "חובה לבחור יחידה",
            }
        },
        {
            title: "שם היחידה באנגלית",
            id: "unitNamePicture",
            fieldType: "TEXT_FIELD",
            width: 6,
            registerOptions: {
                required: "חובה לבחור שם יחידה שנמצא במערכת"
            }
        },
        {
            title: "צירוף מסמך",
            id: "addedFile",
            fieldType: "FILE",
            registerOptions: {
                required: "חובה להוסיף קובץ תקין"
            },

        }

    ];

    return (
        <Box 
            sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
        }}>
            <DefaultNavbar title="מרכז המצגות" />
            <Card style={{height: "100%"}}>
                <Modal open={currentEditRamamId.value} onClose={() => {currentEditRamamId.value = false}}>
                <Card
                style={{  
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 800,
                }}>
                    <Form fields={fields} onValidated={console.log} />
                </Card>
                </Modal>
                <Grid container spacing={3}>
                {Array.from({ length: 12 }, (_, index) => (
                    <Grid item xs={3} xl={2} key={index}>
                        <RamamCard downloadLink="test" title="אוגדה 3" lastUpdated={new Date()} onClick={() => {currentEditRamamId.value = true}} />
                    </Grid>
                ))}
                </Grid>
            </Card>
        </Box>

    )
};

export default RamamView;
