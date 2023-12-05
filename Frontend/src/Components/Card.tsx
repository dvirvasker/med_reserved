import { Box, styled,  } from "@mui/material";


export default styled(Box)(({theme}) => ({
    borderRadius: theme.spacing(2),
    boxShadow: theme.shadows[4],
    padding: theme.spacing(1.5),
    backgroundColor: theme.palette.background.paper
}))

