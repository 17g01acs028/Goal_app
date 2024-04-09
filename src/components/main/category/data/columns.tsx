import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useAppSelector } from "@/state/store"
import { DropdownMenu } from "@radix-ui/react-dropdown-menu"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { ColumnDef, Row } from "@tanstack/react-table"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

export type Category = {
    _id: string
    categoryName: string
    createdAt: Date
    updatedAt: Date
    __v: number
}
interface CardProps {
    row: Row<Category>; // Define the type of the row prop
}


export const columns: ColumnDef<Category>[] = [
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
        accessorKey: "categoryName",
        header: "Category Name",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("categoryName")}</div>
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

export default function Card({row}:CardProps ) {
    const category = row.original
    const navigate = useNavigate();
    const jsonString = JSON.stringify(useAppSelector(state => state.auth));
    const user = JSON.parse(jsonString);
    const loc = useLocation();

    async function handleDelete(id: string) {
        'use server';

        await fetch(`http://localhost:2000/categories/${id}`, {
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
            navigate(`${loc.pathname === "/" ? loc.pathname : loc.pathname + "/"} `)
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
                <DropdownMenuItem onClick={() => navigate("/category/update/" + category._id)} >Edit Category details</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDelete(category._id)} className="bg-red-400 text-white"><span>Delete Category details</span></DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}