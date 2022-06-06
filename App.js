import React from 'react';
import './App.css';
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import Signin from './components/Signin'
import Chat from './components/Chat'

function AppRoutes() {
  const routes = useRoutes([
    { path: "/", element: <Signin /> },
    { path: "/chat", element: <Chat /> },
    ]);
  return routes;
}


function App() {
  return (
    <>
      <Router>
        <AppRoutes />
      </Router>

    </>
  );
}

export default App;
