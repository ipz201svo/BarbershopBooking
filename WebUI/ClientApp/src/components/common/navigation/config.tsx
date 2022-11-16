import React from "react";
import {RouteObject} from "react-router-dom";
import Barbershop from "../../barbershop";
import BarbershopList from "../../barbershopList";
import Bookings from "../../bookings";
import Home from "../../home";
import Landing from "../../landing";
import Layout from "../../layout";
import SignIn from "../../signIn";
import {CustomerSignUp, BarbershopSignUp} from "../../signUp";
import {NotFound} from "../../system/pages";
import {routes} from "./constants";

const config: RouteObject[] = [
  {
    path: routes.barbershop.prefix,
    children: [
      {
        path: routes.barbershop.signUp,
        element: <BarbershopSignUp />,
      },
    ]
  },
  {
    path: routes.signUp,
    element: <CustomerSignUp />,
  },
  {
    path: routes.signIn,
    element: <SignIn />,
  },
  {
    path: routes.landing,
    element: <Landing />,
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'bookings',
        element: <Bookings />,
      },
      {
        path: 'barbershops',
        element: <BarbershopList />,
      },
      {
        path: 'barbershops/:id',
        element: <Barbershop />,
      }
    ]
  },
  {
    path: '*',
    element: <NotFound />,
  }
];

export default config;