import { BsHeadphones, BsSoundwave, BsFillPlayFill } from 'react-icons/bs';
import { BiHistory } from 'react-icons/bi';
export function Home() {
    return (
        <div className="flex flex-row">
            {/* SIDEBAR */}
            <div className="p-2 h-screen w-24 shadow-lg shadow-[#771A0F] flex flex-col items-center gap-2">
                <div className="h-[72px] w-[72px] shadow-lg p-1 bg-gray-200 hover:bg-gray-100  flex flex-col justify-center items-center text-sm rounded-md mb-2
                 transition ease-in-out">
                    <div className="rounded-full h-10 w-10 bg-black"></div>
                    Teste
                </div>
                <hr className="w-[72px]  border border-rose-200"></hr>
                <div className="w-[72px] shadow-lg p-1 pt-2 text-[#771A0F] bg-gray-200 hover:bg-gray-100  flex flex-col items-center text-sm rounded-md gap-2 
                transition ease-in-out">
                    <div className='h-[72px] flex items-center justify-center'>
                        <BsHeadphones size="24px"></BsHeadphones>
                    </div>

                    <div className='h-16 w-16 bg-orange-600 rounded-md'></div>
                    <div className='h-16 w-16 bg-orange-600 rounded-md'></div>
                    <div className='h-16 w-16 bg-orange-600 rounded-md'></div>
                </div>
                <div className="w-[72px] shadow-lg p-1 pt-2 text-[#771A0F] bg-gray-200 hover:bg-gray-100  flex flex-col items-center text-sm rounded-md gap-2
                transition ease-in-out">
                    <div className='h-[72px] flex items-center justify-center'>
                        <BsSoundwave size="24px"></BsSoundwave>
                    </div>
                    <div className='h-16 w-16 bg-orange-600 rounded-md'></div>
                </div>
                <div className="w-[72px] shadow-lg text-[#771A0F] bg-gray-200 hover:bg-gray-100  flex flex-col items-center text-sm rounded-md gap-2
                transition ease-in-out">
                    <div className='h-[72px] flex items-center justify-center'>
                        <BiHistory size="24px"></BiHistory>
                    </div>
                </div>
            </div>
            {/* CONTAINER */}
            <div className="w-full p-6">
                <div className="h-full w-full rounded-xl shadow-lg flex flex-col justify-center items-center gap-4">
                    <div className='h-80 w-80 bg-orange-500 rounded-lg shadow-md'></div>
                    <div className='flex flex-row gap-2'>
                        <div className='w-[500px] h-10 p-6 bg-gray-200 shadow-md rounded-full flex items-center'>
                            <div className='cursor-pointer'>
                                <BsFillPlayFill size="24px"></BsFillPlayFill>
                            </div>
                            <div className='w-full h-1 ml-2 bg-white'></div>
                        </div>
                        <button className='w-24 rounded-full text-white bg-[#B84831] shadow-md hover:bg-[#d85136] transition ease-in-out'>Transcribe</button>
                    </div>
                    <div className='w-[596px] h-60 overflow-y-auto cursor-default p-6 border'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eget hendrerit sapien. Integer aliquet lacinia pellentesque. Quisque risus ex, fringilla in leo vel, semper eleifend est. Fusce at sagittis libero. Nullam vestibulum, nulla sed eleifend viverra, tellus turpis volutpat ipsum, at faucibus purus sapien sed metus. Sed sapien elit, cursus vel condimentum nec, consectetur et libero. Duis id velit accumsan, rutrum leo et, lacinia enim. Etiam ac ipsum lobortis, tempor lorem id, gravida nisl. Nulla euismod, turpis ac laoreet maximus, nulla augue elementum odio, nec mollis turpis est in erat. Quisque in neque quis nisl tincidunt lacinia a eget erat. Donec facilisis pretium justo in pellentesque. Morbi eu porta velit. Nulla lobortis luctus pulvinar.
                    </div>
                </div>
            </div>
        </div>
    )
}