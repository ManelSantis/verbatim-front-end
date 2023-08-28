import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import background from "../../assets/background.svg";

export default function HomePage() {
    return (
        <main className={`w-full h-full`}>
            <div className={`w-full h-full flex bg-[#FD8367]`}>
                <div className={`w-full h-12 bg-[#6E0000] relative`}>
                    <span className={`text-white text-6xl font-jomhuria ml-4`}> Verbatim</span>
                    <button className={` absolute top-2 right-2 w-[70px] h-[32px] text-white bg-[#C9573F] font-jockey-one transition-all 
                    hover:bg-[#c75f4a] hover:h-12 hover:top-0 hover:right-0`}>
                        Sing in
                    </button>
                    <button className={` absolute top-2 right-[88px] w-[70px] h-[32px] text-white bg-[#C9573F] font-jockey-one transition-all
                     hover:bg-[#c75f4a] hover:h-12 hover:top-0 hover:right-[76px]`}>
                        Login
                    </button>
                    <button className={` absolute top-2 right-[168px] w-[70px] h-[32px] text-white bg-[#C9573F] font-jockey-one transition-all
                     hover:bg-[#c75f4a] hover:h-12 hover:top-0 hover:right-[156px]`}>
                        Sobre
                    </button>
                </div>
                
            </div>
        </main >
    )
}