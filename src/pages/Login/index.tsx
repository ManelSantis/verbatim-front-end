import { Button } from "@mui/material"
import { Input } from "antd"
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import { Link, useNavigate } from "react-router-dom"
import VerbatiLogo from "../../img/Vectorverbatim_logo.svg"
import Svg1 from "../../img/Groupdesk.svg";
import Svg2 from "../../img/8. order-completed.svg";
import { useState } from "react";
import api from "../../services/api";
import Cookies from 'js-cookie'
export function Login() {


    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const navigate = useNavigate();
    function handleLogin() {
        navigate("/home")
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (password === "" || login === "") {
            //setShowAlert(true)
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
                    Cookies.set('user', response.data)
                    navigate("/home")
                })
                .catch(function (error) {
                    console.error(error);
                });
        }
    };
    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center ">
            <img className="absolute left-8 top-8" src={Svg1}></img>
            <img className="absolute right-8 bottom-8" src={Svg2}></img>
            <div className="w-1/4">
                <form onSubmit={handleSubmit}>

                    <div className=" h-52 w-full flex flex-col items-center justify-center" >

                        <img src={VerbatiLogo} className="h-52 w-52 rounded-full shadow-2xl bg-slate-400">

                        </img>
                    </div>
                    <label htmlFor="Login" className="font-semibold text-dark-red my-2 ">Email</label>
                    <Input size="large" id="Login" placeholder="user" onChange={(e) => setLogin(e.target.value)}></Input>
                    <label htmlFor="Password" className="font-semibold text-dark-red my-2">Password</label>
                    <Input.Password size="large" id="Password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
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
        </div>
    )
}