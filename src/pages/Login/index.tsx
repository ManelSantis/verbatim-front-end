import { Button } from "@mui/material"
import { Input } from "antd"
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import { Link, useNavigate } from "react-router-dom"
import VerbatiLogo from "../../img/Vectorverbatim_logo.svg"
import Svg1 from "../../img/Groupdesk.svg";
import Svg2 from "../../img/8. order-completed.svg";
export function Login() {

    const navigate = useNavigate();
    function handleLogin() {
        navigate("/home")
    }

    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center ">
            <img className="absolute left-8 top-8" src={Svg1}></img>
            <img className="absolute right-8 bottom-8" src={Svg2}></img>
            <div className="w-1/4">
                <div className=" h-52 w-full flex flex-col items-center justify-center" >

                    <img src={VerbatiLogo} className="h-52 w-52 rounded-full shadow-2xl bg-slate-400">

                    </img>
                </div>
                <label htmlFor="Login" className="font-semibold text-dark-red my-2 ">Login</label>
                <Input size="large" id="Login" placeholder="user"></Input>
                <label htmlFor="Password" className="font-semibold text-dark-red my-2">Password</label>
                <Input.Password size="large" id="Password" placeholder="Password" />
                <div className="w-full mb-2 text-right text-white">
                    Not registered?
                    <Link to="/auth/register" className="font-semibold mx-1 text-light-red hover:text-really-dark-red transition ease-in-out">Sign in</Link>
                </div>
                <div className="gap-2 flex flex-col">
                    <Button className="" variant="contained" onClick={handleLogin}>Login</Button>
                    <Button className="w-full" startIcon={<GoogleIcon></GoogleIcon>} variant="outlined" >Login with Google</Button>
                    <Button className="w-full" startIcon={<FacebookIcon />} variant="outlined" color="info" >Login with Facebook</Button>
                </div>

            </div>
        </div>
    )
}