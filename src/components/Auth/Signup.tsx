import { toast } from "react-toastify"
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
import { useNavigate } from "react-router-dom"

const Signup = () => {

    const navigate = useNavigate();

    async function handleSubmit(e: React.FormEvent) {
        'use server';
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const values = new FormData(form);

        console.log(values);

        const signUpResponse = await fetch(`${import.meta.env.VITE_DB_HOST}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(Object.fromEntries(values)),
        });

        const signUp = await signUpResponse.json();
        if (!signUp.ok) {

            toast.error(signUp.msg);
        } else {
            if (signUp) {
                navigate("/");
                toast.success("Registration Success !");
            }
        }

        
    }

    return (
        <div className="w-full h-screen flex items-center justify-center px-4">
            <form onSubmit={handleSubmit} method="post">
                <Card className=" w-[400px] sm:w-[600px]">
                    <CardHeader>
                        <CardTitle className="text-xl">Sign Up</CardTitle>
                        <CardDescription>
                            Enter your information to create an account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4">
                            <div className="grid grid-cols-2 gap-4 lg:gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="first-name">First name</Label>
                                    <Input id="first-name" placeholder="Firstname" name="firstName" required />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="last-name">Last name</Label>
                                    <Input id="last-name" placeholder="Lastname" name="lastName" required />
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="email@example.com"
                                    required
                                    name="email"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password"  name="password"/>
                            </div>
                            <Button type="submit" className="w-full">
                                Create an account
                            </Button>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Already have an account?{" "}
                            <a href={"/login"} className="underline">
                                Sign in
                            </a>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </div>
    )
}

export default Signup
