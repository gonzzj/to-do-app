import Typography, { TypographyProps } from "@mui/material/Typography";
import { styled } from '@mui/material/styles';

const TypographyStyled = styled(Typography)<TypographyProps>(({ theme }) => ({
    letterSpacing: 4,
    fontWeight: 'bold',
    marginBottom: '28px',
    paddingBottom: '18px',
    borderBottom: '1px solid #ccc',
    fontSize: 32,
    [theme.breakpoints.up('md')]: {
        marginBottom: '32px',
        paddingBottom: '24px',
        fontSize: 64,
    },
}));

const Title = () => (
    <TypographyStyled variant="h2">
        TO DO APP
    </TypographyStyled>
);

export default Title;