# 🚀 Task Management System

A web-based Task Management System built using **React** to help teams plan, track, and manage tasks efficiently. The system supports task creation, assignment, status tracking, due dates, and more.

---

## 🔧 Tech Stack

- **Frontend**: React, CSS Modules
- **State Management**: React Context API
- **Routing**: React Router DOM
- **Date Handling**: Day.js
- **Icons**: React Icons

---

## ✅ Features

- 📋 Create and manage tasks
- 👤 Assign users to tasks
- 🏷️ Set task types and priorities
- 🕒 Track task status (Open, In Progress, Paused, Done)
- 📅 Set and display due dates using `dayjs`
- 👁️ View task and sub-task details
- ✏️ Edit and delete tasks
- 🎯 User initials for quick recognition
- 📂 Context-based global state management

---

📌 Dependencies
  -   react
  -   react-dom
  -   react-icons
  -   react-router-dom
  -   dayjs

📘 Project Documentation
This documentation outlines the complete workflow of the Project Management System, including project creation, user management, task and subtask handling, and dashboard overview.

🟢 Step 1: Project Management
     Create a New Project
     Navigate to the Project Add Form and enter the required project details to create a new project.

     View Project List
     After successfully adding a project, it will appear in the project list. From here, you can:
     Update the project details.
     Delete any project as needed.

🟢 Step 2: User Management

    Add a New User
    Go to the User Add Form and fill in the necessary information to create a new user.

    Manage User List
    Once a user is added, their data will be displayed in the user list. From here, you can:
    Update user information.
    Delete a user if needed.

🟢 Step 3: Task Management
    Create a Task
    Select a Project in which you want to create the task (required field).

If you try to save the task without selecting a project, an error message will be shown.
Enter the Task Title.
Provide the Task Description.
Select the Task Priority (e.g., Low, Medium, High).
Choose the Due Date.
Click the "Add Task" button to save the task.

View and Assign Tasks

After creation, tasks are listed in the Task List view.
Each task includes an Assignee dropdown where you can assign it to a user.
The user list is populated from the added users.
Once a user is selected, the task is assigned to that user.
Task Status
Every task is created with a default status of "Open".

Users can update the task status to:
In-Progress
Done
Paused, etc.

🟢 Step 4: Subtask Management
View Task Details
Click the 👁️ eye icon beside any task to open the Task Details window.

Add a Subtask
In the Task Details window, click the "Add SubTask" button.
Enter the required subtask information and save it.

Manage Subtasks
Subtasks appear in a list below their respective task.
From this list, you can:
Update subtask information.
Delete any subtask as needed.

🟢 Final Step: Dashboard Overview
Accessing the Dashboard

Navigate to the Dashboard section of the application.

Filtering Tasks
Use the filters to select a User and a Task Status (Open, In-Progress, Paused, Done).
Based on the selection, the dashboard displays tasks assigned to the selected user with the specified status.
Task Status Overview

The dashboard contains separate boxes for each task status:
🟡 Open Tasks
🔵 In-Progress Tasks
🟠 Paused Tasks
✅ Done Tasks
Each box shows the count and relevant task data for easy tracking and monitoring.
   

git Repositorie
https://github.com/Govind-meena/My-Task-Management-Project

Navigate to the Project Directory
cd My-Task-Management-Project

Install Required Dependencies
npm install 

Start the Development Server
npm start

