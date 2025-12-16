# VectorShift Pipeline Builder

My submission for VectorShift Frontend Technical Assessment. This project enables users to visually construct data processing pipelines and validate their structure of Nodes and Edges being used in the pipeline for the formation of Directed Acyclic Graph (DAG).

## Deployments

| Entity | Platform | URL Endpoint |
| :--- | :--- | :--- |
| **React/Frontend** | **Vercel** | [Frontend](https://reactflow-pipeline-editor.vercel.app)|
| **FAST API Server** | **Vercel** | [Backend](https://pipeline-editor-server.vercel.app) |

---

## 💻 Tech Stack

[![React](https://img.shields.io/badge/react-18.2.0-61dafb?style=flat&logo=react)](https://react.dev/)
[![React Flow](https://img.shields.io/badge/React%20Flow-11.8.3-FF0055?style=flat&logo=reactflow)](https://reactflow.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.19-06B6D4?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![Zustand](https://img.shields.io/badge/Zustand-4.5.2-E9A233?style=flat&logo=zustand)](https://zustand-demo.pmnd.rs/)
[![Python](https://img.shields.io/badge/Python-3.12-3776AB?style=flat&logo=python)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.111.0-009688?style=flat&logo=fastapi)](https://fastapi.tiangolo.com/)

---

| Component | Technology | Key Libraries |
| :--- | :--- | :--- |
| **Frontend UI** | **React** | **React Flow**, **Tailwind CSS**, **React Icons** |
| **State Management** | **Zustand** | |
| **Backend API** | **Python** | **FastAPI** |

---

## Core Features

Built using **React Flow**, a highly customizable library for creating node-based editors.

![React Flow](https://github.com/user-attachments/assets/c5409651-642e-4080-b25c-de74be31e3cd)

### Implementation Structure

The project is split into two main services:
1.  **Frontend (React/React Flow):** Manages the entire visual and interactive pipeline canvas, local state (Zustand), and user interaction.
2.  **Backend (Python/FastAPI):** Handles receiving the pipeline graph structure and performing crucial validation checks.

### 1. Schema-Driven Node Abstraction

A powerful **base Node component** is utilized to create a **Schema-Driven UI**.



**The Logic:** All custom nodes inherit from a single abstract component (`BaseNode.js`). This component reads a configuration object (the 'schema') which defines the node's appearance, input/output handles, and specific fields. This system allows for the definition of new node types (including custom styling and handlers) simply by providing a configuration object, ensuring high modularity and efficient node creation.

### 2. Two-way sync, making abstraction powerful

* I leverage the usage of side Effects during mount and updation of Nodes. Any change or initial mount quickly syncs the local and global state data coming from React flow nodes with the help of Zustand.

### 3. Seamless DAG Validation

The complete pipeline structure is submitted to the Python/FastAPI backend, which performs a **Directed Acyclic Graph (DAG) validation** to verify the integrity and correct flow of the pipeline logic. This prevents creation of infinite loops.

---

## 🎥 Project Visuals

Demo Video : https://drive.google.com/file/d/1_aPSMdW4FjIjJSXT1kgDU43ZJ-RU1nfw/view?usp=sharing
Implementation Doc : https://docs.google.com/document/d/1aoD7Mc5KhibcaJ1MVdN7_0Vq4nT2AkAw2qsMyurMEyY/edit?usp=sharing

### Pipeline Builder UI (Playground, Toolbar, and Run Pipeline Button)

[![Pipeline UI with Toolbar](https://github.com/user-attachments/assets/e0f90759-63c1-4108-95ee-7d0b3bc2ff95)](https://github.com/user-attachments/assets/e0f90759-63c1-4108-95ee-7d0b3bc2ff95)

### DAG Validation Result

[![Run Pipeline in Action](https://github.com/user-attachments/assets/0996dfcc-6b69-4283-a7cb-a5ec2501cd63)](https://github.com/user-attachments/assets/0996dfcc-6b69-4283-a7cb-a5ec2501cd63)

*The validation result from the backend is displayed inside a toast notification.*

---

## ⚙️ Setup & Installation

Ensure you have **Node.js** and **Python** installed.

# A. Frontend Setup

Navigate to the `/frontend` directory:
```
cd frontend
```

### 🔑 Frontend .env Configuration
To connect the frontend to the backend API, create a file named .env in the /frontend directory and add the following line for local development.
```
REACT_APP_BACKEND_URL="http://localhost:8000"
```

```bash
npm install
npm start
```

# B. Backend Setup

Navigate to the `/backend` directory:
```
cd ../backend
```
### 🔑 Backend .env Configuration

For local development, the backend needs to know which frontend origins are allowed to communicate with it via CORS.
Create a .env file in the /backend directory.
Add the variable that specifies the local frontend's URL:

```
FRONTEND_ORIGIN="http://localhost:3000"
```

# Install Python dependencies
```
pip install fastapi uvicorn python-dotenv
```

# Run the backend server
```
python -m uvicorn main:app --reload
```

## Related

Check out my other Projects

[Projects Section](https://github.com/IAMAmanRaj?tab=repositories)
