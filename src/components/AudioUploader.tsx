import { LinearProgress, Tooltip } from '@mui/material';
import { Button } from 'antd';
import toWav from 'audiobuffer-to-wav';
import Cookies from 'js-cookie';
import jsPDF from 'jspdf';
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import '../styles/modal.css';
import Logo from "../img/Logo.jpg"
type TranscribeResp = {
    message: string
};
interface AudioSlice {
    "audio": AudioBuffer,
    "time": number
}
export default function AudioUploader() {
    let audioRef = React.createRef();

    const [audioSegments, setAudioSegments] = useState<AudioBuffer[]>([]);
    const [audioSegments2, setAudioSegments2] = useState<AudioSlice[]>([]);
    const [segmentTimes, setSegmentTimes] = useState<Number[]>([])
    const [token, setToken] = useState("");
    const [transcriptions, setTranscriptions] = useState<String[]>([]);
    const [isTranscribing, setIstranscribing] = useState(false)
    const [actualSegmentTranscribing, setActualSegmentTranscribing] = useState(0);
    useEffect(() => {
        const t: string = Cookies.get('access_token')!
        setToken(t)
        console.log(token)
    }, [])

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [text, setText] = useState('');

    const openModal = () => {
        setIsModalOpen(true);
        setText(transcriptions.join(' '));
    }

    const closeModal = () => {
        setIsModalOpen(false);
        setText('');
    }

    const handlePDF = () => {
        const x = 10; // Posição horizontal
        let y = 20; // Posição vertical inicial
        const maxY = 280;
        const doc = new jsPDF();
        doc.setFont("times");
        doc.setFontSize(14);

        const joinedString = (text == '') ? transcriptions.join(' ') : text;

        const larguraDisponivel = 190; // Largura disponível em milímetros

        const linhas = doc.splitTextToSize(joinedString, larguraDisponivel);
        linhas.forEach((linha) => {
            //doc.addImage('/Logo.jpg', 'JPEG', 10, 10, 50, 50);
            doc.text(linha, x, y);
            y += 8; // Ajuste conforme necessário para espaçamento entre as linhas
            if (y > maxY) {
                doc.addPage();
                y = 20;
            }
        });

        doc.save('texto.pdf');
    };


    const handleTranscribe = async () => {
        setTranscriptions([]);
        setText('');
        setIstranscribing(true);

        // for (const buffer of audioSegments2) {
        for (const [index, buffer] of audioSegments2.entries()) {
            setActualSegmentTranscribing(index);
            const wav = toWav(buffer.audio);

            const blob = new Blob([wav], { type: "audio/wav" });

            const formData = new FormData();
            formData.append('file', blob);

            const { data } = await api.post<TranscribeResp>(
                'http://localhost:8000/transcribe/',
                formData,
                {
                    headers: {
                        'Authorization': `Bearer  ${token}`
                    }
                }

            );
            setTranscriptions(() => {
                const t = transcriptions
                t.push(data.message)
                return t
            })
            console.log(data.message);
        }
        setIstranscribing(false)
    }

    const handleAudioInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setSegmentTimes([]);
        setAudioSegments([]);
        setAudioSegments2([]);
        setText('');
        setTranscriptions([]);

        const file = e.target.files?.[0];
        const audioElement = audioRef.current;

        if (file) {

            audioElement.src = URL.createObjectURL(file);
            audioElement.load(); // Recarrega o elemento para carregar o novo arquivo
            audioElement.play();


            const audioContext = new AudioContext();

            // Lê o arquivo de entrada como um ArrayBuffer
            const arrayBuffer = await readFileAsArrayBuffer(file);

            // Decodifica o ArrayBuffer para um AudioBuffer
            const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

            // Divide o áudio em segmentos com base em pausas
            const sampleRate = audioBuffer.sampleRate;
            const audioData = audioBuffer.getChannelData(0);
            const segments: AudioBuffer[] = [];
            const segments2: AudioSlice[] = []
            let segmentStart = 0;
            let silenceStartTime = 0;

            // Define um limiar de volume para considerar como "silêncio"
            const silenceThreshold = 0.1; // Ajuste conforme necessário

            // Define o período de tempo para considerar como uma pausa
            const silenceDurationThreshold = 0.35; // Em segundos, ajuste conforme necessário

            for (let i = 0; i < audioData.length; i++) {
                if (Math.abs(audioData[i]) < silenceThreshold) {
                    if (silenceStartTime === 0) {
                        // Início da pausa
                        silenceStartTime = audioContext.currentTime + i / sampleRate;
                    }
                } else {
                    if (silenceStartTime > 0) {
                        //console.log(silenceStartTime)
                        //console.log(segmentStart)
                        // Fim da pausa
                        const silenceDuration = audioContext.currentTime + i / sampleRate - silenceStartTime;
                        if (silenceDuration >= silenceDurationThreshold) {
                            // Crie um segmento se a pausa for maior ou igual ao limiar de tempo
                            const segmentLength = i - segmentStart;
                            if (segmentLength > 0) {
                                const segment = audioContext.createBuffer(1, segmentLength, sampleRate);
                                const segmentData = audioData.slice(segmentStart, i);
                                segment.getChannelData(0).set(segmentData);
                                segments.push(segment);
                                let s = {
                                    audio: segment,
                                    time: silenceStartTime,
                                }
                                segments2.push(s);


                            }
                            segmentStart = i + 1; // Comece o próximo segmento após a pausa
                        }
                        setSegmentTimes(() => {
                            const t = segmentTimes;
                            t.push(segmentStart)
                            return t
                        })

                        silenceStartTime = 0;
                    }
                }
            }

            if (segments.length === 0) {
                // Se não houver pausas detectadas, divida o áudio em um único segmento
                segments.push(audioBuffer);
            }

            // Configure os segmentos no estado ou faça algo com eles
            console.log('Número de segmentos:', segments.length);
            setAudioSegments(segments)
            setAudioSegments2(segments2)
        }

    };

    const readFileAsArrayBuffer = (file: File): Promise<ArrayBuffer> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target && e.target.result instanceof ArrayBuffer) {
                    resolve(e.target.result);
                } else {
                    reject(new Error('Erro ao ler arquivo como ArrayBuffer'));
                }
            };
            reader.onerror = (e) => {
                reject(new Error('Erro ao ler arquivo'));
            };
            reader.readAsArrayBuffer(file);
        });
    };
    const TranscribeProgress = () => {
        return <div>

            <div className='w-96'>
                Transcribing {actualSegmentTranscribing} out of {audioSegments2.length}
                <LinearProgress variant='determinate' value={(actualSegmentTranscribing / audioSegments2.length) * 100} />
            </div>
        </div>
    }
    return (
        <>
                    <div>
                        <div className="text-center pt-1 mb-4 rounded-full w-[175px] h-[30px] bg-[#8d3726] cursor-pointer">
                            <input id="audioInput" type="file" accept="audio/*" onChange={handleAudioInputChange} />
                            <label htmlFor="audioInput" className=" text-white cursor-pointer"> Add new podcast </label>
                        </div>
                    </div>

                    <audio className="mb-1" ref={audioRef} controls id="audioPlayer"></audio>

                    <div className='flex flex-row gap-2 pt-4'>
                        <button onClick={handleTranscribe} className='w-[150px] h-10 rounded-full text-white bg-[#B84831] shadow-md hover:bg-[#d85136] transition ease-in-out'>Transcribe</button>
                    </div>

                    {isTranscribing ?
                        <TranscribeProgress /> : <p></p>}
                    {
                        (transcriptions.length > 0) &&
                        <>
                            <div className='mt-4 min-h-[200px] min-w-[596px] w-[350px] h-[90px] overflow-y-auto cursor-default p-6 border flex flex-wrap'>
                                {transcriptions.map((t, index) => {
                                    const audioSe = audioSegments2[index]; // Acessa o objeto original com base no índice
                                    return (
                                        <Tooltip key={index} title={formatSecondsToMinutesAndSeconds(audioSe.time)} placement='top'>
                                            <div className='rounded-2xl mx-1 h-auto hover:bg-blue-400 hover:text-white hover:font-semibold hover:px-1 transition ease-in-out'>
                                                {" " + t}

                                                {/* <div>
                                        Tempo: {audioSe.time.toString()}
                                    </div> */}
                                            </div>
                                        </Tooltip>
                                    );
                                })}
                            </div>
                            {(actualSegmentTranscribing == audioSegments.length - 1) &&
                                <div className='flex flex-row gap-2 pt-4'>

                                    <button onClick={openModal} className='w-[150px] h-10 mb-4 rounded-full text-white bg-[#B84831] shadow-md hover:bg-[#d85136] transition ease-in-out'>Editar Texto</button>
                                    <button onClick={handlePDF} className='w-[150px] h-10 mb-4 rounded-full text-white bg-[#B84831] shadow-md hover:bg-[#d85136] transition ease-in-out'>Gerar PDF</button>

                                </div>
                            }
                        </>
                    }
                    {isModalOpen && (
                        <>
                            <div className="overlay"></div>
                            <div className="modal">
                                <div className="flex">
                                    <Button className="botao-close" onClick={closeModal}>Fechar</Button>
                                    <textarea
                                        rows="10"
                                        cols="100"
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}
                                    ></textarea><br />

                                    <button className='w-[150px] h-10 mb-4 rounded-full text-white bg-[#B84831] shadow-md hover:bg-[#d85136] transition ease-in-out' onClick={handlePDF}>Gerar PDF</button>
                                </div>
                            </div>
                        </>
                    )}
        </>
    )
    function formatSecondsToMinutesAndSeconds(totalSeconds: number) {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        const formattedTime = `${minutes}m:${seconds.toFixed(0).toString().padStart(2, '0')}s`;

        return formattedTime;
    }
}