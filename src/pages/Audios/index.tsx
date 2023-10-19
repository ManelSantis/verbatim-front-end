
import Cookies from 'js-cookie';

import { FirebaseStorage } from "firebase/storage";
import { useNavigate } from 'react-router-dom';

import { ChangeEvent, useEffect, useState } from 'react';
import AudioUploader from '../../components/AudioUploader';
import SideBar from '../../components/SideBar';
import { uploadData } from '../../utils/firebase';


interface User {

    "user_name": string,
    "email": string,
    "roles": Array<String>
    "tokens": {
        "refresh": string,
        "access": string
    }
}

export function Audios() {
    const navigate = useNavigate();
    const [actiiveUser, setActiveUser] = useState<User|null|undefined>(null);
    useEffect(() => {
        const u: User = JSON.parse(Cookies.get('user')!)
        console.log(u)
        if (u == null) {
            navigate("/login")
        } else {
            setActiveUser(u)
        }
        // setActiveUer(u);
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
        <div className="flex flex-row h-screen">
            {/* SIDEBAR */}
            {/* <SideBar user_name="Teste" email="teste" /> */}
            <SideBar user_name={actiiveUser!?.user_name} email={actiiveUser!?.email} />
            {/* CONTAINER */}
            <div className="w-full p-6 h-s overflow-y-auto">
                <div className="h-full w-full rounded-xl shadow-lg flex flex-col justify-center items-center gap-4 bg-white">
                    <div className="pt-2 flex flex-col items-center justify-center">
                        <AudioUploader/>
                    </div>
                </div>
            </div>
        </div>
    )
}

function sRef(storage: FirebaseStorage, arg1: string) {
    throw new Error('Function not implemented.');
}
