import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import App from './App';
import { Home } from "./pages/Home"
import { Login } from './pages/Login'
import { createTheme, ThemeProvider } from '@mui/material/styles';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
  },

]);
const theme = createTheme({
  palette: {
    primary: {
      main: '#d32110',
      light: '#f52c15',
      dark: '#900b05',
      contrastText: '#f1f1f1',
    }

  },
});
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
)
