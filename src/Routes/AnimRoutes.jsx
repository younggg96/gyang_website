import React from "react";
// import pages
import Home from "../pages/HomePage";
import Auth from "../pages/AuthPage";
import Profile from "../pages/ProfilePage";
import ArticlePage from "../pages/ArticlePage";
import ErrorPage from "../pages/ErrorPage";

// import routes route & useLocation hook
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import NewArticlePage from "../pages/NewArticlePage";
import useAuth from "../hooks/useAuth";

const routes = [
  {
    path: "/",
    element: Home,
  },
  {
    path: "/auth",
    element: Auth,
  },
  {
    path: "/profile/:id",
    element: Profile,
  },
  {
    path: "/profile/my-profile",
    element: Profile,
    private: true,
    props: {
      self: true,
    },
  },
  {
    path: "/article/:id",
    element: ArticlePage,
  },
  {
    path: "/article/new",
    element: NewArticlePage,
  },
  {
    path: "*",
    element: ErrorPage,
  },
];

const AnimRoutes = () => {
  const location = useLocation();
  const { state } = useAuth();
  return (
    <AnimatePresence initial={true}>
      <Routes key={location.pathname} location={location}>
        {routes.map((route, index) => {
          const {
            path,
            element: Element,
            private: isPrivate,
            props,
            ...rest
          } = route;
          if (isPrivate) {
            return state.isAuth ? (
              <Route
                key={index}
                path={path}
                element={<Element {...props} />}
                {...rest}
              />
            ) : (
              <Route key={index} path="*" element={<ErrorPage />} />
            );
          } else {
            return (
              <Route
                key={index}
                path={path}
                element={<Element {...props} />}
                {...rest}
              />
            );
          }
        })}
      </Routes>
    </AnimatePresence>
  );
};

export default AnimRoutes;
