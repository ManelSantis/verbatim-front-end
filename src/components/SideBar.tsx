import { Tooltip } from "antd";
import { BsHeadphones, BsSoundwave } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";


import User from '../img/Casimiro.jpg';
import PodCast1 from '../img/nerdcast.jfif';
import PodCast2 from '../img/podpah.jfif';
import PodCast3 from '../img/flow.png';
import Audio1 from '../img/download.jfif';
import { BiExit, BiHistory } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { Button, IconButton, Menu, MenuItem } from "@mui/material";
import { useState } from "react";

export default function SideBar() {

    const navigate = useNavigate();

    function handleExit() {
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


    return <div className="p-2 h-screen w-24 shadow-lg shadow-[#771A0F] flex flex-col items-center gap-2">
        <Tooltip title="My Account" placement='right'>

            <div className="h-[72px] w-[72px] shadow-lg p-1 bg-gray-200 hover:bg-gray-100  flex flex-col justify-center items-center text-sm rounded-md mb-2
     transition ease-in-out">
                <img className="rounded-full h-10 w-10 bg-black" src={User}></img>
                <label className='font-semibold'>
                    Me
                </label>
            </div>
        </Tooltip>
        <hr className="w-[72px]  border border-rose-200"></hr>
        <div className="w-[72px] shadow-lg p-1 pt-2 text-[#771A0F] bg-gray-200 hover:bg-gray-100  flex flex-col items-center text-sm rounded-md gap-2 
    transition ease-in-out">
            <Tooltip title="Podcasts" placement='right'>
                <div className='h-[72px] flex items-center justify-center'>
                    <BsHeadphones size="24px"></BsHeadphones>
                </div>
            </Tooltip>

            <Tooltip title="NerdCast" placement='right'>
                <img src={PodCast1} className='h-16 w-16 bg-orange-600 rounded-md'></img>

            </Tooltip>
            <Tooltip title="PodPah" placement='right'>
                <img src={PodCast2} className='h-16 w-16 bg-orange-600 rounded-md'></img>

            </Tooltip>
            <Tooltip title="Flow" placement='right'>
                <img src={PodCast3} className='h-16 w-16 bg-orange-600 rounded-md'></img>

            </Tooltip>

        </div>
        <div className="w-[72px] shadow-lg p-1 pt-2 text-[#771A0F] bg-gray-200 hover:bg-gray-100  flex flex-col items-center text-sm rounded-md gap-2
    transition ease-in-out">
            <Tooltip title="Audios" placement='right'>
                <div className='h-[72px] flex items-center justify-center'>
                    <BsSoundwave size="24px"></BsSoundwave>
                </div>

            </Tooltip>
            <Tooltip title="A7F" placement='right'>
                <img src={Audio1} className='h-16 w-16 bg-orange-600 rounded-md'></img>
            </Tooltip>
        </div>
        <div className="w-[72px] shadow-lg text-[#771A0F] bg-gray-200 hover:bg-gray-100  flex flex-col items-center text-sm rounded-md gap-2
    transition ease-in-out">
            <Tooltip title="History" placement='right'>

                <div className='h-[72px] flex items-center justify-center'>
                    <BiHistory size="24px"></BiHistory>
                </div>
            </Tooltip>
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
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                </Menu>
            </div>
        </Tooltip>
    </div>
}