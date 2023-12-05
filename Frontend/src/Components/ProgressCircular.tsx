import { Box, CircularProgress, Typography, styled } from "@mui/material";


// a circular progress with background arch color
const StyledCircularProgress = styled(CircularProgress)(() => ({
    position: 'relative',
    display: 'inline-flex',
    '& svg': {
      transform: 'rotate(-90deg)',
    },
    '& .MuiCircularProgress-svg': {
      transform: 'rotate(90deg)',
      
    },
    '& .MuiCircularProgress-circle': {
      strokeLinecap: 'round',
    },
  }));

interface iProgressCircular {
    trueCount: number;
    falseCount: number;
    yellowThres: number;
    redThres: number;
  }
  
const ProgressCircular: React.FC<iProgressCircular> = ({trueCount, falseCount, redThres, yellowThres}) => {
    const value = (trueCount / (falseCount + trueCount)) * 100;
    return (
        <Box position="relative">
            <StyledCircularProgress variant="determinate" sx={{color: theme => theme.palette.background.paper}} value={100} thickness={3} size={130}/>
            <StyledCircularProgress variant="determinate" sx={{position: "absolute", left: 0, color: theme => value > yellowThres ? theme.palette.success.main : value > redThres ? theme.palette.warning.light : theme.palette.error.main}} value={value} thickness={3} size={130}/>
            <Box sx={{ textAlign: "center", position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                <Typography variant="h6" fontWeight="bold">{value.toFixed(2)}%</Typography>
                <Typography fontWeight="italic" variant="body2">{trueCount}/{trueCount + falseCount}</Typography>
            </Box>
        </Box>
    );
} 

export default ProgressCircular;