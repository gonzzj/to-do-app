import Container from '@mui/material/Container';
import Title from './components/Title';
import ListTasks from './features/ListTasks';
import './styles/global.scss';

function App() {
  return (
    <Container maxWidth="md">
      <div className={"root"} >
        <Title />
        <ListTasks />
      </div>
    </Container>
  )
}

export default App;
