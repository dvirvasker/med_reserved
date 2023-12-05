import { Box, Chip, Divider, IconButton, Typography, styled, useTheme } from "@mui/material";
import Card from "./Card";
import ProgressCircular from "./ProgressCircular";
import ProgressVerticalLine from "./ProgressVerticalLine";
import ProgressLine from "./ProgressLine";
import { ChevronLeft } from "@mui/icons-material";
import { useSignal } from "@preact/signals";

interface iDashboardCard {
    redThres?: number,
    yellowThres?: number,
    title: string,
    upperDescription?: string,
    trueCount: number,
    falseCount: number,
    lowerDescription?: string[],
    tipulCount: number,
    tipulHHCount: number,
    harigTipulCount: number,
    harigTipulHHCount: number,
    mizdamenetCount: number,
    mizdamenetHHCount: number,

}
const DashboardCard: React.FC<iDashboardCard> = ({ title, upperDescription, lowerDescription, redThres = 40, yellowThres = 80, trueCount, falseCount }) => {
    const theme = useTheme();
    const isOpen = useSignal(false);
    const MainDataBox = styled(Box)(({ theme }) => ({
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
        position: "relative",
        alignItems: "center",
        gap: theme.spacing(1)
    }));


    const mainData = (
        <MainDataBox onClick={() => isOpen.value = !isOpen.value}>
            <Box>
                <Typography fontWeight="bold" variant="h6">{title}</Typography>
                <IconButton color="primary" size="small" sx={{ position: 'absolute', top: 0, right: 0, marginLeft: 1 }}><ChevronLeft /></IconButton>
            </Box>
            <Typography sx={{ color: theme => theme.palette.text.secondary }}>{upperDescription}</Typography>
            <Box style={{ display: "flex", height: "130px" }}>
                <ProgressCircular trueCount={trueCount} falseCount={falseCount} yellowThres={yellowThres} redThres={redThres} />
                <ProgressVerticalLine yellowThres={yellowThres} redThres={redThres} />
            </Box>
            <Box style={{ display: "flex", gap: "10px" }}>
                {lowerDescription?.map(label => <Chip key={label} size="small" label={label} />)}
            </Box>

        </MainDataBox>
    );

    const progressDailSent = (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography variant="body2" textAlign="center" fontWeight="bold">נשלח חייגן: 12
                {/* <span style={{color: theme.palette.info.light}}>
                {" "}(חלקי חילוף: 30) 
                </span> */}
            </Typography>
            <ProgressLine value={10} redThres={redThres} yellowThres={yellowThres} />
        </Box>
    );

    const progressPresent = (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography variant="body2" textAlign="center" fontWeight="bold">התייצבות: 2
                {/* <span style={{color: theme.palette.info.light}}>
                {" "}(חלקי חילוף: 30) 
                </span> */}
            </Typography>
            <ProgressLine value={10} redThres={redThres} yellowThres={yellowThres} />
        </Box>
    );

    const progressShamapOpen = (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography variant="body2" textAlign="center" fontWeight="bold">נפתח שמ"פ: 2
                {/* <span style={{color: theme.palette.info.light}}>
                {" "}(חלקי חילוף: 30) 
                </span> */}
            </Typography>
            <ProgressLine value={10} redThres={redThres} yellowThres={yellowThres} />
        </Box>
    );
    const OpenDataBox = styled(Box)(({ theme }) => ({
        display: "flex",
        flexDirection: "column",
        gap: theme.spacing(2),
        paddingTop: theme.spacing(2)
    }));

    const whenOpenData = (
        <OpenDataBox>
            <Divider />
            {progressDailSent}
            {progressPresent}
            {progressShamapOpen}
        </OpenDataBox>
    );

    return (
        <Card>
            {mainData}
            {isOpen.value && whenOpenData}
        </Card>

    );
};

export default DashboardCard;