import { useEffect, useState } from 'react';
import MuiSnackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

type Severity = 'error' | 'warning' | 'info' | 'success';

interface ISnackbarProps {
    snackbar: {
        open: boolean,
        text: ''
    },
    severity: Severity;
}

const Snackbar = ({ snackbar, severity }: ISnackbarProps) => {
    const [open, setOpen] = useState<boolean>(snackbar.open);

    useEffect(() => {
        setOpen(snackbar.open)
    }, [snackbar]);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <MuiSnackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
            <Alert onClose={handleClose} severity={severity}>
                {snackbar.text}
            </Alert>
        </MuiSnackbar>
    );    
};

export default Snackbar;