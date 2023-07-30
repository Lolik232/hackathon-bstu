import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Test from "./Test/Test";
import reportWebVitals from './reportWebVitals';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import {QuestionBoxEditor} from "./QuestionBoxEditor/QuestionBoxEditor";

import Login from "./Login/Login";
const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>
    },
    {
        path: "/test",
        element: <Test/>
    },
    {
        path: "/question-editor",
        element: <QuestionBoxEditor/>
    },
    {
        path: "/login",
        element: <Login/>
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
