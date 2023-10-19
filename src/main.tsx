import { createTheme, ThemeProvider } from '@mui/material/styles';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import App from './App';
import { About } from './pages/About/index.tsx';
import { Audios } from './pages/Audios/index.tsx';
import { Home } from "./pages/Home";
import { Login } from './pages/Login';
import UserRegister from './pages/UserRegister/UserRegister.tsx';

const router = createBrowserRouter([
  {
    path: "/oldAPp",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/auth/register",
    element: <UserRegister/>,
  },
  {
    path: "/podcasts",
    element: <Audios/>,
  },
  {
    path: "/about",
    element: <About/>,
  }

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
  // <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  // </React.StrictMode>,
)
