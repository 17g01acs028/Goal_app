import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useAppSelector } from "@/state/store"
import { DropdownMenu } from "@radix-ui/react-dropdown-menu"
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons"
import { ColumnDef } from "@tanstack/react-table"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

export type User = {
    _id: string
    firstName: string
    lastName: string
    role: string
    status: string
    email: string
    password: string
    picturePath: string
    location: string
    occupation: string
    createdAt: Date
    updatedAt: Date
    __v: number
}



export const columns: ColumnDef<User>[] = [
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
        accessorKey: "firstName",
        header: "First Name",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("firstName")}</div>
        ),
    },
    {
        accessorKey: "lastName",
        header: "Last Name",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("lastName")}</div>
        ),
    },
    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Email
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (<div className="lowercase">{row.getValue("email")}</div>),
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("status")}</div>
        ),
    },
    {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("role")}</div>
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

export default function Card({ row }: any) {
  const user = row.original
  const navigate = useNavigate();
  const loc = useLocation();
  const jsonString = JSON.stringify(useAppSelector(state => state.auth));
  const users = JSON.parse(jsonString);

  async function handleDelete(id: any) {
    'use server'; 
    await fetch(`${import.meta.env.VITE_DB_HOST}:${import.meta.env.VITE_DB_PORT}/users/${id}`, {
        method: "delete",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + users.token,
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
                <DropdownMenuItem
                    onClick={() => navigator.clipboard.writeText(user.email)}
                >
                    Copy Employee Email
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/user/change_user_status/" + user._id)}>Change Status</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/user/update/" + user._id)} >Edit employee details</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDelete(user._id)} className="bg-red-400 text-white"><span>Delete employee details</span></DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}