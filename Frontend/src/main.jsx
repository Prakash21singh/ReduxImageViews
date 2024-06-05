import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./app/store.js";
import { Protected } from "./pages/protected/index.jsx";
import Upload from "./pages/Upload/Upload.jsx";
import Images from "./pages/Images/Images.jsx";
import Image from "./pages/Image/Image.jsx";
const router = createBrowserRouter([
  {
    element: <Protected />,
    children: [
      {
        path: "/",
        element: <App />,
        children: [
          { index: true, element: <h1>Explore the context</h1> },
          {
            path: "/images",
            element: <Images />,
          },
          {
            path: "images/:imageId",
            element: <Image />,
          },
          {
            path: "/upload",
            element: <Upload />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </PersistGate>
  </Provider>
);
