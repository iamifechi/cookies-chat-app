import React from "react";
import { Outlet } from "react-router-dom";
import { createBrowserHistory } from "history";
import Cookies from 'universal-cookie';

const Authorize = () => {
  const cookies = new Cookies();
  const user = cookies.get('user')
  if (user) {
    return <Outlet />;
  }
  createBrowserHistory().push("/");
  createBrowserHistory().go(0);
  return null;
};

export default Authorize;
