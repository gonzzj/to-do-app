import MuiList from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { IListTask } from '../../types/ListTask';

interface IListProps {
    tasks: IListTask[];
    handleToggle: (position: number) => void;
}

const List = ({ tasks, handleToggle }: IListProps) => {
    return (
        <MuiList sx={{ width: '100%' }}>
            {tasks.map((value, key) => {
                return (
                    <ListItem
                        key={key}
                        disablePadding
                    >
                        <ListItemButton role={undefined} onClick={() => handleToggle(value.position)} dense>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={value.completed}
                                    tabIndex={-1}
                                    disableRipple
                                />
                            </ListItemIcon>
                            <ListItemText primary={value.text} />
                        </ListItemButton>
                    </ListItem>
                );
            })}
        </MuiList>
    );
};

export default List;