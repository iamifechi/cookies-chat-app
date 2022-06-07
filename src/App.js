import React from 'react';
import './App.css';
import socketClient  from "socket.io-client"
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import Signin from './pages/Signin'
import Chat from './pages/Chat'
import Authorize from './components/Authorize'
import Authenticate from './components/Authenticate'

function AppRoutes() {
  const routes = useRoutes([
    {element: <Authorize />,
    children: [
      { path: "/chat", element: <Chat/> },
    ]},
    {element: <Authenticate />,
      children: [
        { path: "/", element: <Signin/> },
      ]},
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
