/* eslint-disable react/react-in-jsx-scope */
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom"
import Layout from "../pages/Layout"
import Register from "../pages/Register"
import Login from "../pages/Login"
import Home from '../pages/Home'
import PageNotFound from "../pages/PageNotFound"
import ProtectedRoute from "../components/auth/ProtectedRoute"
import Todos from "../pages/Todos"

const storageKey = "loggedInUser";
const userDataString = localStorage.getItem(storageKey);
const userData = userDataString ? JSON.parse(userDataString) :null;

const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />} errorElement={<PageNotFound/>} >
        <Route
          index
          element={
            <ProtectedRoute
              isAllowed={userData?.token}
              redirectionPath="/Login"
              data={userData}
            >
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="todos"
          element={
            <ProtectedRoute
              isAllowed={userData?.token}
              redirectionPath="/Login"
              data={userData}
            >
              <Todos/>
            </ProtectedRoute>
          }
        />
        <Route path="Register" element={<Register />} />
        <Route path="Login" element={<Login />} />
      </Route>
    </>
  )
);
export default routes
