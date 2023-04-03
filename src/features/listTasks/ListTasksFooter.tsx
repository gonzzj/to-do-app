import { useCallback, useMemo } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { IListTask } from "../../types/ListTask";
import { ETaskFilter } from "../../types/TaskFilter";
import { supabase } from "../../service/api";

interface IListTasksFooterProps {
    tasks: IListTask[];
    setListTasks: (tasks: IListTask[]) => void;
    setFilter: (filter: ETaskFilter) => void;
    setIsLoading: (loading: boolean) => void;
}

const ListTasksFooter = ({ tasks, setListTasks, setFilter, setIsLoading }: IListTasksFooterProps) => {
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
            <Grid item xs={12} md={4}>
                {tasks.length !== 0 ?
                    <Typography>{tasksUncompleted.length !== 0 ? `${tasksUncompleted.length} remaining` : 'All tasks have been completed'}</Typography>
                :
                    <Typography>No tasks on the list</Typography>
                }
            </Grid>
            <Grid item xs={12} md={4} container justifyContent="center">
                <Button onClick={() => setFilter(ETaskFilter.ALL)}>All</Button>
                <Button onClick={() => setFilter(ETaskFilter.ACTIVE)}>Active</Button>
                <Button onClick={() => setFilter(ETaskFilter.COMPLETED)}>Completed</Button>
            </Grid>
            <Grid item xs={12} md={4} container justifyContent="flex-end">
                <Button variant="text" onClick={onClickClearCompleted}>Clear completed tasks</Button>
            </Grid>
        </Grid>
    );
};

export default ListTasksFooter;