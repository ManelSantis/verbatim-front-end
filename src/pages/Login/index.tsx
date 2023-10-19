import { Alert, Button, IconButton, InputAdornment, OutlinedInput, Snackbar, TextField, ThemeProvider, createTheme } from "@mui/material";
// import { Input } from "antd"
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Cookies from 'js-cookie';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SVG2 from "../../img/8. order-completed.svg";
import SVG1 from "../../img/Groupdesk.svg";
import VerbatimLogo from "../../img/LogoVerbatim.svg";

import api from "../../services/api";
export function Login() {

    const theme = createTheme({
        palette: {

            error: {
                main: "#f44336",
                light: "#e57373",
                dark: '#d32f2f',
                contrastText: '#fff',
            },
        },
    });

    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isError, setIsError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("");
    const [open, setOpen] = useState(false)
    const navigate = useNavigate();
    function handleLogin() {
        navigate("/home")
    }
    const handleOpenSnack = () => {
        setOpen(false)

    }

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        setErrorMessage("")
        event.preventDefault();
        if (password === "" || login === "") {
            //setShowAlert(true)
            setOpen(true)
            setIsError(true)
            //setErrorMessage(error.data.message)
        } else {
            // await signInRequest({login,password})
            var bodyFormData = new FormData();
            bodyFormData.append('email', login);
            bodyFormData.append('password', password);

            api.post('/login/',
                // {
                //     email: login,
                //     password: password
                // })
                bodyFormData
            )
                .then(function (response) {
                    console.log(response);

                    Cookies.set('user', JSON.stringify(response.data))
                    Cookies.set('access_token', response.data.tokens.access)
                    Cookies.set('refreh_token', response.data.tokens.refresh)
                    navigate("/home")
                })
                .catch(function (error) {
                    console.error(error);
                    setOpen(true)
                    setIsError(true)
                    setErrorMessage(error.response.data.message)
                    setLogin("")
                    setPassword("")
                });
        }
    };
    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center ">
            <div className="md:flex flex sm:hidden">
                <img className="absolute left-4 top-4 lg:max-w-8xl" src={SVG1}></img>
            </div>
            <div className="md:flex flex sm:hidden">
            <img className="absolute right-4 bottom-4 lg:max-w-8xl" src={SVG2}></img>
            </div>
            <div className="w-[400px]">
                <form onSubmit={handleSubmit}>

                    <div className="h-52 w-full flex flex-col items-center justify-center" >

                        <img src={VerbatimLogo} className="h-100 w-100 pb-24">

                        </img>
                    </div>
                    <label htmlFor="Login" className="font-semibold text-dark-red my-2">Email</label>
                    <TextField
                        variant="outlined"
                        error={isError}
                        id="Login"
                        className="w-full" placeholder="email" onChange={(e) => setLogin(e.target.value)}
                    ></TextField>
                    <label htmlFor="Password" className="font-semibold text-dark-red my-2">Password</label>
                    {/* <TextField  id="Password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} /> */}
                    {/* <InputLabel  htmlFor="Password">Password</InputLabel> */}
                    <OutlinedInput
                        error={isError}
                        className="w-full"
                        id="Password"
                        placeholder="password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }

                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="w-full mb-2 text-right text-white">
                        Not registered?
                        <Link to="/auth/register" className="font-semibold mx-1 text-light-red hover:text-really-dark-red transition ease-in-out">Sign in</Link>
                    </div>
                    <div className="gap-2 flex flex-col">
                        <Button type="submit" className="" variant="contained">Login</Button>
                        {/* <Button className="w-full" startIcon={<GoogleIcon></GoogleIcon>} variant="outlined" >Login with Google</Button> */}
                        {/* <Button className="w-full" startIcon={<FacebookIcon />} variant="outlined" color="info" >Login with Facebook</Button> */}
                    </div>
                </form>

            </div>
            <ThemeProvider theme={theme}>

                <Snackbar className="w-full"
                    // anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    open={open}
                    onClose={handleOpenSnack}
                    message="I love snacks"

                >
                    <Alert severity="error">{errorMessage}</Alert>
                </Snackbar>
            </ThemeProvider>
        </div>
    )
}