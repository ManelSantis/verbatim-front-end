
import Cookies from 'js-cookie';

import { FirebaseStorage } from "firebase/storage";
import { useNavigate } from 'react-router-dom';

import { ChangeEvent, useEffect, useState } from 'react';
import SideBar from '../../components/SideBar';
import VerbatimLogo from "../../img/LogoVerbatim.svg";
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

export function About() {
    const navigate = useNavigate();
    const [actiiveUser, setActiveUser] = useState<User | null | undefined>(null);
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
                <div className="h-full w-full rounded-xl shadow-lg flex flex-row justify-center items-center gap-4 bg-white">
                    <div className="w-[50%] h-full flex flex-row justify-center items-center">
                        <img src={VerbatimLogo} className="h-[450px] w-[450px] pb-2 "></img>
                    </div>
                    <div className="w-[50%] h-full justify-center items-center pt-[100px] pr-[150px]">
                        <div className="">
                            <h1 className='mb-2 '> <p><span className='font-bold text-3xl text-red-700'>Verbatim </span> </p>
                            <p> <span className='font-bold text-lg text-red-600'>Transformando Áudio em Texto</span></p></h1>

                            <p className='mb-2 font-bold text-lg'>Transcrever áudios com precisão e facilidade</p>

                            <p className='mb-2'>O Verbatim é um aplicativo inovador projetado para simplificar o processo de transcrição de áudios.
                                Com a crescente demanda por transcrições precisas em uma variedade de campos, desde jornalismo até
                                pesquisa acadêmica, o Verbatim oferece uma solução eficaz e eficiente.</p>

                            <p className='mb-2 font-bold text-lg' >Quem Pode Se Beneficiar do Verbatim</p>

                            <p className='mb-2'>O Verbatim atende a uma ampla gama de usuários, desde jornalistas que precisam transcrever entrevistas
                                e gravações, até pesquisadores que desejam transformar gravações em texto para análise. Além disso,
                                empresas que realizam reuniões e conferências podem aproveitar a funcionalidade do Verbatim para
                                documentar essas interações de maneira rápida e precisa. Com o Verbatim, a transcrição de áudio se torna uma tarefa simplificada, economizando tempo e esforço,
                                além de garantir a precisão necessária em diversas situações.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function sRef(storage: FirebaseStorage, arg1: string) {
    throw new Error('Function not implemented.');
}
