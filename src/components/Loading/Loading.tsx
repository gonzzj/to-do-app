import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Loading = () => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 1 }}>
            <CircularProgress />
        </Box>
    );
};

export default Loading;