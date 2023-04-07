import MuiList, { ListProps } from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles';
import { IListTask } from '../../types/ListTask';

interface IListProps {
    tasks: IListTask[];
    handleToggle: (position: number) => void;
}

const MuiListStyled = styled(MuiList)<ListProps>(({ theme }) => ({
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: 0,
    margin: '12px 0 8px 0',
}));

const List = ({ tasks, handleToggle }: IListProps) => (
    <MuiListStyled>
        {tasks.map((value, key) => {
            return (
                <ListItem
                    key={key}
                    disablePadding
                >
                    <ListItemButton onClick={() => handleToggle(value.id)} dense>
                        <ListItemIcon>
                            <Checkbox
                                edge="start"
                                checked={value?.completed || false}
                                tabIndex={-1}
                                disableRipple
                            />
                        </ListItemIcon>
                        <ListItemText primary={value.text} />
                    </ListItemButton>
                </ListItem>
            );
        })}
    </MuiListStyled>
);

export default List;