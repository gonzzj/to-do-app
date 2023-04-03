import { useCallback, useMemo } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme, styled } from '@mui/material/styles';
import { IListTask } from "../../types/ListTask";
import { ETaskFilter } from "../../types/TaskFilter";
import { supabase } from "../../service/api";
import ListTasksDrawer from "./ListTasksDrawer";
import ToggleButton, { ToggleButtonProps } from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

interface IListTasksFooterProps {
    tasks: IListTask[];
    flagDarkTheme: boolean;
    setFlagDarkTheme(flag: boolean): void;
    setListTasks: (tasks: IListTask[]) => void;
    setFilter: (filter: ETaskFilter) => void;
    filter: ETaskFilter;
    setIsLoading: (loading: boolean) => void;
}

const ToggleButtonStyled = styled(ToggleButton)<ToggleButtonProps>(({ theme }) => ({
    border: 0,
    borderRadius: 0,
    '&.Mui-selected': {
        backgroundColor: 'transparent',
    }
}));

const ListTasksFooter = ({ tasks, setListTasks, filter, setFilter, setIsLoading, flagDarkTheme, setFlagDarkTheme }: IListTasksFooterProps) => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

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
        <Grid container alignItems={"center"} paddingX={2} paddingY={0}>
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
                        <ToggleButtonGroup
                            color="primary"
                            value={filter}
                            exclusive
                            onChange={(
                                e: React.MouseEvent<HTMLElement>,
                                newFilter: ETaskFilter,
                            ) => {
                                setFilter(newFilter);
                            }}
                        >
                            <ToggleButtonStyled value={ETaskFilter.ALL}>All</ToggleButtonStyled>
                            <ToggleButtonStyled value={ETaskFilter.ACTIVE}>Active</ToggleButtonStyled>
                            <ToggleButtonStyled value={ETaskFilter.COMPLETED}>Completed</ToggleButtonStyled>
                        </ToggleButtonGroup>
                    </Grid>
                    <Grid item xs={12} md={4} container justifyContent="flex-end">
                        <Button onClick={onClickClearCompleted}>Clear completed tasks</Button>
                    </Grid>
                </>
            ) : (
                <ListTasksDrawer 
                    setFilter={setFilter}
                    flagDarkTheme={flagDarkTheme}
                    setFlagDarkTheme={setFlagDarkTheme}
                    onClickClearCompleted={onClickClearCompleted}
                />
            )}
        </Grid>
    );
};

export default ListTasksFooter;