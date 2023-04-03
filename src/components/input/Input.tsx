import TextField, { TextFieldProps } from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Checkbox from "@mui/material/Checkbox";
import AddTaskIcon from '@mui/icons-material/AddTask';
import { styled } from '@mui/material/styles';
import { useState } from "react";

interface IInputProps {
    onSubmitInput: (completed: boolean, text: string) => void;
    error: boolean
} 

const InputStyled = styled(TextField)<TextFieldProps>(({ theme }) => ({
    marginBottom: 14
}));

const Input = ({ onSubmitInput, error }: IInputProps) => {
    const [value, setValue] = useState<string>('');
    const [complete, setComplete] = useState<boolean>(false);

    const handleSubmit = () => {
        onSubmitInput(complete, value);
        setValue('');
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleSubmit();
        }
    };
      
    return (
        <InputStyled
            error={error}
            placeholder="Create a new To Do"
            variant="outlined"
            onKeyDown={handleKeyDown}
            onChange={(e) => setValue(e.target.value)}
            value={value}
            helperText={error ? "You have to write something in order to add new task" : ""}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <Checkbox
                            edge="start"
                            checked={complete}
                            onClick={() => setComplete(!complete)}
                            disableRipple
                        />
                    </InputAdornment>
                ),
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            onClick={handleSubmit}
                            color={error ? "error" : "default"}
                        >
                            <AddTaskIcon />
                        </IconButton>
                    </InputAdornment>
                )
            }}
            fullWidth
        />
    );
};

export default Input;