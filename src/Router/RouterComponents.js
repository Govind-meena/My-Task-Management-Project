import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from '../Pages/Dashboard/Dashboard';
import Project from '../Pages/Project/Project';
import Task from '../Pages/Task/Task';
import { ContextProvider } from '../Context/ContextProvider';
import User from '../Pages/User/User';
import Subtask from '../Pages/SubTask/Subtask';
import Sidebar from '../MainLayOut/Sidebar';
import { useState } from 'react';

const RouterComponents = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  return (
    <ContextProvider>
      <BrowserRouter>
        <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
          <Sidebar
            isOpen={isSidebarOpen}
            setIsOpen={setIsSidebarOpen}
            isVisible={isSidebarVisible}
            setIsVisible={setIsSidebarVisible}
          />
          <div
            style={{
              flex: 1,
              padding: '10px', 
              marginLeft: isSidebarVisible ? (isSidebarOpen ? '220px' : '60px') : '0px',
              transition: 'margin-left 0.3s ease',
              background: 'linear-gradient(135deg, rgb(133, 157, 195) 0%, rgb(255, 255, 255) 100%)',
              minHeight: '100vh',
              overflowX: 'hidden',
            }}
          >
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/Project" element={<Project />} />
              <Route path="/Task" element={<Task />} />
              <Route path="/User" element={<User />} />
              <Route path="/Subtask" element={<Subtask />} />
              <Route path="*" element={<Dashboard />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </ContextProvider>
  );
};

export default RouterComponents;