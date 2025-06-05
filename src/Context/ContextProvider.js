import React, { createContext, useState } from 'react';
export const ProjectContext = createContext();
export const ContextProvider = ({ children }) => {
  const [projectData, setProjectData] = useState([]);
  const [taskData, setTaskData] = useState([])
  const [userData, setUserData] = useState([])
  const [subTaskData, setSubTaskData] = useState([])
  return (
    <ProjectContext.Provider value={{ projectData, setProjectData, taskData, setTaskData, userData, setUserData, subTaskData, setSubTaskData }}>
      {children}
    </ProjectContext.Provider>
  );
};