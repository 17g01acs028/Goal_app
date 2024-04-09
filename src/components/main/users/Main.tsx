import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "../components/Datatable"
import { User, columns } from "./data/columns"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useAppSelector } from "@/state/store"


export default function ViewUsers() {
  const navigate = useNavigate();
  const [data, setData] = useState<User[]>([]);
  const jsonString = JSON.stringify(useAppSelector(state => state.auth));
  const  user = JSON.parse(jsonString)

  const loc = useLocation()
  const [location,setlocation] =useState(loc.pathname);

  console.log(location);

  if(location !== loc.pathname){
    setlocation(loc.pathname);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        await fetch(`${import.meta.env.VITE_DB_HOST}:${import.meta.env.VITE_DB_PORT}/users/`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.token,
              }
        }).then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    const errorMessage = errorData.message || 'Something went wrong';
                    throw new Error(errorMessage);
                });
            }
            return response.json();
          })
          .then(data => {
            navigate("/users")
            setData(data);
          }).catch(error => {
            toast.error(error);
            console.error('There was a problem with the fetch operation:', error);
          });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [location]);

  return (
    <>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>User List</CardTitle>
          <CardDescription>
            List of our employees
          </CardDescription>
        </div>
        <Button asChild size="sm" onClick={()=> navigate("/user/add")} className="ml-auto gap-1">
          <span className="flex gap-2 items-center"> New
            <PlusCircle className="h-4 w-4" />
          </span>
        </Button>
      </CardHeader>
      <DataTable columns={columns} data={data} filter="email" columnName="email" />
    </>

  )
}
