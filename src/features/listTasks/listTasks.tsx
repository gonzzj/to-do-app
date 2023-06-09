import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Input from "../../components/input";
import List from "../../components/list";
import Loading from "../../components/Loading";
import { IListTask } from "../../types/ListTask";
import { supabase } from "../../service/api";
import { filteringMap } from "../../mocks/filters";
import { ETaskFilter } from "../../types/TaskFilter";

interface IListTasksProps {
    filter: ETaskFilter;
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
    listTasks: IListTask[];
    setListTasks: (tasks: IListTask[]) => void;
    setSnackbar: (snackbar: { open: boolean, text: string }) => void;
}

const ListTasks = ({ filter, isLoading, setIsLoading, listTasks, setListTasks, setSnackbar }: IListTasksProps) => {
    const [inputValidation, setInputValidation] = useState<boolean>(false);

    useEffect(() => {
        const getTasks = async () => {
            const { data: tasks, error } = await supabase
                .from('tasks')
                .select('id, text, completed')
                .in('completed', filteringMap[filter])
                .order('id')
            if (error) {
                setSnackbar({
                    open: true,
                    text: 'Error: ' + error.message,
                })
            } else {
                setListTasks(tasks);
                setIsLoading(false);
            }
        }

        setIsLoading(true);
        getTasks();
    }, [filter]);

    const addTask = async (completed: boolean, text: string, position: number = listTasks.length) => {
        if (text !== "") {
            setIsLoading(true);
            const newTask = { completed, text };
            const { data, error } = await supabase.from('tasks').insert([newTask]).select('id, text, completed')
            
            if (error) {
                setSnackbar({
                    open: true,
                    text: 'Error: ' + error
                })
            } else {
                setListTasks([...listTasks, ...data]);
                setInputValidation(false);
                setIsLoading(false);
            }
        } else {
            setInputValidation(true);
        }
    };

    const toggleTask = async (id: number) => {
        setIsLoading(true);
        const newListTasks = [...listTasks];
        const currentTaskIndex = listTasks.findIndex((task) => task.id === id);

        if (currentTaskIndex !== -1) {
            const currentTask = listTasks[currentTaskIndex];

            const { data, error } = await supabase
                .from('tasks')
                .update({ completed: !currentTask.completed })
                .eq('id', id)
                .select('id, text, completed')
            
            if (error) {
                setSnackbar({
                    open: true,
                    text: 'Error: ' + error
                })
            } else {
                newListTasks[currentTaskIndex] = data[0];
                setListTasks(newListTasks)
                setIsLoading(false);
            }
        }
    };

    return (
        <Grid container>
            <Grid item xs={12}>
                <Input onSubmitInput={addTask} error={inputValidation} />
            </Grid>
            <Grid item xs={12}>
                {isLoading ? (
                    <Loading /> 
                ) : (
                    listTasks.length !== 0 && <List tasks={listTasks} handleToggle={toggleTask} />
                )}
            </Grid>
        </Grid>
    );
};

export default ListTasks;