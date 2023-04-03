import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import RuleIcon from '@mui/icons-material/Rule';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useState } from 'react';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { ETaskFilter } from '../../types/TaskFilter';

interface IListTasksDrawerProps {
    setFilter: (value: ETaskFilter) => void;
    flagDarkTheme: boolean;
    setFlagDarkTheme: (value: boolean) => void;
    onClickClearCompleted: () => void;
}

const ListTasksDrawer = ({ setFilter, flagDarkTheme, setFlagDarkTheme, onClickClearCompleted }: IListTasksDrawerProps) => {
    const [drawer, setDrawer] = useState<boolean>(false);

    return (
        <>
            <IconButton onClick={() => setDrawer(true)} sx={{ position: 'absolute', top: '28px', right: '28px'}}>
                <MenuIcon />
            </IconButton>
            <Drawer
                anchor={'right'}
                open={drawer}
                onClose={() => setDrawer(false)}
            >
                <Box
                    sx={{ width: 270 }}
                    onClick={() => setDrawer(false)}
                    onKeyDown={() => setDrawer(false)}
                >
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => setFilter(ETaskFilter.ALL)}>
                                <ListItemIcon>
                                    <RuleIcon />
                                </ListItemIcon>
                                <ListItemText primary={'All'} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => setFilter(ETaskFilter.ACTIVE)}>
                                <ListItemIcon>
                                    <PlaylistAddCheckIcon />
                                </ListItemIcon>
                                <ListItemText primary={'Active'} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => setFilter(ETaskFilter.COMPLETED)}>
                                <ListItemIcon>
                                    <PlaylistRemoveIcon />
                                </ListItemIcon>
                                <ListItemText primary={'Completed'} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton onClick={onClickClearCompleted}>
                                <ListItemIcon>
                                    <DeleteSweepIcon />
                                </ListItemIcon>
                                <ListItemText primary={'Clear completed tasks'} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => setFlagDarkTheme(!flagDarkTheme)}>
                                <ListItemIcon>
                                    {flagDarkTheme ? <LightModeIcon /> : <DarkModeIcon />}
                                </ListItemIcon>
                                <ListItemText primary={flagDarkTheme ? 'Light mode' : 'Dark mode'} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </>
    );
};

export default ListTasksDrawer;