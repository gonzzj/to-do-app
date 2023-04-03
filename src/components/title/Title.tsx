import Typography from "@mui/material/Typography";

const Title = () => (
    <Typography 
        variant="h2"
        component="h2"
        sx={{
            letterSpacing: 4,
            fontWeight: 'bold',
            marginBottom: '24px'
        }}
    >
        TO DO
    </Typography>
);

export default Title;