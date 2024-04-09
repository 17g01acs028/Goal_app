import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useAppSelector } from "@/state/store"
import { DropdownMenu } from "@radix-ui/react-dropdown-menu"
import {  DotsHorizontalIcon } from "@radix-ui/react-icons"
import { ColumnDef, Row } from "@tanstack/react-table"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

export type Week = {
    _id: string
    startDate: Date
    endDate: Date
    user: string
    createdAt: Date
    updatedAt: Date
    __v: number
}

interface CardProps {
    row: Row<Week>; // Define the type of the row prop
}

export const columns: ColumnDef<Week>[] = [
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
        accessorKey: "startDate",
        header: "Start Date",
        cell: ({ row }) => (
            <div className="capitalize">{new Date(row.getValue("startDate")).toISOString().split("T")[0]}</div>
        ),
    },
    {
        accessorKey: "endDate",
        header: "End Date",
        cell: ({ row }) => (
            <div className="capitalize">{new Date(row.getValue("endDate")).toISOString().split("T")[0]}</div>
        ),
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            return (
            <Card row={row}/>
            )
        },
    },
]

export default function Card({ row }: CardProps) {
  const week = row.original
  const navigate = useNavigate();

  const loc = useLocation();
  const jsonString = JSON.stringify(useAppSelector(state => state.auth));
  const user = JSON.parse(jsonString);

  async function handleDelete(id: string) {
    'use server'; 
   
    await fetch(`${import.meta.env.VITE_DB_HOST}:${import.meta.env.VITE_DB_PORT}/weeks/${id}`, {
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
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/week/update/" + week._id)} >Edit week details</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDelete(week._id)} className="bg-red-400 text-white"><span>Delete week details</span></DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}