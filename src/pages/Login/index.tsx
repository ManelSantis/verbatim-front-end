import { Button, Input } from "antd"

export function Login() {
    return (
        <div>


            <div className="bg-slate-500 absolute inset-y-0 right-0 w-1/3  p-8">
                <div></div>
                <label htmlFor="Login" className="font-semibold text-white my-2 ">Login</label>
                <Input size="large" id="Login" placeholder="Caze"></Input>
                <label htmlFor="Password" className="font-semibold text-white my-2">Password</label>
                <Input.Password size="large" id="Password" placeholder="Senha" />
                <div className="w-full text-right text-white">
                    Not registered?
                    <a href="#" className="font-semibold mx-1 text-[#F52C15] hover:underline transition ease-in-out">Sign in</a>
                </div>
                <Button type="primary" className="w-full my-2" >Login</Button>
            </div>
        </div>
    )
}