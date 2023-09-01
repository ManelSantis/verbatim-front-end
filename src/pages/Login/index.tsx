import { Input } from "antd"

export function Login() {
    return (
        <div>


            <div className="bg-slate-500 absolute inset-y-0 right-0 w-1/3  p-8">
                <div></div>
                <label htmlFor="Login" className="font-semibold text-white my-2 ">Login</label>
                <Input size="large"  id="Login" placeholder="Caze"></Input>
                <label htmlFor="Password" className="font-semibold text-white my-2">Password</label>
                <Input.Password  size="large"  id="Password" placeholder="Senha" />
            </div>
        </div>
    )
}