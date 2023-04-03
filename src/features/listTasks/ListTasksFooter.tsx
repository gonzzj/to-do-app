import { useCallback, useMemo, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import useMediaQuery from '@mui/material/useMediaQuery';
import MenuIcon from '@mui/icons-material/Menu';
import RuleIcon from '@mui/icons-material/Rule';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import { useTheme } from '@mui/material/styles';
import { IListTask } from "../../types/ListTask";
import { ETaskFilter } from "../../types/TaskFilter";
import { supabase } from "../../service/api";
import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

interface IListTasksFooterProps {
    tasks: IListTask[];
    setListTasks: (tasks: IListTask[]) => void;
    setFilter: (filter: ETaskFilter) => void;
    setIsLoading: (loading: boolean) => void;
}

const ListTasksFooter = ({ tasks, setListTasks, setFilter, setIsLoading }: IListTasksFooterProps) => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    const [drawer, setDrawer] = useState<boolean>(false);

    const tasksUncompleted = useMemo(() => {
        return tasks.filter(task => !task.completed);
    }, [tasks]);

    const onClickClearCompleted = useCallback(async () => {
        setIsLoading(true)
        const { error } = await supabase
            .from('tasks')
            .delete()
            .eq('completed', true);

        if (error) {
            console.log(error);
        } else {
            setIsLoading(false)
            setListTasks(tasksUncompleted);
        }
    }, [tasks]);

    return (
        <Grid container item alignItems={"center"} paddingX={2} paddingY={0}>
            <Grid item xs={12} md={4} sx={{ cursor: "default" }}>
                {tasks.length !== 0 ?
                    <Typography>{tasksUncompleted.length !== 0 ? `${tasksUncompleted.length} remaining` : 'All tasks have been completed'}</Typography>
                :
                    <Typography>No tasks on the list</Typography>
                }
            </Grid>
            {matches ? (
                <>
                    <Grid item xs={12} md={4} container justifyContent="center">
                        <Button onClick={() => setFilter(ETaskFilter.ALL)}>All</Button>
                        <Button onClick={() => setFilter(ETaskFilter.ACTIVE)}>Active</Button>
                        <Button onClick={() => setFilter(ETaskFilter.COMPLETED)}>Completed</Button>
                    </Grid>
                    <Grid item xs={12} md={4} container justifyContent="flex-end">
                        <Button onClick={onClickClearCompleted}>Clear completed tasks</Button>
                    </Grid>
                </>
            ) : (
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
                        </Box>
                    </Drawer>
                </>
            )}
        </Grid>
    );
};

export default ListTasksFooter;