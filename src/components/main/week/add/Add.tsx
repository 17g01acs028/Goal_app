import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useAppSelector } from '@/state/store'
import { ArrowBigLeftIcon } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";

const AddWeek = () => {
    const [value, setValue] = useState<DateValueType>({
        startDate: new Date(),
        endDate: new Date(new Date().setMonth(11))
    });

    const handleValueChange = (newValue:any) => {
        console.log("newValue:", newValue);
        setValue(newValue);
    }

    const navigate = useNavigate();
    const jsonString = JSON.stringify(useAppSelector(state => state.auth));
    const user = JSON.parse(jsonString);

    async function handleSubmit(e: React.FormEvent) {
        'use server';
        e.preventDefault();
        
        const values = {...value,user:user.user._id,};

        await fetch(`${import.meta.env.VITE_DB_HOST}/weeks/`, {
            method: "post",
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

                toast.success("New Week added Success !");

            }).catch(error => {
                toast.error("" + error);
                console.error('There was a problem with the fetch operation:', error);
            });
    }
    return (
        <div>
            <CardHeader className="flex flex-row items-center">
                <div className="grid gap-2">
                    <CardTitle>Add new</CardTitle>
                </div>
                <Button asChild size="sm" onClick={() => navigate("/weeks")} className="ml-auto gap-1">

                    <span className="flex gap-2 items-center">< ArrowBigLeftIcon className="h-4 w-4" />  Back

                    </span>
                </Button>
            </CardHeader>
            <Card x-chunk="dashboard-04-chunk-1">
                <form className='grid gap-6' onSubmit={handleSubmit}>
                    <CardHeader>
                        <CardTitle>Register Week</CardTitle>

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

export default AddWeek
