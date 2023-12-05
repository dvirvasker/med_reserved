import { Box, Typography } from "@mui/material";

const ProgressVerticalLine = ({redThres, yellowThres}: {redThres: number, yellowThres: number}) => {
    return (
        <Box sx={{height: "100%", ml: 2,}}>
            {/* green line */}
            <Box style={{display: "flex", height: `${100 - yellowThres}%`}}>
                <Box sx={{bgcolor: theme => theme.palette.success.main, width: "10px", borderTopLeftRadius: 6, borderTopRightRadius: 6}} />
                <Box sx={{display: "flex", flexDirection: "column", pl: 1, m: 0, justifyContent: "space-between", height: "100%"}}>
                    <Typography sx={{transform: "translateY(-20%)"}} variant="caption">100%</Typography>
                    <Typography sx={{transform: "translateY(50%)"}}  variant="caption">{yellowThres}%</Typography>
                </Box>
            </Box>
            {/* yellow line */}
            <Box style={{display: "flex", height: `${yellowThres - redThres}%`}}>
                <Box sx={{bgcolor: theme => theme.palette.warning.light, width: "10px"}} />
            </Box>
            {/* red line */}
            <Box style={{display: "flex", height: `${redThres}%`}}>
                <Box sx={{bgcolor: theme => theme.palette.error.main, width: "10px", borderBottomLeftRadius: 6, borderBottomRightRadius: 6}} />
                <Box sx={{display: "flex", flexDirection: "column", pl: 1, m: 0, justifyContent: "space-between", height: "100%"}}>
                    <Typography variant="caption" style={{transform: "translateY(-50%)"}}>{redThres}%</Typography>
                    <Typography variant="caption">0%</Typography>
                </Box>
            </Box>

        </Box>
    );
}

export default ProgressVerticalLine;
