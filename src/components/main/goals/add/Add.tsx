import AutocompleteInput from '@/components/ui/autocompelete'
import { Button } from '@/components/ui/button'
import { Card, CardContent,CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useAppSelector } from '@/state/store'
import { ArrowBigLeftIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'
import { Week } from '../../week/data/columns'
import { Category } from '../../category/data/columns'
import { Goal } from '../data/columns'

const AddGoal = () => {
    const navigate = useNavigate();
    const jsonString = JSON.stringify(useAppSelector(state => state.auth));
    const user = JSON.parse(jsonString);
    const [weekData, setWeekData] = useState<Week[]>([]);
    const [categoryData, setCategoryData] = useState<Category[]>([]);
    const [goalData, setGoalsData] = useState<Goal[]>([]);
    const id = user.user._id;

    useEffect(() => {
        (async () => { // Wrap the async function in parentheses to invoke it
            try {
                const response = await fetch(`${import.meta.env.VITE_DB_HOST}/categories/`, {
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
                setCategoryData(data);


                const response2 = await fetch(`${import.meta.env.VITE_DB_HOST}/weeks/user/${id}`, {
                    method: "GET",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + user.token,
                    }
                });
                if (!response2.ok) {
                    const errorData = await response2.json();
                    const errorMessage = errorData.msg || 'Something went wrong';
                    throw new Error(errorMessage);
                }
                const data2 = await response2.json();
                setWeekData(data2);


                const response3 = await fetch(`${import.meta.env.VITE_DB_HOST}/goals/user/${id}`, {
                    method: "GET",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + user.token,
                    }
                });
                if (!response3.ok) {
                    const errorData = await response3.json();
                    const errorMessage = errorData.msg || 'Something went wrong';
                    throw new Error(errorMessage);
                }
                const data3 = await response3.json();
                setGoalsData(data3);


            } catch (error) {
                toast.error("" + error);
                console.error('There was a problem with the fetch operation:', error);
            }
        })(); // Invoke the async function immediately
    }, []);

    const suggestion = goalData.map(obj => obj.title);

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

        await fetch(`${import.meta.env.VITE_DB_HOST}/goals/`, {
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
                toast.error("" + error);
                console.error('There was a problem with the fetch operation:', error);
            });
    }


    console.log(weekData);
    console.log(goalData);
    return (
        <div>
            <CardHeader className="flex flex-row items-center">
                <div className="grid gap-2">
                    <CardTitle>Add new</CardTitle>
                </div>
                <Button asChild size="sm" onClick={() => navigate("/goals")} className="ml-auto gap-1">

                    <span className="flex gap-2 items-center">< ArrowBigLeftIcon className="h-4 w-4" />  Back

                    </span>
                </Button>
            </CardHeader>
            <Card x-chunk="dashboard-04-chunk-1">
                <form className='grid gap-6' onSubmit={handleSubmit}>
                    <CardHeader>
                        <CardTitle>Create Goal</CardTitle>
                    </CardHeader>
                    <CardContent>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="title">Title</Label>
                                <AutocompleteInput suggestions={suggestion} id="title" placeholder="Goal" name="title" className='' required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="description">Description</Label>
                                <Input id="description" placeholder="Description" name="description" required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="location">DeadLine</Label>
                                <Input id="deadline" placeholder="Deadline" name="deadline" required />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="role">Category</Label>
                                <Select name='category'>
                                    <SelectTrigger >
                                        <SelectValue placeholder="Select a Category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Category</SelectLabel>

                                            {categoryData && categoryData.map((data) => (
                                                <SelectItem value={data._id}>{data.categoryName}</SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="status">Week</Label>
                                <Select name='week'>
                                    <SelectTrigger >
                                        <SelectValue placeholder="Select a Week" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Week</SelectLabel>
                                            {weekData && weekData.map((data) => {
                                                // Convert startDate and endDate to Date objects
                                                const startDate = new Date(data.startDate);
                                                const endDate = new Date(data.endDate);

                                                // Extracting date part from startDate and endDate
                                                const startDateString = startDate.toISOString().split("T")[0];
                                                const endDateString = endDate.toISOString().split("T")[0];

                                                // Rendering SelectItem with date range
                                                return (
                                                    <SelectItem key={data._id} value={data._id}>
                                                        {startDateString} ~ {endDateString}
                                                    </SelectItem>
                                                );
                                            })}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Input id="user" className="hidden" placeholder="user" hidden={true} name="user" value={user.user._id} required />
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

export default AddGoal
