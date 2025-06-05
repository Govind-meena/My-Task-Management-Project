import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from '../Pages/Dashboard/Dashboard';
import Project from '../Pages/Project/Project';
import Task from '../Pages/Task/Task';
import Topbar from '../MainLayOut/Topbar';
import { ContextProvider } from '../Context/ContextProvider';
import User from '../Pages/User/User';
import Subtask from '../Pages/SubTask/Subtask';

const RouterComponents = () => {
  return (
    <ContextProvider>
      <BrowserRouter>
        <Topbar />
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/Project' element={<Project />} />
          <Route path='/Task' element={<Task />} />
          <Route path='*' element={<Dashboard />} />
          <Route path='/User' element={<User />} />
          <Route path='/Subtask' element={<Subtask />} />
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  );
};

export default RouterComponents;
