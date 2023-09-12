import { Input } from "antd";
import type { DatePickerProps } from 'antd';
import { DatePicker, Space } from 'antd';
import VerbatiLogo from "../../img/Vectorverbatim_logo.svg"
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";


const UserRegister = () => {
    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString);
    };

    const navigate = useNavigate();
    function handleRegister() {
        navigate("/login")
    }
    return (

        <div className="w-screen h-screen flex flex-col items-center ">
            <div className="h-screen w-[500px] flex flex-col justify-center">
                <div className="h-24 w-full flex flex-col items-center justify-center my-3">
                    <img src={VerbatiLogo} className="h-24 w-24 rounded-full shadow-sm bg-slate-400">

                    </img>
                </div>
                <div className="h-[550px] w-full border shadow-lg rounded-md p-6">
                    <h1 className="text-2xl font-poppins font-semibold w-full text-center my-4">
                        Create a Verbatim Account

                    </h1>
                    <label htmlFor="Login" className="font-semibold text-dark-red my-2 ">Login</label>
                    <Input size="large" id="Login" placeholder="user"></Input>
                    <label htmlFor="Password" className="font-semibold text-dark-red my-2">Password</label>
                    <Input.Password size="large" id="Password" placeholder="Password" />
                    <label htmlFor="Email" className="font-semibold text-dark-red my-2">Email</label>
                    <Input size="large" id="Email" placeholder="Password" />
                    <label htmlFor="Birthday" className="font-semibold text-dark-red my-2">Birthday</label>
                    <DatePicker id="Birthday" size="large" className="w-full" onChange={onChange} />
                    {/* <div className="  bottom-0 h-8 bg-gray-200"></div> */}
                    <div className="gap-2 flex flex-col mt-8">
                        <Button className="" variant="contained" onClick={handleRegister}>Register</Button>
                        <div>
                            Are you already registered?
                            <Link to="/login" className="font-semibold mx-1 text-light-red hover:text-really-dark-red transition ease-in-out">Login here!</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default UserRegister;