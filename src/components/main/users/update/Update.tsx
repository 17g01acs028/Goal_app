import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useAppSelector } from '@/state/store'
import { ArrowBigLeftIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { User } from '../data/columns'

const UpdateUser = () => {
    const [userData, setUserData] = useState<User>();


    const navigate = useNavigate();
    const jsonString = JSON.stringify(useAppSelector(state => state.auth));
    const user = JSON.parse(jsonString);

    const { id } = useParams();
    console.log(id);

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

        await fetch(`${import.meta.env.VITE_DB_HOST}/users/${id}`, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.token,
            },

            body: JSON.stringify(userData),
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

                toast.success("User data updated successfully !");

            }).catch(error => {
                toast.error("" + error);
                console.error('There was a problem with the fetch operation:', error);
            });
    }



    useEffect(() => {
        (async () => { // Wrap the async function in parentheses to invoke it
            try {
                const response = await fetch(`${import.meta.env.VITE_DB_HOST}/users/${id}`, {
                    method: "GET",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + user.token,
                    }
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    const errorMessage = errorData.msg || 'Something went wrong';
                    throw new Error(errorMessage);
                }
                const data = await response.json();
                console.log(data);
                setUserData(data);
            } catch (error) {
                toast.error("" + error);
                console.error('There was a problem with the fetch operation:', error);
            }
        })(); // Invoke the async function immediately
    }, []);


    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (userData) {
            setUserData({ ...userData, email: event.target.value });
        }
    };

    const handleOccupationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (userData) {
            setUserData({ ...userData, occupation: event.target.value });
        }
    };
    const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (userData) {
            setUserData({ ...userData, location: event.target.value });
        }
    };
    
    const handleStatusChange = (newValue: string) => {
        if (userData) {
            setUserData({ ...userData, status: newValue });
        }
    };

    const handleRoleChange = (newValue: string) => {
        if (userData) {
            setUserData({ ...userData, role: newValue });
        }
    };
    const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (userData) {
            setUserData({ ...userData, firstName: event.target.value });
        }
    };

    const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (userData) {
            setUserData({ ...userData, lastName: event.target.value });
        }
    };

    console.log("This is user role" + user.user.role);

    return (
        <div>
            <CardHeader className="flex flex-row items-center">
                <div className="grid gap-2">
                    <CardTitle>Update User Data</CardTitle>
                </div>
                <Button asChild size="sm" onClick={() => navigate("/users")} className="ml-auto gap-1">

                    <span className="flex gap-2 items-center">< ArrowBigLeftIcon className="h-4 w-4" />  Back

                    </span>
                </Button>
            </CardHeader>
            <Card x-chunk="dashboard-04-chunk-1">
                <form className='grid gap-6' onSubmit={handleSubmit}>
                    <CardHeader>
                        <CardTitle>User details Update</CardTitle>
                        <CardDescription>
                            This is user registration panel, please update user with caution because any wrong handling of user data is wrong.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="first-name">First name</Label>
                                <Input id="first-name" placeholder="Firstname" value={(userData as User)?.firstName} onChange={handleFirstNameChange} name="firstName" required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="last-name">Last name</Label>
                                <Input id="last-name" placeholder="Lastname" name="lastName" value={(userData as User)?.lastName} onChange={handleLastNameChange} required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="location">Location</Label>
                                <Input id="location" placeholder="Location" name="location" value={(userData as User)?.location} onChange={handleLocationChange} required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="occupation">Occupation</Label>
                                <Input id="occupation" placeholder="Occupation" name="occupation" value={userData?.occupation || ""} onChange={handleOccupationChange} required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" placeholder="Email" name="email" value={userData?.email || ""} onChange={handleEmailChange} required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="role">Role</Label>
                                <Select name='role' value={(userData as User)?.role} onValueChange={(newValue) => user.user.role.toLowerCase() === "admin" ?  handleRoleChange(newValue) : ""}>
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
                                <Select name='status' value={(userData as User)?.status} onValueChange={ (newValue) => user.user.role.toLowerCase() === "admin"  ? handleStatusChange(newValue) : ""}>
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

export default UpdateUser
