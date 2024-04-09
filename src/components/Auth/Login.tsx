import { useAppDispatch, useAppSelector } from "@/state/store"
import { Button } from "../ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { setLogin } from "@/state/features/auth"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"


const Login = () => {
    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    async function handleSubmit(e: React.FormEvent) {
        'use server';
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const values = new FormData(form);

        console.log(values);

        const loggedInResponse = await fetch(`${import.meta.env.VITE_DB_HOST}:${import.meta.env.VITE_DB_PORT}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(Object.fromEntries(values)),
        });
        const loggedIn = await loggedInResponse.json();
        if (!loggedInResponse.ok) {
            toast.error(loggedIn.msg);
        } else {
            if (loggedIn) {
                dispatch(
                    setLogin({
                        user: loggedIn.user,
                        token: loggedIn.token,
                    })
                );
                navigate("/home");
                toast.success("Login Success !");
            }
        }

        
    }
    console.log(useAppSelector(state => state.auth.token))

    return (
        <div className="w-full h-screen flex items-center justify-center px-4">
            <form onSubmit={handleSubmit} method="post">
                <Card className="w-[400px] sm:w-[500px]">
                    <CardHeader>
                        <CardTitle className="text-2xl">Login</CardTitle>
                        <CardDescription>
                            Enter your email below to login to your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="email@example.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    
                                </div>
                                <Input id="password" type="password" name="password" required />
                            </div>
                            <Button type="submit" className="w-full">
                                Login
                            </Button>
                            {/* <Button variant="outline" className="w-full">
                            Login with Google
                        </Button> */}
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Don&apos;t have an account?{" "}
                            <a href={"/signup"} className="underline">
                                Sign up
                            </a>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </div>
    )
}

export default Login
