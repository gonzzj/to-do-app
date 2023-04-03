import { useState } from "react";
import Input from "../../components/Input";
import List from "../../components/List";
import { IListTask } from "../../types/ListTask";

const ListTasks = () => {
    const [inputValidation, setInputValidation] = useState<boolean>(false);
    const [listTasks, setListTasks] = useState<IListTask[]>([]);
    
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
        <>
            <Input onSubmitInput={addTask} error={inputValidation} />
            <List tasks={listTasks} handleToggle={toggleTask} />
        </>
    );
};

export default ListTasks;