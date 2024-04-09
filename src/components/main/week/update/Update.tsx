import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useAppSelector } from '@/state/store'
import { ArrowBigLeftIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Datepicker from "react-tailwindcss-datepicker";

const UpdateWeek = () => {

    const { id } = useParams();
    const [value, setValue] = useState({
        startDate: new Date(),
        endDate: new Date().setMonth(11)
    });

    const handleValueChange = (newValue: any) => {
        console.log("newValue:", newValue);
        setValue(newValue);
    }

    const navigate = useNavigate();
    const jsonString = JSON.stringify(useAppSelector(state => state.auth));
    const user = JSON.parse(jsonString);

    async function handleSubmit(e: React.FormEvent) {
        'use server';
        e.preventDefault();

        const values = { ...value, user: user.user._id, };

        await fetch(`${import.meta.env.VITE_DB_HOST}:${import.meta.env.VITE_DB_PORT}/weeks/${id}`, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.token,
            },

            body: JSON.stringify(values),
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

                toast.success(" Week Updated Success !");

            }).catch(error => {
                toast.error("" + error);
                console.error('There was a problem with the fetch operation:', error);
            });

    }

    useEffect(() => {
        (async () => { // Wrap the async function in parentheses to invoke it
            try {
                const response = await fetch(`${import.meta.env.VITE_DB_HOST}:${import.meta.env.VITE_DB_PORT}/weeks/${id}`, {
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
                setValue({
                    startDate: data.startDate,
                    endDate: data.endDate
                });
            } catch (error) {
                toast.error("" + error);
                console.error('There was a problem with the fetch operation:', error);
            }
        })(); // Invoke the async function immediately
    }, []);
    return (
        <div>
            <CardHeader className="flex flex-row items-center">
                <div className="grid gap-2">
                    <CardTitle>Update Date</CardTitle>
                </div>
                <Button asChild size="sm" onClick={() => navigate("/weeks")} className="ml-auto gap-1">

                    <span className="flex gap-2 items-center">< ArrowBigLeftIcon className="h-4 w-4" />  Back

                    </span>
                </Button>
            </CardHeader>
            <Card x-chunk="dashboard-04-chunk-1">
                <form className='grid gap-6' onSubmit={handleSubmit}>
                    <CardHeader>
                        <CardTitle>Update Week</CardTitle>

                    </CardHeader>
                    <CardContent>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                            <div className="grid gap-2">
                                <Datepicker
                                    primaryColor={"yellow"}
                                    value={value}
                                    onChange={handleValueChange}
                                    showShortcuts={true}
                                />
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

export default UpdateWeek
