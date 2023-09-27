import { BsHeadphones, BsSoundwave, BsFillPlayFill } from 'react-icons/bs';
import { BiHistory, BiExit } from 'react-icons/bi';

import User from '../../img/Casimiro.jpg';
import PodCast1 from '../../img/nerdcast.jfif';
import PodCast2 from '../../img/podpah.jfif';
import PodCast3 from '../../img/flow.png';
import Audio1 from '../../img/download.jfif';

import { useNavigate } from 'react-router-dom';

import { Box } from '../../components/Box'

import { Tooltip } from 'antd';
import SideBar from '../../components/SideBar';

export function Home() {
    const navigate = useNavigate();

    function handleExit(){
        navigate("/login")
    }

    return (
        <div className="flex flex-row">
            {/* SIDEBAR */}
            {/* <div className="p-2 h-screen w-24 shadow-lg shadow-[#771A0F] flex flex-col items-center gap-2">
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
                <Tooltip title="Exit" placement='right'>
                    <div className='absolute bottom-2 text-really-dark-red hover:bg-gray-200 w-[72px] rounded-md hover:shadow-lg transition ease-in-out' onClick={handleExit}>

                        <div className='h-[72px] flex items-center justify-center'>
                            <BiExit size="24px"></BiExit>
                        </div>
                    </div>
                </Tooltip>
            </div> */}
            <SideBar/>
            {/* CONTAINER */}
            <div className="w-full p-6 ">
                <div className="h-full w-full rounded-xl shadow-lg flex flex-col justify-center items-center gap-4">
                    <h1 className='text-4xl font-black text-zinc-700 drop-shadow-md font-poppins'>
                        NerdCast
                    </h1>
                    {/* <Box></Box> */}
                    <img src={PodCast1} className='h-80 w-80 bg-orange-500 rounded-lg shadow-md'></img>
                    <div className='flex flex-row gap-2'>
                        <div className='w-[500px] h-10 p-6 bg-gray-200 shadow-md rounded-full flex items-center'>
                            <div className='cursor-pointer'>
                                <BsFillPlayFill size="24px"></BsFillPlayFill>
                            </div>
                            <div className='w-full h-1 ml-2 bg-white'></div>
                        </div>
                        <button className='w-24 rounded-full text-white bg-[#B84831] shadow-md hover:bg-[#d85136] transition ease-in-out'>Transcribe</button>
                    </div>
                    <div className='w-[596px] h-60 overflow-y-auto cursor-default p-6 border flex flex-wrap'>
                        <Tooltip title="00:01" placement='top'>
                            <div className='rounded-full  hover:bg-blue-400 hover:text-white hover:font-semibold hover:px-1   transition ease-in-out'>
                                Lorem ipsum dolor sit amet,
                            </div>
                        </Tooltip>
                        <Tooltip title="00:10">

                            <div className='rounded-full  hover:bg-blue-400 hover:text-white hover:font-semibold hover:px-1   transition ease-in-out'>
                                consectetur adipiscing elit.
                            </div>
                        </Tooltip>
                        <Tooltip title="00:15">

                            <div className='rounded-full  hover:bg-blue-400 hover:text-white hover:font-semibold hover:px-1   transition ease-in-out'>
                                Mauris eget hendrerit
                            </div>
                        </Tooltip>
                        <Tooltip title="00:17">

                            <div className='rounded-full  hover:bg-blue-400 hover:text-white hover:font-semibold hover:px-1   transition ease-in-out'>
                                sapien.
                            </div>
                        </Tooltip>
                        <Tooltip title="00:19">

                            <div className='rounded-full  hover:bg-blue-400 hover:text-white hover:font-semibold hover:px-1   transition ease-in-out'>
                                Integer aliquet lacinia pellentesque.
                            </div>
                        </Tooltip>
                        <Tooltip title="00:22">

                            <div className='rounded-full  hover:bg-blue-400 hover:text-white hover:font-semibold hover:px-1   transition ease-in-out'>
                                Quisque risus ex, fringilla in leo vel,
                            </div>
                        </Tooltip>
                        <Tooltip title="00:28">

                            <div className='rounded-full  hover:bg-blue-400 hover:text-white hover:font-semibold hover:px-1   transition ease-in-out'>
                                semper
                            </div>
                        </Tooltip>
                        <Tooltip title="00:29">

                            <div className='rounded-full  hover:bg-blue-400 hover:text-white hover:font-semibold hover:px-1   transition ease-in-out'>
                                eleifend est.
                            </div>
                        </Tooltip>
                        <Tooltip title="00:32">

                            <div className='rounded-full  hover:bg-blue-400 hover:text-white hover:font-semibold hover:px-1   transition ease-in-out'>
                                Fusce at sagittis libero.
                            </div>
                        </Tooltip>
                        <Tooltip title="00:35">

                            <div className='rounded-full  hover:bg-blue-400 hover:text-white hover:font-semibold hover:px-1   transition ease-in-out'>
                                Nullam vestibulum, nulla sed eleifend viverra,
                            </div>
                        </Tooltip>
                        <Tooltip title="00:40">

                            <div className='rounded-full  hover:bg-blue-400 hover:text-white hover:font-semibold hover:px-1   transition ease-in-out'>
                                tellus turpis volutpat ipsum,
                            </div>
                        </Tooltip>
                        <Tooltip title="00:39">

                            <div className='rounded-full  hover:bg-blue-400 hover:text-white hover:font-semibold hover:px-1   transition ease-in-out'>
                                Sed sapien elit, cursus vel condimentum nec,
                            </div>
                        </Tooltip>
                        consectetur et libero. Duis id velit accumsan, rutrum leo et, lacinia enim. Etiam ac ipsum lobortis, tempor lorem id, gravida nisl. Nulla euismod, turpis ac laoreet maximus, nulla augue elementum odio, nec mollis turpis est in erat. Quisque in neque quis nisl tincidunt lacinia a eget erat. Donec facilisis pretium justo in pellentesque. Morbi eu porta velit. Nulla lobortis luctus pulvinar.
                    </div>
                </div>
            </div>
        </div>
    )
}