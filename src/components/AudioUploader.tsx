import { useEffect, useRef, useState } from 'react'
import AudioPlayer from './AudioPlayer';
import Cookies from 'js-cookie'
import toWav from 'audiobuffer-to-wav';
import api from '../services/api';
import { Tooltip } from '@mui/material';
import { Button } from 'antd';
type TranscribeResp = {
    message: string
};

export default function AudioUploader() {

    const [audioSegments, setAudioSegments] = useState<AudioBuffer[]>([]);
    const [segmentTimes,setSegmentTimes] = useState<Number[]>([])
    const [token, setToken] = useState("");
    const [transcriptions, setTranscriptions] = useState<String[]>([]);
    const [isTranscribing, setIstranscribing] = useState(false)
    useEffect(() => {
        const t: string = Cookies.get('access_token')!
        setToken(t)
        console.log(token)
    }, [])

    const handleTranscribe = async () => {
        for (const buffer of audioSegments) {
            setIstranscribing(true)
            const wav = toWav(buffer);

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
        const file = e.target.files?.[0];

        if (file) {
            const audioContext = new AudioContext();

            // Lê o arquivo de entrada como um ArrayBuffer
            const arrayBuffer = await readFileAsArrayBuffer(file);

            // Decodifica o ArrayBuffer para um AudioBuffer
            const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

            // Divide o áudio em segmentos com base em pausas
            const sampleRate = audioBuffer.sampleRate;
            const audioData = audioBuffer.getChannelData(0);
            const segments: AudioBuffer[] = [];
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
                            }
                            segmentStart = i + 1; // Comece o próximo segmento após a pausa
                        }
                        setSegmentTimes(()=>{
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

    return (
        <>
            <div>
                <input type="file" accept="audio/*" onChange={handleAudioInputChange} />
                {/* <ul>
          {audioSegments.map((segment, index) => (
            <li key={index}>
              Segmento de Áudio {index + 1}: amostras
            </li>
          ))}
        </ul> */}
            </div>
            <AudioPlayer audioSegments={audioSegments} />
            <Button onClick={handleTranscribe}>Transcrever</Button>
            {isTranscribing ? <p> Transcribing</p> : <p></p>}
            {
                !isTranscribing && transcriptions.length > 0 &&
                <div className='min-h-[200px] w-[596px] h-60 overflow-y-auto cursor-default p-6 border flex flex-wrap'>
                    {
                        transcriptions.map((t, index) => {
                            return (
                                <Tooltip key={index} title={segmentTimes?[index]: ""} placement='top'>
                                    <div className='rounded-2xl  hover:bg-blue-400 hover:text-white hover:font-semibold hover:px-1   transition ease-in-out'>
                                        {t}
                                    </div>
                                </Tooltip>

                            )
                        })
                    }
                </div>
            }
        </>
    )

}