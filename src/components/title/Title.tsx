import Typography, { TypographyProps } from "@mui/material/Typography";
import Button from '@mui/material/Button';
import Grid, { GridProps } from "@mui/material/Grid";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const GridStyled = styled(Grid)<GridProps>(({ theme }) => ({
    marginBottom: '28px',
    borderBottom: '1px solid #ccc',
    [theme.breakpoints.up('md')]: {
        marginBottom: '32px',
    },
}));

const TypographyStyled = styled(Typography)<TypographyProps>(({ theme }) => ({
    letterSpacing: 4,
    fontWeight: 'bold',
    fontSize: 32,
    paddingBottom: '24px',
    [theme.breakpoints.up('md')]: {
        fontSize: 64,
    },
}));

interface ITitleProps {
    flagDarkTheme: boolean;
    setFlagDarkTheme(flag: boolean): void;
}

const Title = ({ flagDarkTheme, setFlagDarkTheme }: ITitleProps) => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <GridStyled container justifyContent={"space-between"}>
            <Grid item>
                <TypographyStyled variant="h2">
                    TO DO APP
                </TypographyStyled>
            </Grid>
            {matches && (
                <Grid item>
                    <Button
                        variant="outlined"
                        startIcon={flagDarkTheme ? <LightModeIcon /> : <DarkModeIcon />}
                        onClick={() => setFlagDarkTheme(!flagDarkTheme)}
                    >
                        {flagDarkTheme ? 'Light mode' : 'Dark mode'}
                    </Button>
                </Grid>
            )}
        </GridStyled>
    );
};

export default Title;