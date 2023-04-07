import { useState } from 'react';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import Title from './components/title';
import Snackbar from './components/snackbar';
import ListTasks from './features/listTasks';
import ListTasksFooter from "./features/listTasks/ListTasksFooter";
import './styles/global.scss';
import { darkTheme, lightTheme } from './theme';
import { ETaskFilter } from './types/TaskFilter';
import { IListTask } from './types/ListTask';

function App() {
  const [listTasks, setListTasks] = useState<IListTask[]>([]);
  const [filter, setFilter] = useState<ETaskFilter>(ETaskFilter.ALL);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [flagDarkTheme, setFlagDarkTheme] = useState<boolean>(false);
  const [snackbar, setSnackbar] = useState<any>({
    open: false,
    text: ''
  });

  return (
    <ThemeProvider theme={flagDarkTheme ? darkTheme : lightTheme}>
      <CssBaseline />
      <Container maxWidth="md">
        <div className={"root"} >
          <Title flagDarkTheme={flagDarkTheme} setFlagDarkTheme={setFlagDarkTheme} />
          <ListTasks listTasks={listTasks} setListTasks={setListTasks} filter={filter} isLoading={isLoading} setIsLoading={setIsLoading} setSnackbar={setSnackbar} />
          <ListTasksFooter tasks={listTasks} setListTasks={setListTasks} filter={filter} setIsLoading={setIsLoading} setFilter={setFilter} flagDarkTheme={flagDarkTheme} setFlagDarkTheme={setFlagDarkTheme} setSnackbar={setSnackbar} />
        </div>
      </Container>
      <Snackbar snackbar={snackbar} severity={"error"} />
    </ThemeProvider>
  )
}

export default App;
