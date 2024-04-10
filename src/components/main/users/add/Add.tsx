import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useAppSelector } from '@/state/store'
import { ArrowBigLeftIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const AddUser = () => {
    const navigate = useNavigate();
    const jsonString = JSON.stringify(useAppSelector(state => state.auth));
    const user = JSON.parse(jsonString);

    async function handleSubmit(e: React.FormEvent) {
        'use server';
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const values = new FormData(form);

        console.log(values);

        console.log(user && user.token)

        if (values.get("newPassword") !== values.get("confirmPassword")) {
            toast.error("Passwords Do not match");
            return;
        }

        await fetch(`${import.meta.env.VITE_DB_HOST}/users/`, {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.token,
            },

            body: JSON.stringify(Object.fromEntries(values)),
        }).then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    const errorMessage = errorData.msg || 'Something went wrong';
                    throw new Error(errorMessage);
                });
            }
            return response.json();
        })
        .then(() => {

                toast.success("New Data added Success !");

         }).catch(error => {
                toast.error(""+error);
                console.error('There was a problem with the fetch operation:', error);
          });
    }
    return (
        <div>
            <CardHeader className="flex flex-row items-center">
                <div className="grid gap-2">
                    <CardTitle>Add new</CardTitle>
                </div>
                <Button asChild size="sm" onClick={() => navigate("/users")} className="ml-auto gap-1">

                    <span className="flex gap-2 items-center">< ArrowBigLeftIcon className="h-4 w-4" />  Back

                    </span>
                </Button>
            </CardHeader>
            <Card x-chunk="dashboard-04-chunk-1">
                <form className='grid gap-6' onSubmit={handleSubmit}>
                    <CardHeader>
                        <CardTitle>User Registration</CardTitle>
                        <CardDescription>
                            This is user registration panel, please add user with caution because any wrong undling og of user data is wrong.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="first-name">First name</Label>
                                <Input id="first-name" placeholder="Firstname" name="firstName" required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="last-name">Last name</Label>
                                <Input id="last-name" placeholder="Lastname" name="lastName" required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="location">Location</Label>
                                <Input id="location" placeholder="Location" name="location" required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="occupation">Occupation</Label>
                                <Input id="occupation" placeholder="Occupation" name="occupation" required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" placeholder="Email" name="email" required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="role">Role</Label>
                                <Select name='role'>
                                    <SelectTrigger >
                                        <SelectValue placeholder="Select a Role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Role</SelectLabel>
                                            <SelectItem value="user">user</SelectItem>
                                            <SelectItem value="admin">Admin</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="status">Status</Label>
                                <Select name='status'>
                                    <SelectTrigger >
                                        <SelectValue placeholder="Select a Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Status</SelectLabel>
                                            <SelectItem value="pending">Pending</SelectItem>
                                            <SelectItem value="approved">Approved</SelectItem>
                                            <SelectItem value="rejected">Rejected</SelectItem>
                                            <SelectItem value="blocked">Blocked</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                        </div>


                    </CardContent>
                    <CardFooter className="border-t px-6 py-4">
                        <Button>Save</Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}

export default AddUser
