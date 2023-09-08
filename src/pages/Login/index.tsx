import { Button, Input } from "antd"

export function Login() {
    return (
        <div className="w-screen h-screen">
            <div className="bg-really-dark-red absolute inset-y-0 right-0 w-1/3 p-8 flex flex-col justify-center shadow-2xl">
                <div className=" h-52 w-full flex flex-col items-center justify-center" >

                    <div className="h-52 w-52 rounded-full bg-slate-400"></div>
                </div>
                <label htmlFor="Login" className="font-semibold text-white my-2 ">Login</label>
                <Input size="large" id="Login" placeholder="Caze"></Input>
                <label htmlFor="Password" className="font-semibold text-white my-2">Password</label>
                <Input.Password size="large" id="Password" placeholder="Password" />
                <div className="w-full text-right text-white">
                    Not registered?
                    <a href="#" className="font-semibold mx-1 text-light-red hover:text-white transition ease-in-out">Sign in</a>
                </div>
                <div className="gap-2">
                    <Button type="primary" className="w-full my-2 hover:bg-light-red transition ease-in-out" >Login</Button>
                    <Button>Login with Google</Button>
                    <Button >Login with Facebook</Button>
                </div>
            </div>
        </div>
    )
}