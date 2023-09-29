import { BsFillPlayFill } from 'react-icons/bs';

import Cookies from 'js-cookie'
import PodCast1 from '../../img/nerdcast.jfif';

import { useNavigate } from 'react-router-dom';
import { FirebaseStorage, getDownloadURL, getStorage, uploadBytes, uploadBytesResumable } from "firebase/storage";

import app, { uploadData } from '../../utils/firebase'
import { Tooltip } from 'antd';
import SideBar from '../../components/SideBar';
import { ChangeEvent, useEffect, useState } from 'react';
import { Button } from '@mui/material';

export function Home() {
    const navigate = useNavigate();

    useEffect(() => {
        const u = Cookies.get('user')
        if (u == null) {
            navigate("/login")
        }
    }, [])

    function handleExit() {
        navigate("/login")
    }
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [fileUrl, setFileUrl] = useState<string | undefined>("");
    const [disabled, setDisabled] = useState(false)
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setSelectedFile(file || null);
    };

    // const handleUpload = () => {
    //     if (selectedFile) {
    //         // Faça algo com o arquivo, como enviá-lo para o servidor
    //         console.log('Arquivo selecionado:', selectedFile.name);
    //     }
    // };
    const handleUpload = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        setDisabled(true);

        if (selectedFile) {

            const res = await uploadData(

                selectedFile,
                selectedFile.name
            );

            if (res && selectedFile) {
                setDisabled(false);
                setSelectedFile(null);

                // Clear the file upload value.
                //selectedFile.value = '';
            }
            setFileUrl(res);
        }
    }
    return (
        <div className="flex flex-row ">
            {/* SIDEBAR */}
            <SideBar />
            {/* CONTAINER */}
            <div className="w-full p-6 ">
                <div className="h-full w-full rounded-xl shadow-lg flex flex-col justify-center items-center gap-4 bg-white">
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
                    <input type="file" accept="audio/*" onChange={handleFileChange} />
                    <Button disabled={disabled} onClick={handleUpload}>Upload</Button>
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

function sRef(storage: FirebaseStorage, arg1: string) {
    throw new Error('Function not implemented.');
}
