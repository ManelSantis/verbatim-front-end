import { Alert, Button, Snackbar, ThemeProvider, createTheme } from "@mui/material";
import { Input } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import VerbatimLogo from "../../img/LogoVerbatim.svg";
import api from "../../services/api";


const UserRegister = () => {
    // const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    //     console.log(date, dateString);
    // };
    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [isError, setIsError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("");
    const [open, setOpen] = useState(false)

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

    const navigate = useNavigate();
    function handleRegister() {
        navigate("/login")
    }

    const handleOpenSnack = () => {
        setOpen(false)

    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (password === "" || login === "" ||password != confirmPassword) {
            //setShowAlert(true)
        } else {
            //await signInRequest({login,password})
            var bodyFormData = new FormData();
            bodyFormData.append('email', email);
            bodyFormData.append('password', password);
            bodyFormData.append('user_name', login);

            api.post('/signup/',
                // {
                //     email: login,
                //     password: password
                // })
                bodyFormData
            )
                .then(function (response) {
                    console.log(response);
                    navigate("/login")
                    // handleLogin
                })
                .catch(function (error) {
                    console.error(error);
                    setOpen(true);
                    setIsError(true);
                    setErrorMessage(error.response.data.message);
                });
        }
    };
    return (

        <div className="w-screen h-screen flex flex-col items-center ">
            <div className="h-screen w-[500px] flex flex-col justify-center">
                <div className="h-48 w-full flex flex-col items-center justify-center my-3">
                    <img src={VerbatimLogo} className="h-44 w-44">

                    </img>
                </div>
                <div className="h-[472px] w-full border shadow-lg rounded-md p-6">
                    <h1 className="text-2xl font-poppins font-semibold  text-dark-red w-full text-center my-4">
                        Create a Verbatim Account

                    </h1>
                    <form onSubmit={handleSubmit}>

                        <label htmlFor="UserName" className="font-semibold text-dark-red my-2 ">Username</label>
                        <Input size="large" id="Login" placeholder="username" onChange={(e) => setLogin(e.target.value)}></Input>
                        <label htmlFor="Email" className="font-semibold text-dark-red my-2">Email</label>
                        <Input size="large" id="Email" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
                        <label htmlFor="Password" className="font-semibold text-dark-red my-2">Password</label>
                        <Input.Password size="large" id="Password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
                        <label htmlFor="CPassword" className="font-semibold text-dark-red my-2">Confirm Password</label>
                        <Input.Password size="large" id="CPassword" placeholder="password" onChange={(e) => setConfirmPassword(e.target.value)} />
                        {/* <label htmlFor="Birthday" className="font-semibold text-dark-red my-2">Birthday</label> */}
                        {/* <DatePicker id="Birthday" size="large" className="w-full" onChange={onChange} /> */}
                        {/* <div className="  bottom-0 h-8 bg-gray-200"></div> */}
                        <div className="gap-2 flex flex-col mt-8">
                            <Button type="submit" className="" variant="contained">Register</Button>
                            <div className="w-full mb-2 text-right text-dark-red">
                                Are you already registered?
                                <Link to="/login" className="font-semibold mx-1 text-light-red hover:text-really-dark-red transition ease-in-out">Login here!</Link>
                            </div>
                        </div>
                    </form>
                </div>
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
export default UserRegister;