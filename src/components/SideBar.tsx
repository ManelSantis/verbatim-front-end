import { Tooltip } from "antd";
import Cookies from 'js-cookie';
import { BsHeadphones, BsHouse, BsQuestionCircle } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";

import { Button, IconButton, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { BiExit } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import User from '../img/Casimiro.jpg';


interface User {
    email: string,
    user_name: string
}

export default function SideBar(props: User) {

    // const [user, setUser] = useState<User>()


    // useEffect(() => {
    //     const u = Cookies.get('user')
    //     if (u == null) {
    //         navigate("/login")
    //         setUser(u);
    //     }
    // }, [])
    const navigate = useNavigate();

    function handleExit() {
        Cookies.remove('user')
        navigate("/login")
    }

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <div className="p-2 h-screen w-24 shadow-lg shadow-[#771A0F] flex flex-col items-center gap-2 bg-white">
            <Tooltip title="My Account" placement='right'>

                <div className="h-[72px] w-[72px] shadow-lg p-1 bg-gray-200 hover:bg-gray-100  flex flex-col justify-center items-center text-sm rounded-md mb-2
     transition ease-in-out">
                    <div className='w-10 h-10 bg-white rounded-full shadow-inner flex items-center justify-center'>
                        <label className='font-bold text-sm text-dark-red'>
                            {/*props.user_name.split(' ')[0].charAt(0)}
                        {props.user_name.split(' ')[0]?.charAt(1)*/}
                        </label>
                    </div>
                    <label className='font-semibold'>
                        {props.user_name}
                    </label>
                </div>
            </Tooltip>
            <hr className="w-[72px]  border border-rose-200"></hr>
            <div className="cursor-pointer w-[72px] shadow-lg p-1 pt-2 text-[#771A0F] bg-gray-200 hover:bg-gray-100  flex flex-col items-center text-sm rounded-md gap-2
    transition ease-in-out">
                <Link to="/home">
                    <Button title="Home" className='cursor-pointer h-[72px] flex items-center justify-center'>
                        <BsHouse size="24px"></BsHouse>
                    </Button>
                </Link>
            </div>

            <div className="cursor-pointer w-[72px] shadow-lg p-1 pt-2 text-[#771A0F] bg-gray-200 hover:bg-gray-100  flex flex-col items-center text-sm rounded-md gap-2 
    transition ease-in-out">
                <Link to="/podcasts"><Button className='h-[72px] flex items-center justify-center' title="Podcasts">
                    <BsHeadphones size="24px"></BsHeadphones>
                </Button></Link>
            </div>

            <div className="cursor-pointer w-[72px] shadow-lg p-1 pt-2 text-[#771A0F] bg-gray-200 hover:bg-gray-100  flex flex-col items-center text-sm rounded-md gap-2
    transition ease-in-out">
                <Link to="/about"><Button title="About" className='cursor-pointer h-[72px] flex items-center justify-center'>
                    <BsQuestionCircle size="24px"></BsQuestionCircle>   
                </Button>
                </Link>
            </div>

            <div className="w-[72px] shadow-lg text-[#771A0F] bg-gray-200 hover:bg-gray-100  flex flex-col items-center text-sm rounded-md gap-2
    transition ease-in-out">
            </div>
            <Tooltip title="Menu" placement='right'>
                {/* <div className='absolute bottom-2 text-really-dark-red hover:bg-gray-200 w-[72px] rounded-md hover:shadow-lg transition ease-in-out' onClick={handleExit}>

                <div className='h-[72px] flex items-center justify-center'>
                    <BiExit size="24px"></BiExit>
                </div>
            </div> */}
                <div className='absolute bottom-4 text-really-dark-red'>
                    <IconButton
                        id="demo-positioned-button"
                        className='flex items-center justify-center'
                        aria-controls={open ? 'demo-positioned-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <GiHamburgerMenu />
                    </IconButton>
                    <Menu
                        id="demo-positioned-menu"
                        aria-labelledby="demo-positioned-button"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                    >
                        <MenuItem onClick={handleClose}>My Verbs</MenuItem>
                        {/* <MenuItem onClick={handleClose}>My accoun</MenuItem> */}
                        <MenuItem onClick={handleExit}>
                            <BiExit className=" w-10 font-bold" />
                            Logout
                        </MenuItem>
                    </Menu>
                </div>
            </Tooltip>
        </div>
    )
}