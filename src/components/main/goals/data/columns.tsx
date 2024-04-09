import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"
import { useAppSelector } from "@/state/store"
import { DropdownMenu } from "@radix-ui/react-dropdown-menu"
import {  DotsHorizontalIcon } from "@radix-ui/react-icons"
import { ColumnDef } from "@tanstack/react-table"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

export type Goal = {
    _id: string
    title: string
    description: string
    deadline: Date
    completed: boolean
    category:string
    week: string
    user: string
    weekString: string
    categoryName: string
    createdAt: Date
    updatedAt: Date
    __v: number
}



export const columns: ColumnDef<Goal>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "title",
        header: "Goal",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("title")}</div>
        ),
    },
    {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("description")}</div>
        ),
    },

    {
        accessorKey: "deadline",
        header: "Deadline",
        cell: ({ row }) => (
            <div className="capitalize">{new Date(row.getValue("deadline")).toISOString().split("T")[0]}</div>
        ),
    },
    {
        accessorKey: "categoryName",
        header: "Category",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("categoryName")}</div>
        ),
    },
    {
        accessorKey: "weekString",
        header: "Week",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("weekString")}</div>
        ),
    },
    {
        accessorKey: "completed",
        header: "Status",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("completed") ? (
                <div className="flex items-center space-x-2">
                    <Switch checked={true} />
                </div>
            ) : (
                <div className="flex items-center space-x-2">
                    <Switch checked={false} />
                </div>
            )}</div>
        ),
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            return (
                <Card row={row} />
            )
        },
    },
]

export default function Card({ row }) {
    const goal = row.original
    const navigate = useNavigate();
    const jsonString = JSON.stringify(useAppSelector(state => state.auth));
    const user = JSON.parse(jsonString);
    const loc =useLocation();
    

    async function handleSubmit(id: string, completed: string) {
        'use server'; 
        const values = {completed:!completed};

        console.log(values);

        await fetch(`${import.meta.env.VITE_DB_HOST}:${import.meta.env.VITE_DB_PORT}/goals/${id}`, {
            method: "put",
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

                toast.success("Status Change Success !");
                navigate(`${loc.pathname==="/" ? loc.pathname : loc.pathname + "/"} `)
            }).catch(error => {
                toast.error("" + error);
                console.error('There was a problem with the fetch operation:', error);
            }); 
    }
    async function handleDelete(id: string) {
        'use server'; 
       
        await fetch(`${import.meta.env.VITE_DB_HOST}:${import.meta.env.VITE_DB_PORT}/goals/${id}`, {
            method: "delete",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.token,
            }
        }).then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    const errorMessage = errorData.msg || 'Something went wrong';
                    throw new Error(errorMessage);
                });
            }
            return response;
        }).then(() => {

                toast.success("Record Delete Success !");
                navigate(`${loc.pathname==="/" ? loc.pathname : loc.pathname + "/"} `)
            }).catch(error => {
                toast.error("" + error);
                console.error('There was a problem with the fetch operation:', error);
            }); 
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <DotsHorizontalIcon className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => handleSubmit(goal._id, goal.completed)}> {goal.completed ? "Mark as Incomplete" : "Mark as Complete"}</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/goal/update/" + goal._id)} >Edit Goal</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDelete(goal._id)} className="bg-red-400 text-white"><span>Delete Goal</span></DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}