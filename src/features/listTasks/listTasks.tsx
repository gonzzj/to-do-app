import { useState, useMemo } from "react";
import Grid from "@mui/material/Grid";
import Input from "../../components/Input";
import List from "../../components/List";
import ListTasksFooter from "./ListTasksFooter";
import { IListTask } from "../../types/ListTask";
import { ETaskFilter } from "../../types/TaskFilter";

const ListTasks = () => {
    const [filter, setFilter] = useState<ETaskFilter>(ETaskFilter.ALL);
    const [inputValidation, setInputValidation] = useState<boolean>(false);
    const [listTasks, setListTasks] = useState<IListTask[]>([]);
    
    const filteredTasks = useMemo(() => {
        switch (filter) {
            case ETaskFilter.ACTIVE:
                return listTasks.filter(task => !task.completed);
            case ETaskFilter.COMPLETED:
                return listTasks.filter(task => task.completed);
            default:
                return listTasks;
        }
    }, [listTasks, filter]);

    const addTask = (completed: boolean, text: string, position: number = listTasks.length) => {
        if (text !== "") {
            const newTask = { completed, text, position };
            setListTasks([...listTasks, newTask]);
            setInputValidation(false);
        } else {
            setInputValidation(true);
        }
    };

    const toggleTask = (position: number) => {
        const newListTasks = [...listTasks];
        const currentTaskIndex = listTasks.findIndex((task) => task.position === position);
        
        if (currentTaskIndex !== -1) {
            const currentTask = listTasks[currentTaskIndex];
            const newTask = {
                ...currentTask,
                completed: !currentTask.completed
            }
            
            newListTasks[currentTaskIndex] = newTask;

            setListTasks(newListTasks)
        }
    };

    return (
        <Grid container>
            <Grid item xs={12}>
                <Input onSubmitInput={addTask} error={inputValidation} />
            </Grid>
            {listTasks.length !== 0 && (
                <Grid item xs={12}>
                    <List tasks={filteredTasks} handleToggle={toggleTask} />
                </Grid>
            )}
            <ListTasksFooter tasks={listTasks} setListTasks={setListTasks} setFilter={setFilter} />
        </Grid>
    );
};

export default ListTasks;