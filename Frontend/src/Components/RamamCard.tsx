import { Fab, Typography, styled } from "@mui/material";
import logo from "../assets/tzahal_logo.png";
import EditIcon from '@mui/icons-material/Edit';
import Card from "./Card";

interface iRamamCard {
    title: string,
    lastUpdated: Date,
    downloadLink: string,
    onClick: () => void
}

const RamamCard: React.FC<iRamamCard> = ({ title, lastUpdated, onClick, downloadLink }) => {

    const formattedDate = lastUpdated.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "numeric",
        year: "numeric"
    });


    const StyledCard = styled(Card)(({ theme }) => ({
        backgroundColor: theme.palette.background.default,
        display: "flex",
        position: "relative",
        flexDirection: "column",
        alignItems: "center",
        gap: theme.spacing(1.5),
    }));
    return (
        <StyledCard>
            <Fab onClick={onClick} color="primary" size="small" sx={{ position: 'absolute', top: 0, left: 0, marginTop: 1, marginLeft: 1 }}><EditIcon /></Fab>
            <a href={downloadLink} target="_blank">
                <img src={logo} width={150} height={150} />
            </a>
            <Typography>עדכון אחרון: {formattedDate}</Typography>
            <Typography fontWeight="bold" variant="h5">{title}</Typography>
        </StyledCard>
    )
};

export default RamamCard;