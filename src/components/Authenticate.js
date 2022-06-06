import React from "react";
import { Outlet } from "react-router-dom";
import { createBrowserHistory } from "history";
import Cookies from 'universal-cookie';

const Authenticate = () => {
  const cookies = new Cookies();
  const user = cookies.get('user')
  if (user) {
    createBrowserHistory().push("/chat");
    createBrowserHistory().go(0);
    return null;
  }

  return <Outlet />;
};

export default Authenticate;
