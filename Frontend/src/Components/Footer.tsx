import { Box, Button, Typography, styled } from "@mui/material";
import Card from "./Card";

const StyledCard = styled(Card)(({theme}) => ({
    height: 70,
    display: "flex",
    alignItems: "center",
    backgroundColor: theme.palette.background.paper
}));


// , download as excel, last updated
export const DataGridFooter = () => {

    return (
        <StyledCard style={{marginTop: "auto"}}>
            <Typography variant="h5" fontWeight="bold">
                תאריך עדכון אחרון: 19.11.23
            </Typography>
            <Box style={{marginRight: "auto", display: "flex", gap: 15}}>
                <Button variant="contained">הורדה כקובץ EXCEL</Button>
                <Button variant="outlined">תצוגת שעונים</Button>
                <Button variant="outlined">המרה לשעון</Button>
            </Box>

        </StyledCard>
    )
};

// last updated, to table
export const DashboardFooter = () => {
    return (
        <StyledCard style={{marginTop: "auto"}}>
            <Typography variant="h5" fontWeight="bold">
                תאריך עדכון אחרון: 19.11.23
            </Typography>

            <Box style={{marginRight: "auto", display: "flex", gap: 15}}>
            <Button variant="contained">תצוגת טבלה</Button>
            <Button>מעבר לשעוני יחידות</Button>
            </Box>
        </StyledCard>
    );

};

